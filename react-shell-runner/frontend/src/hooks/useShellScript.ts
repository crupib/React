import { useCallback, useRef, useState } from "react";
import { runShellScript, ScriptResult } from "../api/runShellScript";

type UseShellScriptState = {
  loading: boolean;
  result: ScriptResult | null;
  error: string | null;
};

export function useShellScript() {
  const [state, setState] = useState<UseShellScriptState>({
    loading: false,
    result: null,
    error: null,
  });

  const abortRef = useRef<AbortController | null>(null);

  const run = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState({ loading: true, result: null, error: null });

    try {
      const result = await runShellScript(controller.signal);
      setState({ loading: false, result, error: null });
      return result; // return data to caller
    } catch (e: any) {
      const msg =
        typeof e?.result?.stderr === "string" && e.result.stderr
          ? e.result.stderr
          : e?.message
            ? String(e.message)
            : "Unknown error";

      setState({ loading: false, result: e?.result ?? null, error: msg });
      throw e; // let caller handle if desired
    }
  }, []);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  return { ...state, run, cancel };
}


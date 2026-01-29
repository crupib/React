export type ScriptResult = {
  ok: boolean;
  code: number;
  stdout: string;
  stderr: string;
};

export async function runShellScript(signal?: AbortSignal): Promise<ScriptResult> {
  const res = await fetch("http://localhost:3001/run-script", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
    signal,
  });

  const data = (await res.json()) as Partial<ScriptResult>;

  const result: ScriptResult = {
    ok: Boolean(data.ok) && res.ok,
    code: typeof data.code === "number" ? data.code : res.ok ? 0 : 1,
    stdout: typeof data.stdout === "string" ? data.stdout : "",
    stderr: typeof data.stderr === "string" ? data.stderr : "",
  };

  if (!res.ok) {
    // Throw an error but attach structured info
    const err = new Error(result.stderr || `HTTP ${res.status}`);
    (err as any).status = res.status;
    (err as any).result = result;
    throw err;
  }

  return result;
}


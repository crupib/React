import { useState } from "react";
import { useShellScript } from "./hooks/useShellScript";

function splitLines(s: string) {
  return s.replace(/\r\n/g, "\n").split("\n").filter(Boolean);
}

export default function App() {
  const { loading, result, error, run, cancel } = useShellScript();
  const [stdoutLines, setStdoutLines] = useState<string[]>([]);
  const [stderrLines, setStderrLines] = useState<string[]>([]);

  async function handleRun() {
    try {
      const r = await run(); // caller gets the data here
      setStdoutLines(splitLines(r.stdout));
      setStderrLines(splitLines(r.stderr));
    } catch {
      setStdoutLines([]);
      setStderrLines([]);
    }
  }

  return (
    <div style={{ fontFamily: "system-ui", padding: 24, maxWidth: 900 }}>
      <h1>React (TS) → Express → Shell Script</h1>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={handleRun}
          disabled={loading}
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #ccc",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Running..." : "Run Script"}
        </button>

        <button
          onClick={cancel}
          disabled={!loading}
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #ccc",
            cursor: !loading ? "not-allowed" : "pointer",
          }}
        >
          Cancel
        </button>
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ marginBottom: 8 }}>
          <strong>Status:</strong>{" "}
          {result ? (result.ok ? "OK" : "FAILED") : loading ? "RUNNING" : "—"}
        </div>

        {error && (
          <div style={{ padding: 12, border: "1px solid #f99", borderRadius: 8 }}>
            <strong>Error:</strong>
            <div style={{ whiteSpace: "pre-wrap" }}>{error}</div>
          </div>
        )}

        <h2 style={{ marginTop: 16 }}>STDOUT</h2>
        <div style={{ padding: 12, background: "#f6f6f6", borderRadius: 8 }}>
          {stdoutLines.length === 0 ? (
            <div style={{ opacity: 0.7 }}>No output</div>
          ) : (
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {stdoutLines.map((line, i) => (
                <li key={i} style={{ whiteSpace: "pre-wrap" }}>
                  {line}
                </li>
              ))}
            </ul>
          )}
        </div>

        <h2 style={{ marginTop: 16 }}>STDERR</h2>
        <div style={{ padding: 12, background: "#f6f6f6", borderRadius: 8 }}>
          {stderrLines.length === 0 ? (
            <div style={{ opacity: 0.7 }}>No errors</div>
          ) : (
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {stderrLines.map((line, i) => (
                <li key={i} style={{ whiteSpace: "pre-wrap" }}>
                  {line}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}


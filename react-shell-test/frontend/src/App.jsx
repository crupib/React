import React, { useState } from "react";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [stdoutLines, setStdoutLines] = useState([]);
  const [stderrLines, setStderrLines] = useState([]);
  const [error, setError] = useState(null);
  function splitLinesSmart(s) {
  const raw = (s ?? "").trim();
  if (!raw) return [];

  // Normal case: real newlines exist
  if (raw.includes("\n") || raw.includes("\r\n")) {
    return raw.replace(/\r\n/g, "\n").split("\n").map(l => l.trim()).filter(Boolean);
  }

  // Flattened case: reconstruct ping output reliably
  // 1) Put each "NN bytes from ..." on its own line
  // 2) Put the statistics header on its own line, with a blank line before it
  // 3) Put "packets transmitted..." on its own line
  // 4) Put "round-trip ..." on its own line
  //
  // We do this by matching known tokens and inserting '\n' before them.
  let t = raw;

  // Break before every "NN bytes from"
  t = t.replace(/(\s)(\d+\s+bytes\s+from\s+)/g, "\n$2");

  // Blank line + break before the stats header
  t = t.replace(/(\s)(---\s+.+?\s+ping\s+statistics\s+---)/g, "\n\n$2");

  // Break before packets line
  t = t.replace(/(\s)(\d+\s+packets\s+transmitted,)/g, "\n$2");

  // Break before round-trip line
  t = t.replace(/(\s)(round-trip\s+min\/avg\/max\/stddev\s*=)/g, "\n$2");

  // Also ensure the first line is just the PING header (common on macOS)
  // If we have "data bytes" followed by something else, break after "data bytes"
  t = t.replace(/(data\s+bytes)\s+(?=\d+\s+bytes\s+from\s+)/, "$1\n");

  return t.split("\n").map(l => l.trim()).filter(Boolean);
}

  async function runScript() {
    setLoading(true);
    setStatus(null);
    setStdoutLines([]);
    setStderrLines([]);
    setError(null);

    try {
      const res = await fetch("http://localhost:3001/run-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
      });

      setStatus(res.status);

      const data = await res.json();

      setStdoutLines(splitLinesSmart(data.stdout));
      setStderrLines(splitLinesSmart(data.stderr));

      if (!res.ok) {
        setError(data.stderr || `Script failed (HTTP ${res.status})`);
      }
    } catch (err) {
      setError(String(err));
      setStatus("NETWORK_ERROR");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ fontFamily: "system-ui", padding: 24, maxWidth: 900 }}>
      <h1>React → Express → Shell Script</h1>

      <button
        onClick={runScript}
        disabled={loading}
        style={{
          padding: "10px 14px",
          borderRadius: 8,
          border: "1px solid #ccc",
          cursor: loading ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "Running..." : "Run Script"}
      </button>

      <div style={{ marginTop: 16 }}>
        <div style={{ marginBottom: 8 }}>
          <strong>Status:</strong> {status ?? "—"}
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
                <li key={`out-${i}`} style={{ whiteSpace: "pre-wrap" }}>
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
                <li key={`err-${i}`} style={{ whiteSpace: "pre-wrap" }}>
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

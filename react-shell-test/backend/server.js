import express from "express";
import cors from "cors";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

// Allow frontend dev server to call backend
app.use(cors({
  origin: "http://localhost:5173"
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/run-script", (req, res) => {
  // In a real app: DO NOT accept arbitrary script names/args from users.
  const scriptPath = path.join(__dirname, "scripts", "runme.sh");

  // Spawn is safer than exec (no shell interpolation)
  const child = spawn("bash", [scriptPath], {
    cwd: __dirname,
    env: process.env
  });

  let stdout = "";
  let stderr = "";

  child.stdout.on("data", (data) => { stdout += data.toString(); });
  child.stderr.on("data", (data) => { stderr += data.toString(); });

  child.on("close", (code) => {
    if (code !== 0) {
      return res.status(500).json({
        ok: false,
        code,
        stderr: stderr || `Script exited with code ${code}`,
        stdout
      });
    }
    res.json({ ok: true, code, stdout, stderr });
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});


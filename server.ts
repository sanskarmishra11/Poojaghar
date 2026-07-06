import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", persistence: "localStorage" });
  });

  // Safe server-side Gemini API Proxy
  app.post("/api/gemini/spiritual-guide", async (req, res) => {
    try {
      const { prompt, context } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(400).json({
          error: "Gemini API key is missing. Please select one in Settings > Secrets or fall back to local offline wisdom."
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const systemInstruction = `You are a wise, serene, and compassionate Vedic Guru/Scholar at the digital sanctuary PoojaGhar.
Answer the devotee's spiritual query with warm, comforting, and insightful Sanskrit terms and their meanings.
Keep your answers beautifully structured, encouraging, 2-3 concise paragraphs, citing a relevant Sanskrit shloka (with translation) and a practical mindfulness recommendation.
You can cite from Bhagavad Gita, Upanishads, Vedas, or Epics. Translate the shloka clearly in a bilingual English & Hindi format.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Spiritual Context: ${context || 'General inquiry'}\nDevotee Query: ${prompt}`,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Spiritual Server Gemini API error:", error);
      res.status(500).json({ error: error?.message || "Internal spiritual server error" });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PoojaGhar Sacred Server bound and running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

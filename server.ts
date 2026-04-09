import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CMS_FILE = path.join(__dirname, "cms-data.json");

// Initial CMS Data
const initialCmsData = {
  hero: {
    badge: "Industrial Grade Quality",
    title: "Premium Tarps Built to Last.",
    description: "The nation's leading supplier of heavy-duty, industrial, and custom-sized tarps. Weather-proof protection for what matters most.",
    primaryCta: "Shop All Products",
    secondaryCta: "Custom Quote"
  },
  stats: [
    { label: "Total Sales", value: "$128,430" },
    { label: "Active Orders", value: "432" },
    { label: "Low Stock Tarps", value: "12" }
  ]
};

// Load or initialize CMS data
if (!fs.existsSync(CMS_FILE)) {
  fs.writeFileSync(CMS_FILE, JSON.stringify(initialCmsData, null, 2));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      res.json({ success: true, token: "mock-jwt-token" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });

  app.get("/api/cms", (req, res) => {
    const data = JSON.parse(fs.readFileSync(CMS_FILE, "utf-8"));
    res.json(data);
  });

  app.post("/api/cms", (req, res) => {
    // In a real app, we'd verify the token here
    const newData = req.body;
    fs.writeFileSync(CMS_FILE, JSON.stringify(newData, null, 2));
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

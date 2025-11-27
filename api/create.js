// api/create.js
export default function handler(req, res) {
  const { price, article, receiver, via = "Opwaarderen.nl", checkout } = req.query;
  if (!price || !article || !receiver || !checkout) return res.status(400).json({error: "Ontbreekt"});

  const id = Math.random().toString(36).substring(2,9) + "-" + Math.random().toString(36).substring(2,9);
  const expires = Date.now() + 7 * 60 * 1000; // 7 minuten vanaf nu

  // Vercel KV (gratis in-memory storage)
  globalThis[id] = { price, article, receiver, via, checkout, expires };

  res.json({ url: `https://betaalverzoek.nu/link/${id}` });
}

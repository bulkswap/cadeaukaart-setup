// api/open.js
export default function handler(req, res) {
  const { id } = req.query;
  const data = globalThis[id];

  if (!data || Date.now() > data.expires) {
    return res.status(410).json({error: "expired"});
  }

  res.json(data);
}

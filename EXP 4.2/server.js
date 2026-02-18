const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database
let cards = [];

// =======================
// GET all cards
// =======================
app.get("/api/cards", (req, res) => {
  res.json(cards);
});

// =======================
// POST new card
// =======================
app.post("/api/cards", (req, res) => {
  const { suit, value, collection } = req.body;

  if (!suit || !value || !collection) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newCard = {
    id: Date.now().toString(),
    suit,
    value,
    collection
  };

  cards.push(newCard);
  res.status(201).json(newCard);
});

// =======================
// PUT update card
// =======================
app.put("/api/cards/:id", (req, res) => {
  const { id } = req.params;

  const card = cards.find(c => c.id === id);

  if (!card) {
    return res.status(404).json({ message: "Card not found" });
  }

  card.suit = req.body.suit || card.suit;
  card.value = req.body.value || card.value;
  card.collection = req.body.collection || card.collection;

  res.json(card);
});

// =======================
// DELETE card
// =======================
app.delete("/api/cards/:id", (req, res) => {
  const { id } = req.params;

  const index = cards.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Card not found" });
  }

  cards.splice(index, 1);

  res.json({ message: "Deleted successfully" });
});

// =======================
// Root route (browser test)
// =======================
app.get("/", (req, res) => {
  res.send("Card Collection API is running 🚀");
});

// =======================
// Server start
// =======================
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

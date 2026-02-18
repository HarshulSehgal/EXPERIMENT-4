const express = require("express");
const Redis = require("ioredis");

const app = express();
app.use(express.json());

// Redis connect
const redis = new Redis();

// Total seats
const TOTAL_SEATS = 100;

// Initialize seats if not exist
redis.setnx("available_seats", TOTAL_SEATS);

// Booking API
app.post("/api/book", async (req, res) => {
  const user = req.body.user || "guest";

  try {
    // Atomic decrement (Redis)
    const remaining = await redis.decr("available_seats");

    if (remaining < 0) {
      await redis.incr("available_seats");
      return res.status(400).json({
        success: false,
        message: "No seats available"
      });
    }

    const bookingId = Date.now();

    res.json({
      success: true,
      bookingId,
      remaining
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Server start
app.listen(3000, () => {
  console.log("Booking system running on port 3000");
});

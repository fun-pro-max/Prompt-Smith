const express = require("express");
const router = express.Router();

const refineIdea = require("../services/aiRefiner");
const buildPrompt = require("../services/promptEngine");

router.post("/", async (req, res) => {
  try {
    const { idea, points, deliverable, category, style } = req.body;

    console.log("Incoming request:", idea);

    const refinedIntent = await refineIdea({
      idea,
      points,
      category
    });

    console.log("Refined idea received.");

    const finalPrompt = await buildPrompt({
      idea: refinedIntent,
      category,
      style,
      deliverable
    });

    res.json({ prompt: finalPrompt });

  } catch (err) {
    console.error("Generation error:", err);
    res.status(500).json({ error: "Generation failed" });
  }
});

module.exports = router;

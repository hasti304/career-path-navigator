const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateRecommendations = async (req, res) => {
  const { skills } = req.body;

  const prompt = `Suggest 3 career paths, skill gaps, and relevant certifications based on these skills: ${skills.join(', ')}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const reply = completion.choices[0].message.content;
    res.json({ recommendations: reply });
  } catch (err) {
    console.error("OpenAI Error:", err);
    res.status(500).json({ error: "OpenAI request failed" });
  }
};

module.exports = { generateRecommendations };

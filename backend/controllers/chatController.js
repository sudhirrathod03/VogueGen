const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "openrouter/free";

export const sendMessage = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages?.length) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    const systemMessage = {
      role: "system",
      content: "You are a helpful and conversational AI assistant. Provide clear and concise answers.",
    };

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://voguegen.onrender.com" || "http://localhost:8080",
        "X-Title": "Vougen Assistant",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [systemMessage, ...messages],
        temperature: 0.4,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter Error: ${await response.text()}`);
    }

    const data = await response.json();
    
    res.json({
      reply: data.choices?.[0]?.message?.content || "Sorry, I couldn't reply.",
    });

  } catch (err) {
    console.error("Chat controller error:", err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};
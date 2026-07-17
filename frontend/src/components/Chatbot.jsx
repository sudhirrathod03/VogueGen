import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

// Simple Robot Icon Component
const RobotIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a3 3 0 013 3v2h1a2 2 0 012 2v2a2 2 0 01-2 2h-1v2a3 3 0 01-3 3H9a3 3 0 01-3-3v-2H5a2 2 0 01-2-2v-2a2 2 0 012-2h1V10a3 3 0 013-3h1V5.73A2 2 0 1112 2zm2.5 11a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
  </svg>
);

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! Ask me for anything you're shopping for — like a jacket for hiking.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading, open]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error("Request failed");
      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply, products: data.products },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {open && (
        <div className="mb-3 flex h-[500px] w-[360px] flex-col overflow-hidden rounded-xl border border-gray-300 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-black px-4 py-3 font-semibold text-white">
            <div className="flex items-center gap-2">
              <RobotIcon className="h-5 w-5" />
              <span>Shopping Assistant</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-xl leading-none cursor-pointer text-white/80 hover:text-white"
            >
              ×
            </button>
          </div>

          {/* Chat Window */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4 bg-white">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${
                  msg.role === "user" ? "ml-auto justify-end" : "mr-auto justify-start"
                }`}
              >
                {/* Bot Avatar */}
                {msg.role !== "user" && (
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-black text-white mt-0.5">
                    <RobotIcon className="h-4 w-4" />
                  </div>
                )}
                
                <div
                  className={`rounded-lg p-3 text-sm max-w-[80%] ${
                    msg.role === "user"
                      ? "bg-black text-white"
                      : "border border-gray-300 bg-white text-black"
                  }`}
                >
                  {msg.role === "user" ? (
                    msg.content
                  ) : (
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  )}

                  {msg.products && msg.products.length > 0 && (
                    <div className="mt-2 flex flex-col gap-1.5">
                      {msg.products.map((p) => (
                        <div
                          key={p.id}
                          className="rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs text-black"
                        >
                          <strong>{p.name}</strong> — ${p.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 mr-auto justify-start">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-black text-white mt-0.5">
                  <RobotIcon className="h-4 w-4" />
                </div>
                <div className="rounded-lg border border-gray-300 bg-white p-3 text-sm text-black max-w-[80%]">
                  AI is typing…
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="flex gap-2 border-t border-gray-200 p-3 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="flex-1 rounded border border-gray-300 p-2 text-black focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50"
              placeholder="Ask for a jacket..."
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="rounded bg-black cursor-pointer px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle chat"
        className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-black text-2xl text-white shadow-lg hover:bg-gray-800"
      >
        {open ? "×" : <RobotIcon className="h-7 w-7" />}
      </button>
    </div>
  );
}
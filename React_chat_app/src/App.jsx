import { useState, useEffect } from "react";
import io from "socket.io-client";

// const socket = io("http://localhost:5000");
const socket = io("https://socket-with-react.onrender.com/");


const App = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]); // ✅ use functional update
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      socket.emit("message", messageInput);
      setMessageInput("");
    }
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #fff 40%, #7c3aed 100%)",
        }}
      />

      {/* Chat Content */}
      <div className="relative z-10 bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg w-[400px] max-w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Simple Chat App</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={messageInput}
            placeholder="Type your heart out baby..."
            onChange={(e) => setMessageInput(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Send
          </button>
        </div>

        <section className="space-y-2 max-h-64 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className="bg-purple-100 text-purple-800 px-3 py-2 rounded-lg"
            >
              {message}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default App;

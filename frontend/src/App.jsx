import { useState } from "react";
import "./App.css";
import logo from './assets/logo.png';
import MessageBubble from "./components/MessageBubble";
import ChatInput from "./components/ChatInput";

function App() {
  const [messages, setMessages] = useState([
    { message: "Hello! How can I help you?", sender: "assistant" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { message: input, sender: "user" }]);
    setInput("");

    // Mock AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { message: "This is a mock AI response.", sender: "assistant" }
      ]);
    }, 800);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Echo Logic Chatbot</h1>
      </header>

      {/* Chat Container */}
      <div style={{ display: "flex", flexDirection: "column", padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "10px" }}>
          {messages.map((msg, index) => (
            <MessageBubble key={index} message={msg.message} sender={msg.sender} />
          ))}
        </div>
        <ChatInput input={input} setInput={setInput} onSend={handleSend} />
      </div>
    </div>
  );
}

export default App;

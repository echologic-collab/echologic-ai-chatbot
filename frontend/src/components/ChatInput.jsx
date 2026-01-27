const ChatInput = ({ input, setInput, onSend }) => {
  return (
    <div style={{ display: "flex", marginTop: "10px" }}>
      <input
        style={{
          flex: 1,
          padding: "8px 12px",
          borderRadius: "18px",
          border: "1px solid #ccc",
          fontSize: "14px"
        }}
        type="text"
        value={input}
        placeholder="Type a message..."
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
      />
      <button
        style={{
          marginLeft: "8px",
          padding: "8px 16px",
          borderRadius: "18px",
          border: "none",
          backgroundColor: "#007bff",
          color: "#fff",
          cursor: "pointer"
        }}
        onClick={onSend}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;

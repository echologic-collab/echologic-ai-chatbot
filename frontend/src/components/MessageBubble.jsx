const MessageBubble = ({ message, sender }) => {
  return (
    <div
      style={{
        alignSelf: sender === "user" ? "flex-end" : "flex-start",
        backgroundColor: sender === "user" ? "#007bff" : "#e5e5ea",
        color: sender === "user" ? "#fff" : "#000",
        padding: "10px 14px",
        borderRadius: "18px",
        maxWidth: "70%",
        marginBottom: "6px",
        wordWrap: "break-word"
      }}
    >
      {message}
    </div>
  );
};

export default MessageBubble;

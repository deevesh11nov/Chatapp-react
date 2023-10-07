import { userImage } from "./";
import "../styles/Message.css";

// ---- Component for Text Message in any Conversation ----

function Message(props) {
  const { id, type, content, getUserData } = props;

  const userData = getUserData(id);

  return (
    <div
      className="message-block"
      style={{
        display: "flex",
        flexDirection: type === "send" ? "row-reverse" : "row",
      }}
    >
      <div>
        <div className={`message-content ${type}-message`}>
          <p>{content}</p>
          <div className={`message-arrow ${type}-message-arrow`}></div>
        </div>
        <div className={`message-info ${type === "send" ? "sender" : ""}`}>
          <img
            className="profile-pic"
            width="40px"
            height="40px"
            src={userImage(userData)}
            alt="..."
          />
          <strong>{type === "send" ? "You" : userData.name}</strong>
        </div>
      </div>
    </div>
  );
}

export default Message;

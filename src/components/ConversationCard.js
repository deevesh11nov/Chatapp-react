import { userImage } from "./";
import "../styles/ConversationCard.css";

// ---- Card Component for every Existing Conversation ----

function ConversationCard(props) {
  const { data, getUser, updateConversationId, currentUser } = props;

  // Get User Data of given Contact Id from Parent State Hook
  const userData = getUser(data.contactId);

  // Get the last message sent in this conversation
  function lastMessage() {
    let lastText = "";

    if (data.messages.length > 0) {
      const message = data.messages[data.messages.length - 1];
      lastText =
        message.userId === currentUser
          ? "You: " + message.messageText
          : message.messageText;
    }

    return lastText;
  }

  return (
    <div
      className="conv-card-container"
      onClick={() => updateConversationId(data.conversationId)}
    >
      <img
        className="profile-pic"
        width="65px"
        height="65px"
        src={userImage(userData)}
        alt="..."
      />
      <div className="conv-info">
        <strong>{userData.name}</strong>
        <small>{lastMessage()}</small>
      </div>
    </div>
  );
}

export default ConversationCard;

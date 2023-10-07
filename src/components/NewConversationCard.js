import { userImage, getRandomId } from ".";
import "../styles/ConversationCard.css";

// ---- Component for Displaying Info for every Contact when creating a new Conversation ----

function NewConversationCard(props) {
  const { currentUser, userData, updateConversation } = props;

  if (currentUser === userData.id) {
    return;
  }

  function handleOnClick() {
    let newConversation = {
      conversationId: getRandomId(10, 999),
      contactId: userData.id,
      messages: [],
    };

    updateConversation(newConversation);
  }

  return (
    <div className="conv-card-container" onClick={() => handleOnClick()}>
      <img
        className="profile-pic"
        width="100px"
        height="100px"
        src={userImage(userData)}
        alt="..."
      />
      <div className="conv-info">
        <strong>{userData.name}</strong>
      </div>
    </div>
  );
}

export default NewConversationCard;

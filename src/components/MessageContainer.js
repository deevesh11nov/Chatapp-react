import { useState, useEffect, useRef } from "react";
import Message from "./Message";
import { userImage, getRandomId } from "./";
import "../styles/MessageContainer.css";

function MessageContainer(props) {
  const { getConversationData, currentUser, getUserData, onSend } = props;
  const [conversationData, setConversationData] = useState();

  // to remember botton ref of scroll ele
  const bottomRef = useRef(null);

  useEffect(() => {
    setConversationData(getConversationData());
  }, [getConversationData, conversationData]);

  // Show Empty message Container if Conversation Data is Undefined
  if (conversationData === undefined) {
    return <div className="message-container"></div>;
  }

  // Get User Data for the contact in the Conversation
  const userData = getUserData(conversationData.contactId);

  // Handle when user sends a new text message in the coversation
  function handleSendData() {
    if (document.getElementById("message-input").value === "") {
      return;
    }

    let message = {
      id: getRandomId(10, 999),
      userId: currentUser,
      messageText: document.getElementById("message-input").value,
    };

    document.getElementById("message-input").value = "";

    onSend(conversationData.conversationId, message);
  }

  function handleKeyPress(evt) {
    if (evt.keyCode !== 13) {
      return;
    }

    handleSendData();

    send();
  }

  //scroll on every new message
  function send() {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="message-container">
      <div className="message-bg" data-asset-chat-background-dark="true">
        <div className="message-container-info">
          <img
            className="profile-pic"
            width="60px"
            height="60px"
            src={userImage(userData)}
            alt="..."
          />
          <strong>{userData.name}</strong>
        </div>
        <div className="message-area">
          {conversationData.messages.map((message) => {
            return (
              <Message
                key={message.id}
                type={message.userId === currentUser ? "send" : "receive"}
                id={message.userId}
                content={message.messageText}
                getUserData={getUserData}
              />
            );
          })}

          <div ref={bottomRef} />
        </div>
        <div className="message-input">
          <textarea
            id="message-input"
            placeholder="Type a message"
            onKeyUp={handleKeyPress}
          />
          <button
            onClick={() => {
              handleSendData();
              send();
              send();
            }}
          >
            {/* <i className="fa fa-paper-plane" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="31"
              height="31"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-send"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageContainer;

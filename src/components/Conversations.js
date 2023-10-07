import "../styles/Conversations.css";
import { useState, useEffect } from "react";

import ConversationCard from "./ConversationCard";

function Conversations(props) {
  const {
    conversationData,
    getUserData,
    updateConversationId,
    currentUser,
    showNewConvDialog,
  } = props;
  const [conversations, setConversations] = useState(props.conversationData);

  // Get User Data of the Conversation
  const contacts = conversationData.map((conv) => getUserData(conv.contactId));

  // Set Conversation Data when components have mounted and Data is updated
  useEffect(() => {
    setConversations(conversationData);
  }, [conversationData]);

  // Handle Search Conversation by User Name in Existing Conversations
  function handleSearch(evt) {
    let searchResults = [];

    if (evt.target.value !== "" && evt.target.value.length > 1) {
      contacts.forEach((element) => {
        if (
          element.name.toLowerCase().includes(evt.target.value.toLowerCase())
        ) {
          let result = conversations.find(
            (conv) => conv !== undefined && conv.contactId === element.id
          );
          if (!searchResults.includes(result)) {
            searchResults.push(result);
          }
        }
      });

      setConversations(searchResults);
    } else {
      setConversations(conversationData);
    }
  }

  return (
    <div className="conversation-container">
      <div className="search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-search"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" placeholder="Search" onChange={handleSearch} />
        {/* <i className="fa fa-search search-icon"></i> */}
      </div>
      <div className="add-conversation">
        <strong> CONVERSATIONS</strong>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-plus"
          onClick={() => showNewConvDialog(true)}
          style={{ cursor: "pointer" }}
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>

        {/* <img
          style={{ cursor: "pointer" }}
          width="35"
          height="35"
          src="https://img.icons8.com/pastel-glyph/64/ffffff/plus--v1.png"
          alt="plus--v1"
          onClick={() => showNewConvDialog(true)}
        /> */}
      </div>
      <div className="conversation-list">
        {conversations.map((conversation) => {
          if (conversation === undefined) return "";

          return (
            <ConversationCard
              key={conversation.conversationId}
              data={conversation}
              getUser={getUserData}
              updateConversationId={updateConversationId}
              currentUser={currentUser}
              newConversation={false}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Conversations;

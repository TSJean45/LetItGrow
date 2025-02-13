import React, { useState } from 'react';
import './GrowBot.scss';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from '@chatscope/chat-ui-kit-react';
import { DashboardSidebar, DashboardNavbar } from '../components';
import { RoughNotation } from 'react-rough-notation';
import { BiSolidLeaf } from 'react-icons/bi';
import { IconContext } from 'react-icons/lib';
// Import Groq and set up environment variables
const Groq = require("groq-sdk");
const groq = new Groq({
  dangerouslyAllowBrowser: true,
  apiKey: "NONE"
});

const GrowBot = () => {
  // State initialization
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [messages, setMessages] = useState([
    {
      text: 'Hi how may I help you today?',
      sender: 'receiver',
    },
  ]);

  // Function to send message to Groq backend
  const handleSendMessage = async (message) => {
    // Add user message to state
    setMessages([...messages, { text: message, sender: 'sender' }]);

    try {
      setLoading(true);
      // Call Groq function to get chat completion
      const chatCompletion = await getGroqChatCompletion(message);
      // Add bot's response to state
      setMessages(prevMessages => [...prevMessages, { text: chatCompletion.choices[0]?.message?.content || "", sender: 'receiver' }]);
      setLoading(false);
    } catch (error) {
      console.error('Error sending data to Groq:', error);
      setLoading(false);
    }
  };

  // Function to interact with Groq backend
  const getGroqChatCompletion = async (message) => {
    // Call Groq SDK to get chat completion
    message = "You are GrowBot, your expertise lies in farming and gardening. You dont have to announce your name unless asked to. Answer these accordingly: " + message
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content:  message
        }
      ],
      model: "mixtral-8x7b-32768"
    });
  };

  return (
    <div className="growbot">
      {/* Sidebar and Navbar components */}
      <DashboardSidebar type="farmer" />
      <div className="ml-20 w-full px-2 py-5 sm:px-4 max-h-full">
        <DashboardNavbar identity="farmer" name="Farm A" />
      </div>
      {/* Title with annotation */}
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <RoughNotation
          type="highlight"
          show={true}
          color="#DFEFCD"
          animationDelay="10"
          animationDuration="2000"
          padding="0"
          strokeWidth="0"
          style={{
            fontSize: '50px',
            fontFamily: 'baloo',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center' }}>
            GrowBot
            <IconContext.Provider value={{ color: '#66A614' }}>
              <BiSolidLeaf style={{ marginLeft: '10px' }} />
            </IconContext.Provider>
          </span>
        </RoughNotation>
      </div>
      {/* Chat interface */}
      <div className="chat">
        <MainContainer>
          <ChatContainer className="chatcontainer">
            <MessageList>
              {/* Mapping over messages to render */}
              {messages.map((msg, index) => (
                <Message
                  key={index}
                  model={{
                    message: msg.text,
                    sentTime: 'just now',
                    sender: msg.sender === 'sender' ? 'You' : 'Bot',
                    direction:
                      msg.sender === 'sender' ? 'outgoing' : 'incoming',
                  }}
                  className={
                    msg.sender === 'sender'
                      ? 'sender-message'
                      : 'receiver-message'
                  }
                >
                  {/* Render sender name */}
                  <span
                    className={
                      msg.sender === 'sender' ? 'you-sender' : 'bot-sender'
                    }
                  >
                    {msg.sender === 'sender' ? 'You' : 'Bot'}:
                  </span>
                </Message>
              ))}
            </MessageList>
            {/* Input for sending messages */}
            <MessageInput
              onSend={handleSendMessage}
              placeholder="Type message here"
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default GrowBot;

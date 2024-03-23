import React, { useState } from 'react'
import './GrowBot.scss'
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from '@chatscope/chat-ui-kit-react'
import { DashboardSidebar, DashboardNavbar } from '../components'
import { RoughNotation } from 'react-rough-notation'
import { BiSolidLeaf } from 'react-icons/bi'
import { IconContext } from 'react-icons/lib'

const GrowBot = () => {
  const [messages, setMessages] = useState([
    {
      text: 'Hi how may I help you today?',
      sender: 'receiver',
    },
    {
      text: 'My sunflower is dying',
      sender: 'sender',
    },
    {
      text: 'OK.',
      sender: 'receiver',
    },
  ])

  const handleSendMessage = (message) => {
    setMessages([...messages, { text: message, sender: 'sender' }])
    // Here you can add logic to handle the bot's response
  }

  return (
    <div className="growbot">
      <DashboardSidebar type="farmer" />
      <div className="ml-20 w-full px-2 py-5 sm:px-4 max-h-full">
        <DashboardNavbar identity="farmer" name="Farm A" />
      </div>
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
            <IconContext.Provider value={{color: '#66A614'}}><BiSolidLeaf style={{ marginLeft: '10px' }} /></IconContext.Provider>
            
          </span>
        </RoughNotation>
      </div>
      <div className="chat">
        <MainContainer >
          <ChatContainer className="chatcontainer">
            <MessageList>
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
            <MessageInput
              onSend={handleSendMessage}
              placeholder="Type message here"
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  )
}

export default GrowBot

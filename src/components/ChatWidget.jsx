import React, { useState } from "react";
import { PDCLchat } from "../assets";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  // WhatsApp and Messenger URLs
  const whatsappUrl = "https://wa.me/8801313032593?text=Hello";
  const messengerUrl = "https://m.me/YOUR_FACEBOOK_PAGE_ID";

  // Toggle widget visibility
  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Floating Chat Widget */}
      <div
        className={`fixed bottom-5 right-5 w-80 h-80 z-50 bg-white rounded-lg shadow-lg p-4 transition-all duration-300 ease-in-out ${
          isOpen ? "block" : "hidden"
        }`}>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold mb-4">Chat with Us</h3>
          <button onClick={toggleChat} className="font-bold">
            ✖
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <button
              onClick={toggleChat}
              className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200">
              Chat with WhatsApp
            </button>
          </a>

          <a href={messengerUrl} target="_blank" rel="noopener noreferrer">
            <button
              onClick={toggleChat}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200">
              Chat on Messenger
            </button>
          </a>
        </div>
      </div>

      {/* Floating Button to Open/Close Chat */}
      {!isOpen && ( // Show the button only when the chat is closed
        <button
          onClick={toggleChat}
          className="fixed bottom-5 right-5 bg-transparent p-4 z-50 animate-upDown"
          aria-label="Open chat">
          <img src={PDCLchat} alt="Chat" className="w-16 h-16" />
        </button>
      )}
    </div>
  );
};

export default ChatWidget;

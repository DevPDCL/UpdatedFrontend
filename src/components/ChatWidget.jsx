import React, { useState } from "react";

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
          className="fixed bottom-5 right-5 bg-transparent p-4 z-50"
          aria-label="Open chat">
          <svg
            className="w-12 h-12 fill-[#00984a]"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg">
            {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
            <path d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3 0 0 0 0 0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
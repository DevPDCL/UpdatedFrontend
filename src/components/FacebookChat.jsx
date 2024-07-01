import React, { useEffect } from 'react';

const FacebookChat = () => {
    useEffect(() => {
        const fbCustomerChat = document.createElement('div');
        fbCustomerChat.className = 'fb-customerchat fixed bottom-10 right-10 bg-black h-20 w-20';
        fbCustomerChat.setAttribute('attribution', 'setup_tool');
        fbCustomerChat.setAttribute('page_id', '196298460417225');
        document.body.appendChild(fbCustomerChat);

        if (window.FB) {
            window.FB.XFBML.parse();
            console.log("FB Chat Plugin Parsed");
        }

        return () => {
            document.body.removeChild(fbCustomerChat);
        };
    }, []);

    return null;
};

export default FacebookChat;

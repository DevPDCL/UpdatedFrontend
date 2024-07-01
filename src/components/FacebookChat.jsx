import React, { useEffect } from 'react';

const FacebookChat = () => {
    useEffect(() => {
        const fbCustomerChat = document.createElement('div');
        fbCustomerChat.className = 'fb-customerchat';
        fbCustomerChat.setAttribute('attribution', 'setup_tool');
        fbCustomerChat.setAttribute('page_id', '196298460417225'); // Replace with your Facebook Page ID
        document.body.appendChild(fbCustomerChat);
        console.log("Facebook Chat Div Created", fbCustomerChat);

        const checkFbInit = () => {
            if (window.FB) {
                window.FB.XFBML.parse();
                console.log("FB Chat Plugin Parsed");
            } else {
                console.log("FB SDK not ready, retrying...");
                setTimeout(checkFbInit, 500);
            }
        };

        checkFbInit();

        return () => {
            document.body.removeChild(fbCustomerChat);
        };
    }, []);

    return null;
};

export default FacebookChat;
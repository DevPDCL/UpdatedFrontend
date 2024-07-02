"use client";
import { FacebookProvider, CustomChat } from 'react-facebook';


const FacebookChat = () => {
    
    return (
        <>
            <FacebookProvider appId="7940463979308733" chatSupport>
                <CustomChat pageId="196298460417225" minimized={true} />
            </FacebookProvider>  
        </>
    );
};

export default FacebookChat;
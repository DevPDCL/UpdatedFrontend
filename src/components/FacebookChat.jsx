"use client";
import { FacebookProvider, CustomChat } from 'react-facebook';


const FacebookChat = () => {
    
    return (
        <>
            <FacebookProvider appId="2480202145700902" chatSupport>
                <CustomChat pageId="196298460417225" minimized={true} />
            </FacebookProvider>  
        </>
    );
};

export default FacebookChat;
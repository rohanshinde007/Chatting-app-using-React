import { doc,onSnapshot } from 'firebase/firestore';
import {db} from "../firebase"
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { ChatContext } from './context/ChatContext';

const Chats = () => {

  const [chats , setChats] = useState([]);
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  useEffect(()=>{

    const getChats = ()=>{
    const unSub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      doc.exists() && setChats(doc.data());
  });

  return ()=>{
    unSub();
  };
}
currentUser.uid && getChats()
  },[currentUser.uid]);

  // console.log(Object.entries(chats));

  const handleSelect = (u)=>{
    dispatch({type:"CHANGE_USER", payload: u})
  }

  return (
    <div className='chats'>

   { Object.entries(chats)?.map((chat) =>(
       <div className="userChat" key={chat[0]} onClick = {()=>handleSelect(chat[1].userInfo)}>
       <img src={chat[1].userInfo.photoURL} alt=""/>

       <div className="userChatInfo">
         <span>{chat[1].userInfo.displayName}</span>
         <p>{chat[1].lastMessage?.text}</p>
       </div>
     </div>
        
        ))};
    </div>
  
  );
}

export default Chats

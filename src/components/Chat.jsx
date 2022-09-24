import React, { useContext } from 'react'
import AF from "../img/af.png";
import VC from "../img/vc.png";
import { ChatContext } from './context/ChatContext';
import Inpute from './Inpute';
import Messages from './Messages';

const Chat = () => {

  const {data} = useContext(ChatContext);

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={AF} alt="" />
          <img src={VC} alt="" />
        </div>
      </div>
        <Messages/>
        <Inpute/>
    </div>
  )
}

export default Chat

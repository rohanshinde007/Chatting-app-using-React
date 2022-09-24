import React, { useContext }  from 'react'


import { AuthContext } from './context/AuthContext'
import { ChatContext } from './context/ChatContext';

const Message = ({message}) => {


  const {currentUser } = useContext(AuthContext);
  const {data } = useContext(ChatContext);
  return (
    <div>
      <div className="message owner">

        {/* <div className="messageInfo">
          <img src="https://www.filmibeat.com/ph-big/2017/01/_148482702610.jpg" alt="" />
          <span>just now</span>
        </div>
        <div className="messageContent">
          <p>hello</p>
          <img src="https://www.filmibeat.com/ph-big/2017/01/_148482702610.jpg" alt="" />
        </div> */}
      </div>
    
    </div>
  )
}

export default Message

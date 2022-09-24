import { async } from '@firebase/util';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import attach from "../img/attach.png"
import img from "../img/img.png"
import { AuthContext } from './context/AuthContext';
import { ChatContext } from './context/ChatContext';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Inpute = () => {
  const[ text , setText] = useState("");
  const[ img , setImg] = useState(null);

  const {currentUser } = useContext(AuthContext);
  const {data } = useContext(ChatContext); 

  const handleSend = async()=>{
    if(img){

      const storageRef = ref(storage, uuid());

      const uploadTask  = uploadBytesResumable(storageRef,img);

      uploadTask.on( 
   
        // console.log("yhheheehuuuuaii") 
          (error) => {
            // setErr(true);
          },
          () => {
        
            getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
              await updateDoc(doc(db, "chats", data.chatId),{
                messages: arrayUnion({
                 id: uuid(), 
                 text,
                 senderId:currentUser.uid,
                 date: Timestamp.now(),
                 img:downloadURL
                })
              })
            
            }  );
          });
      

    }else{


await updateDoc(doc(db, "chats", data.chatId),{
  messages: arrayUnion({
   id: uuid(), 
   text,
   senderId:currentUser.uid,
   date: Timestamp.now(),
  }),
});
    }
    await updateDoc(doc(db, "userChats", currentUser.uid),{
      [data.chatId+".lastMessage"]:{text},
      [data.chatId+".date"]: serverTimestamp(),
    })

    await updateDoc(doc(db, "userChats", data.user.uid),{
      [data.chatId+".lastMessage"]:{text},
      [data.chatId+".date"]: serverTimestamp(),
    })


    setText(" ");
    setImg(null);

  };
  return (
    <div className='input'>
      <input type="text"  placeholder='Type something...' onChange={(e)=>{setText(e.target.value)}}  value={text}/>
      <div className="send">
        <img src={attach} alt="" />
        <input type="file" style={{display:"none"}} id="file" onChange={(e)=>{setImg(e.target.files[0])}}/>
        <label htmlFor="file">
            <img src={img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Inpute

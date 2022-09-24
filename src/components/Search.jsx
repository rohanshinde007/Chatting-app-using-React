import React, { useContext } from 'react'
import { useState } from 'react'
import { collection, query, where,  setDoc, doc, updateDoc, serverTimestamp, getDoc, getDocs } from "firebase/firestore";
import {db} from "../firebase"
import { async } from '@firebase/util';
import { AuthContext } from './context/AuthContext'

const Search = () => {
  const [username , setUsername] = useState("");
  const [user , setUser] = useState(null);
  const [err , setErr] = useState(false);
  const {currentUser} = useContext(AuthContext)

  const handleSearch = async()=>{
 const q = query(collection(db, "users"),where("displayName", "==", username));

 try{
 const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  setUser(doc.data())
});
 }catch(err){
  setErr(true);
 }
  }

  const handleKey = (e) =>{
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async()=>{
    // check whether the group(chats in firestore ) exists , if not create 
    const combinedId = currentUser.uid>user.uid ? currentUser.uid+user.uid: user.uid+currentUser.uid;
    try {
      const res  = await getDoc(doc(db , 'chats', combinedId));

      if(!res.exists()){
        //create chat in chat collection. 
        await setDoc(doc(db,"chats",combinedId),{messages:[]});
      }
      // create user chat
      await updateDoc(doc(db, "userChats" ,currentUser.uid),{
        [combinedId+'.userInfo']:{
          uid:user.uid,
          displayName:user.displayName,
          photoURL:user.photoURL        
        },
        [combinedId+'.date']: serverTimestamp()
        });

      await updateDoc(doc(db, "userChats" ,user.uid),{
        [combinedId+'.userInfo']:{
          uid:currentUser.uid,
          displayName:currentUser.displayName,
          photoURL:currentUser.photoURL        
        },
        [combinedId+'.date']: serverTimestamp()
        });
 

    } catch (err) {setErr(true)}
    
setUser(null);
setUsername("");

    //create user chat

  }

  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='find a user hare' onKeyDown={handleKey} onChange={(e)=>setUsername(e.target.value)} value={username}/>
      </div>
      {err && <span>User Not Found</span>}
      
      {user && <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL}  />
   
      <div className="userChatInfo">
        <span>{user.displayName}</span>
        <p>Hello</p>
      </div>
      </div>}
      
    </div>
  )
}

export default Search

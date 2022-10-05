import React  from "react";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./styles.css";
import CryptoJS from 'crypto-js';


const socket = io.connect("http://localhost:5000");

function PersonA() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [secretKey,setSecretKey] = useState(null)

    useEffect(() => {
        console.log("connection made");
        socket.on("get_secretKey", (payload) => {
            // console.log("get_secretKey", payload);
            setSecretKey(prev => payload)
        });
          
    }, []);
    
    const sendChat = (e) => {
        e.preventDefault();
        if (!secretKey || !message){
            return
        }
        // Encrypt
        const ciphertext = CryptoJS.AES.encrypt(message, secretKey).toString();
        console.log("ciphertext before emit", ciphertext);

        socket.emit("PersonA",  ciphertext );  
        setMessage("");
    };

    useEffect(() => {
        socket.on("PersonB", (payload) => {
            // Decrypt
            console.log(secretKey)
            if(!secretKey){
                return
            }
            const bytes  = CryptoJS.AES.decrypt(payload, secretKey);
            const originalText = bytes.toString(CryptoJS.enc.Utf8);
            console.log("chat", chat);
            setChat([...chat, originalText]);
            console.log("chat", chat);
            console.log("chat payload", payload);
        });
    }, [secretKey,chat]);
  
    return (
      <div >
        <h2 className="user_title">User 1</h2>
        <div className="chat_body">
            {chat.map((payload, index) => {
            return <p className="message" key={index}>{payload}</p>;
            })}
        </div>

        <form className="bottm_cont" onSubmit={sendChat}>
          <input
            value={message}
            type="text"
            placeholder="send Text"
            name="chat"
            className="input"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="sendBtn" type="submit">send</button>
        </form>
      </div>    
    );
  }
  
  export default PersonA;
  
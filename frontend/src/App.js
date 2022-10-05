import "./App.css";
import React from "react";
import PersonA from "./container/PersonA";
import PersonB from "./container/PersonB";

function App() {
  return (
    <div className="App">
      <h1>E2E Chat app</h1>
      <div className="HIW">How it works: </div>
      <div className="text">
        It is a Symmetric End-to-End Encrypted chat app built with CryptoJS and
        Socket.io.
      </div>
      <div className="chat_cont_block">
        <div className="user_chat_contanier">
          <PersonA key={1} />
        </div>
        <div className="user_chat_contanier">
          <PersonB key={2} />
        </div>
      </div>
    </div>
  );
}

export default App;

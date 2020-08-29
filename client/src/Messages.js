import React from "react";
import Message from "./Message/Message";
import AutoScroll from "@brianmcallister/react-auto-scroll";

const Messages = ({ mensajes, usuario }) => (
    <AutoScroll height={"100vh"} showOption={false}>
      {mensajes.map((message, i) => (
        <div key={i}>
          <Message
            message={{ text: message.mensaje, user: message.nombre }}
            name={usuario}
          />
        </div>
      ))}
    </AutoScroll>
);

export default Messages;

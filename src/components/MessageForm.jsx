import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const MessageForm = ({
  msg,
  sendMsg,
  setMsg,
  room,
  sendPvtMsg,
  Usrname,
  socket,
}) => {
  const appendElem = () => {
    const para = document.createElement("p");
    const text = document.createTextNode(msg);
    para.appendChild(text);
    const div = document.createElement("div");
    div.classList.add("outgoing-msg");
    div.appendChild(para);
    const nodeDiv = div.cloneNode(true);
    document.getElementById("outgoing-msg").append(nodeDiv);
  };
  const formSubmit = (e) => {
    e.preventDefault();
    if (room === "") {
      sendMsg();
    } else {
      sendPvtMsg();
    }
    appendElem();
  };
  useEffect(() => {
    socket.emit("user_joined", { Usrname });
  }, []);

  return (
    <footer>
      <Form onSubmit={formSubmit} className="grid my-2 mx-4 message-form">
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            rows={1}
            required
            autoComplete="off"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Message"
          />
        </Form.Group>
        <Button type="submit" variant="success send-message">
          <span className="material-symbols-outlined">send</span>
        </Button>
      </Form>
    </footer>
  );
};

export default MessageForm;
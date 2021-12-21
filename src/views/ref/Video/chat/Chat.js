import { Col, Input } from "antd";
import React, { useContext, useEffect, useState, useRef } from "react";
import { FaTelegramPlane } from "react-icons/fa";

import VideoContext from "../../../../context/VideoContext";
const { TextArea } = Input;
const Chat = () => {
  const {
    sendMsg: sendMsgFunc,

    chat,
  } = useContext(VideoContext);
  const [sendMsg, setSendMsg] = useState("");
  const onSearch = (value) => {
    if (value && value.length) sendMsgFunc(value);
    setSendMsg("");
  };

  const dummy = useRef();
  const messageHandler = (e) => {
    if (e.key === "Enter" && !e.ctrlKey) {
      onSearch(sendMsg);
    } else if (e.key === "Enter") {
      setSendMsg(sendMsg + "\n");
    }
  };

  useEffect(() => {
    if (dummy?.current) dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div>
      <div className="msg_flex">
        <div className="msg_note">
          Message can be seen only by people in the call and are deleted when
          the call end
        </div>
        {chat.map((msg, i) => (
          <div className={msg.type === "sent" ? "msg_sent" : "msg_rcv"} key={i}>
            {msg.msg}
          </div>
        ))}
        <div ref={dummy} id="no_border"></div>
      </div>
      <Col>
        <TextArea
          className="input_msg"
          value={sendMsg}
          onChange={(e) => setSendMsg(e.target.value)}
          placeholder="Message..!"
          autoSize={{ minRows: 3, maxRows: 3 }}
          onKeyDown={(e) => {
            messageHandler(e);
          }}
        />
        <FaTelegramPlane
          className="msg_icon"
          onClick={() => onSearch(sendMsg)}
        />
      </Col>
    </div>
  );
};

export default Chat;

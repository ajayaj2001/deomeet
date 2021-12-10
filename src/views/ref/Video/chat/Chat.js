import { Button, Col, Input, Row } from "antd";
import React, { useContext, useEffect, useState, useRef } from "react";
import { FaTelegramPlane } from "react-icons/fa";

import VideoContext from "../../../../context/VideoContext";
const { TextArea } = Input;
const Chat = () => {
  const {
    sendMsg: sendMsgFunc,
    msgRcv,
    chat,
    setChat,
  } = useContext(VideoContext);
  const [sendMsg, setSendMsg] = useState("");
  const onSearch = (value) => {
    if (value && value.length) sendMsgFunc(value);
    setSendMsg("");
  };

  const dummy = useRef();

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
        {chat.map((msg) => (
          <div className={msg.type === "sent" ? "msg_sent" : "msg_rcv"}>
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
            if (e.key === "Enter" && e.ctrlKey) onSearch(sendMsg);
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

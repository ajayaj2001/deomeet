import React, { useContext, useEffect, useState } from "react";
import VideoContext from "../../../context/VideoContext";
import "./Video.scss";
import { GiSpeakerOff } from "react-icons/gi";
import Chat from "./chat/Chat";
import { MdOutlineStopScreenShare } from "react-icons/md";
import { Row, notification, Avatar, Drawer, Col } from "antd";
import { AiOutlineMessage, AiOutlineUser } from "react-icons/ai";
import Footer from "./footer/Footer";
import Option from "../options/Options";
import { socket } from "../../../context/VideoState";
import Share from "./share/Share";
import Info from "./info/Info";

const Video = () => {
  const {
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    name,
    setName,
    callEnded,
    me,
    callUser,
    leaveCall,
    answerCall,
    sendMsg: sendMsgFunc,
    msgRcv,
    chat,
    setChat,
    userName,
    myVdoStatus,
    screenShare,
    fullScreen,
    handleScreenSharing,
    userVdoStatus,
    updateVideo,
    myMicStatus,
    userMicStatus,
    updateMic,
  } = useContext(VideoContext);

  const [drawerOpen, setDrawerOpen] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  socket.on("msgRcv", ({ name, msg: value, sender }) => {
    let msg = {};
    msg.msg = value;
    msg.type = "rcv";
    msg.sender = sender;
    msg.timestamp = Date.now();
    setChat([...chat, msg]);
  });

  // const showModal = (showVal) => {
  //   setIsModalVisible(showVal);
  // };
  const handleDrawerContent = () => {
    if (drawerOpen === "info") {
      return <Info me={me} name={name} setName={setName} />;
    } else if (drawerOpen === "chat") {
      return <Chat />;
    } else if (drawerOpen === "share") {
      return <Share code={me} />;
    }
  };

  useEffect(() => {
    if (msgRcv.value && !isModalVisible) {
      notification.open({
        message: "",
        description: `${msgRcv.sender}: ${msgRcv.value}`,
        icon: <AiOutlineMessage style={{ color: "#108ee9" }} />,
      });
    }
  }, [msgRcv]);

  return (
    <Row
      justify="space-between"
      style={{ height: "100vh", backgroundColor: "#161b21" }}
    >
      <Col xs={24}>
        <div style={{ height: "10vh" }}></div>
        <div className="grid" style={{ height: "75vh" }}>
          {stream ? (
            <div
              className="card"
              id={callAccepted && !callEnded ? "video1" : "video3"}
            >
              <div className={myVdoStatus ? "video_name" : "video_name-none"}>
                <h3 className="video_name-color">{myVdoStatus && name}</h3>
              </div>
              <div className="video-avatar-container">
                <video
                  playsInline
                  muted
                  onClick={fullScreen}
                  ref={myVideo}
                  autoPlay
                  className="video-active"
                  style={{
                    opacity: `${myVdoStatus ? "1" : "0"}`,
                    objectFit: "cover",
                  }}
                />

                <Avatar
                  style={{
                    backgroundColor: "#826387",
                    position: "absolute",
                    opacity: `${myVdoStatus ? "-1" : "2"}`,
                  }}
                  size={98}
                  icon={!name && <AiOutlineUser />}
                >
                  {name}
                </Avatar>
              </div>

              <div className="iconsDiv">
                {callAccepted && !callEnded && (
                  <div
                    className="icons"
                    onClick={() => {
                      setIsModalVisible(!isModalVisible);
                    }}
                    tabIndex="0"
                  >
                    <AiOutlineMessage />
                  </div>
                )}
                {callAccepted && !callEnded && (
                  <div
                    className="icons"
                    onClick={() => handleScreenSharing()}
                    tabIndex="0"
                  >
                    <MdOutlineStopScreenShare />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bouncing-loader">
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}

          {callAccepted && !callEnded && userVideo && (
            <div className="card" style={{ textAlign: "center" }} id="video2">
              <div
                style={{ height: "2rem" }}
                className={userVdoStatus ? "video_name" : "video_name-none"}
              >
                <h3>{userVdoStatus && (call.name || userName)}</h3>
              </div>
              {!userMicStatus && (
                <GiSpeakerOff
                  size={20}
                  color="white"
                  className="user_speaker"
                />
              )}

              <div className="video-avatar-container">
                <video
                  playsInline
                  ref={userVideo}
                  onClick={fullScreen}
                  autoPlay
                  className="video-active"
                  style={{
                    opacity: `${userVdoStatus ? "1" : "0"}`,
                  }}
                />

                <Avatar
                  style={{
                    backgroundColor: "#826387",
                    position: "absolute",
                    opacity: `${userVdoStatus ? "-1" : "2"}`,
                  }}
                  size={98}
                  icon={!(userName || call.name) && <AiOutlineUser />}
                >
                  {userName || call.name}
                </Avatar>
              </div>
            </div>
          )}
          <Drawer
            mask={false}
            zIndex={100}
            width="370px"
            title={drawerOpen.toUpperCase()}
            placement="right"
            onClose={() => setDrawerOpen("")}
            visible={drawerOpen.length > 0}
            style={{
              height: "90%",
              marginTop: "1rem",
            }}
            bodyStyle={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Row>{handleDrawerContent()}</Row>
          </Drawer>
        </div>
      </Col>
      <Col xs={24}>
        <Footer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      </Col>
      <Option />
    </Row>
  );
};

export default Video;

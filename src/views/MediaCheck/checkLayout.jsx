import {
  Row,
  Col,
  Card,
  Button,
  Tooltip,
  Input,
  Avatar,
  message,
  Spin,
} from "antd";
import { useContext, useState } from "react";
import { FcEndCall } from "react-icons/fc";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiMicOff, FiVideoOff, FiMic, FiVideo } from "react-icons/fi";
import { FaUserEdit, FaRegKeyboard } from "react-icons/fa";
import { BiUserVoice } from "react-icons/bi";
import { Link } from "react-router-dom";
import VideoContext from "../../context/VideoContext";

const CheckLayout = ({ videoRef, videoOption, setVideoOption }) => {
  const { name, setName, userMode, callUser, setJoin, join } =
    useContext(VideoContext);
  const [code, setCode] = useState("");
  const [callWaiting, setCallWaiting] = useState(false);

  const joinMeet = () => {
    if (userMode === "existing") {
      console.log(name, code);
      if (name.length > 0 && code.length > 5) {
        setCallWaiting(true);
        callUser(code);
      } else {
        message.error("Enter your Name and Meet Code");
      }
    } else if (userMode === "new") {
      if (name.length > 0) {
        setJoin(true);
      } else {
        message.error("Enter your Name ");
      }
    } else {
      message.error("Invalid User ");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Row
        justify="center"
        align="middle"
        style={{ width: "100%", marginBottom: "2rem" }}
      >
        <Col xs={8} style={{ position: "relative", height: "23rem" }}>
          <video
            style={{
              position: "relative",
              zIndex: "0",
              borderRadius: "2rem",
              objectFit: "cover",
            }}
            width="100%"
            height="100%"
            playsInline
            muted
            ref={videoRef}
            autoPlay
          />
          <div
            style={{
              position: "absolute",
              borderRadius: "2.2rem",
              backgroundColor: videoOption.video ? "" : "black",
              padding: "1.5rem 1.2rem 1.5rem 2rem",
              color: "white",
              top: "0px",
              left: "0px",
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ textAlign: "end" }}>
              <BsThreeDotsVertical size={23} />
            </div>
            <div
              style={{
                textAlign: "center",
                fontSize: "1.3rem",
              }}
            >
              {!videoOption.video ? "Camera is Off" : ""}
            </div>
            <div style={{ textAlign: "center" }}>
              <div>
                <Tooltip
                  title={videoOption.audio ? "Turn off Mic" : "Turn on Mic"}
                >
                  <Button
                    onClick={() =>
                      setVideoOption({
                        ...videoOption,
                        audio: !videoOption.audio,
                      })
                    }
                    type="primary"
                    shape="circle"
                    size="large"
                    style={{
                      marginRight: "2rem",
                      width: "3rem",
                      height: "3rem",
                    }}
                    danger
                    icon={videoOption.audio ? <FiMic /> : <FiMicOff />}
                  />
                </Tooltip>
                <Tooltip
                  title={
                    videoOption.audio ? "Turn off Camera" : "Turn on Camera"
                  }
                >
                  <Button
                    onClick={() =>
                      setVideoOption({
                        ...videoOption,
                        video: !videoOption.video,
                      })
                    }
                    type="primary"
                    shape="circle"
                    style={{
                      width: "3rem",
                      height: "3rem",
                    }}
                    size="large"
                    danger
                    icon={videoOption.video ? <FiVideo /> : <FiVideoOff />}
                  />
                </Tooltip>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={5}>
          <Row style={{ height: "35vh" }} justify="center" align="middle">
            <Col>
              <Row justify="center" style={{ marginBottom: "2rem" }}>
                <Avatar
                  style={{
                    backgroundColor: "#116",
                  }}
                  size={98}
                >
                  {name || <BiUserVoice />}
                </Avatar>
              </Row>
              {!callWaiting && !join ? (
                <>
                  <h2 style={{ marginBottom: "2rem", textAlign: "center" }}>
                    Ready to Join ?
                  </h2>
                  <Col>
                    <Button
                      type="primary"
                      shape="round"
                      size="large"
                      style={{ marginRight: "1rem" }}
                      onClick={() => joinMeet()}
                    >
                      {userMode === "existing" ? "Ask to Join ?" : "Join Now"}
                    </Button>
                    <Link to="/">
                      <Button
                        danger
                        type="ghost"
                        shape="round"
                        icon={<FcEndCall style={{ marginRight: ".6rem" }} />}
                        size="large"
                      >
                        End
                      </Button>
                    </Link>
                  </Col>
                </>
              ) : (
                <>
                  <Row justify="center">
                    <Spin tip="Wait for the Host to Accept..." />
                  </Row>
                </>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Col offset={userMode === "existing" ? 5 : 8}>
          <Card style={{ backgroundColor: "#FEF5ED" }}>
            <label>Enter Your Name :</label>
            <Input
              value={name}
              size="large"
              placeholder="Enter Your Name"
              prefix={<FaUserEdit />}
              onChange={(e) => {
                localStorage.setItem("name", e.target.value);
                setName(e.target.value);
              }}
            />
          </Card>
        </Col>
        {userMode === "existing" && (
          <Col offset={1}>
            <Card style={{ backgroundColor: "#FEF5ED" }}>
              <label>Enter Meet Code :</label>
              <Input
                placeholder="  Code"
                size="large"
                value={code}
                prefix={<FaRegKeyboard />}
                onChange={(e) => setCode(e.target.value)}
              />
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default CheckLayout;

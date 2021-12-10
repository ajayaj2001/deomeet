import { Button, Col, Row, Tooltip } from "antd";
import Timer from "../../../Timer";
import "./Footer.scss";
import {
  BsInfoCircle,
  BsInfoCircleFill,
  BsChatRightDots,
  BsChatRightDotsFill,
} from "react-icons/bs";
import {
  MdOutlineScreenShare,
  MdOutlineStopScreenShare,
  MdCallEnd,
} from "react-icons/md";
import {
  FiVideoOff,
  FiVideo,
  FiMicOff,
  FiMic,
  FiSettings,
} from "react-icons/fi";
import { FaRegShareSquare, FaShareSquare } from "react-icons/fa";
import VideoContext from "../../../../context/VideoContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Footer = ({ setDrawerOpen, drawerOpen }) => {
  let navigate = useNavigate();
  const {
    updateVideo,
    updateMic,
    myVdoStatus,
    myMicStatus,
    screenShare,
    handleScreenSharing,
    leaveCall,
    leaveCall1,
  } = useContext(VideoContext);
  return (
    <Row
      justify="space-between"
      align="middle"
      style={{
        borderTop: "#15e8d8 2px solid",
        color: "white",
        minHeight: "100%",
        padding: "0px 2.5rem 0px 2.5rem",
      }}
    >
      <Col>
        <Timer />
      </Col>
      <Col>
        <Tooltip
          zIndex={150}
          title={myMicStatus ? "Turn off microphone" : "Turn on microphone"}
        >
          <Button
            onClick={() => updateMic()}
            type="primary"
            danger
            className={`footer_button-center ${
              myMicStatus
                ? "footer_button-center-on"
                : "footer_button-center-off"
            }`}
            icon={myMicStatus ? <FiMic /> : <FiMicOff />}
          />
        </Tooltip>
        <Tooltip
          zIndex={150}
          title={myVdoStatus ? "Turn off camera" : "Turn on camera"}
        >
          <Button
            shape="circle"
            type="primary"
            danger
            onClick={() => updateVideo()}
            className={`footer_button-center ${
              myVdoStatus
                ? "footer_button-center-on"
                : "footer_button-center-off"
            }`}
            icon={myVdoStatus ? <FiVideo /> : <FiVideoOff />}
          />
        </Tooltip>
        <Tooltip zIndex={150} title="End Call">
          <Button
            shape="circle"
            type="primary"
            danger
            onClick={() => {
              leaveCall().then((e) => navigate("/"));
            }}
            className={`footer_button-center-end   `}
            icon={<MdCallEnd size={25} />}
          />
        </Tooltip>
        <Tooltip zIndex={150} title="Present now">
          <Button
            shape="circle"
            type="primary"
            danger
            onClick={() => handleScreenSharing()}
            className={`footer_button-center ${
              screenShare
                ? "footer_button-center-on"
                : "footer_button-center-off"
            }`}
            icon={
              screenShare && myVdoStatus ? (
                <MdOutlineScreenShare />
              ) : (
                <MdOutlineStopScreenShare />
              )
            }
          />
        </Tooltip>
        <Tooltip zIndex={150} title="More options">
          <Button
            shape="circle"
            type="primary"
            danger
            className={`footer_button-center footer_button-center-off`}
            icon={<FiSettings />}
          />
        </Tooltip>
      </Col>
      <Col>
        <Tooltip zIndex={150} title="Info">
          <Button
            shape="circle"
            type="text"
            onClick={() => setDrawerOpen("info")}
            style={{ color: "white", marginRight: "1.3rem" }}
            icon={
              drawerOpen === "info" ? (
                <BsInfoCircleFill size={23} />
              ) : (
                <BsInfoCircle size={23} />
              )
            }
          />
        </Tooltip>
        <Tooltip zIndex={150} title="Chat with everyone">
          <Button
            shape="circle"
            type="text"
            onClick={() => setDrawerOpen("chat")}
            style={{ color: "white", marginRight: "1.3rem" }}
            icon={
              drawerOpen === "chat" ? (
                <BsChatRightDotsFill size={23} />
              ) : (
                <BsChatRightDots size={23} />
              )
            }
          />
        </Tooltip>
        <Tooltip zIndex={150} title="Add Participation">
          <Button
            shape="circle"
            type="text"
            onClick={() => setDrawerOpen("share")}
            style={{ color: "white" }}
            icon={
              drawerOpen === "share" ? (
                <FaShareSquare size={23} />
              ) : (
                <FaRegShareSquare size={23} />
              )
            }
          />
        </Tooltip>
      </Col>
    </Row>
  );
};

export default Footer;

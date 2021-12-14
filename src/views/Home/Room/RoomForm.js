import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import VideoContext from "../../../context/VideoContext";
import { useContext } from "react";
const RoomForm = () => {
  const { me, setUserMode } = useContext(VideoContext);
  return (
    <Row justify="center" align="middle" style={{ height: "100%" }}>
      <Col xs={10} style={{ textAlign: "center" }}>
        <Col style={{ marginBottom: "4rem" }}>
          <h1>Create / Join Room</h1>
        </Col>
        <Col xs={24} style={{ marginBottom: "1rem" }}>
          <Link to={`/existingRoom`}>
            <Button
              type="primary"
              shape="round"
              onClick={() => setUserMode("existing")}
            >
              Enter Existing Room ( code required )
            </Button>
          </Link>
        </Col>
        <div style={{ marginBottom: "1rem" }}>OR</div>
        <Col style={{ marginBottom: "4rem" }}>
          <Link to={`/${me}`}>
            <Button
              type="primary"
              shape="round"
              onClick={() => setUserMode("new")}
            >
              Create New Room
            </Button>
          </Link>
        </Col>
      </Col>
    </Row>
  );
};

export default RoomForm;

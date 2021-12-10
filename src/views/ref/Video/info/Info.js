import { Button, Input, message } from "antd";
import * as classes from "../../options/Options.module.css";
import { UserOutlined, CopyOutlined } from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Info = ({ me, name, setName }) => {
  return (
    <div>
      <div style={{ marginBottom: "0.5rem" }}>
        <h4 className={classes.infoLabel}>Change your Name here</h4>
        <Input
          size="large"
          placeholder="Your name"
          prefix={<UserOutlined style={{ color: "white" }} />}
          maxLength={15}
          suffix={<small style={{ color: "#17aca3" }}>{name.length}/15</small>}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            localStorage.setItem("name", e.target.value);
          }}
          className={classes.inputgroup}
        />

        <div className={classes.share_options}>
          <CopyToClipboard text={me}>
            <Button
              type="primary"
              shape="round"
              block
              className="option_btn"
              icon={<CopyOutlined />}
              tabIndex="0"
              onClick={() => message.success("Code copied successfully!")}
            >
              Copy code
            </Button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
};

export default Info;

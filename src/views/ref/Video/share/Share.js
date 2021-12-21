import { Row, Col, Button, message } from "antd";
import { RiWhatsappLine } from "react-icons/ri";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaTelegramPlane,
} from "react-icons/fa";
import { MdEmail, MdFileCopy } from "react-icons/md";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TelegramShareButton,
} from "react-share";

const Share = ({ code }) => {
  const description = `Join this meeting with the given code "${code}"\n ( or ) join with the below link quickly \n`;
  return (
    <div>
      <Row>
        <Col xs={24}>
          <WhatsappShareButton
            className="sbutton sbutton_whatsapp"
            title={description}
            separator="Link : "
            url={window.location.href}
          >
            <RiWhatsappLine size={15} />
            &ensp; Whatsapp
          </WhatsappShareButton>
        </Col>
        <Col xs={24}>
          <FacebookShareButton
            className="sbutton sbutton_facebook"
            url={window.location.href}
            quote={description}
          >
            <FaFacebookF />
            &ensp; Facebook
          </FacebookShareButton>
        </Col>
        <Col xs={24}>
          <LinkedinShareButton
            className="sbutton sbutton_linkedin"
            url={window.location.href}
            title="AJ-MEET"
            summary={description}
          >
            <FaLinkedinIn />
            &ensp; Linkedin
          </LinkedinShareButton>
        </Col>
        <Col xs={24}>
          <TwitterShareButton
            className="sbutton sbutton_twitter"
            url={window.location.href}
            hashtags={["joinmeet", "ajmeet"]}
            title={description}
          >
            <FaTwitter />
            &ensp; Twitter
          </TwitterShareButton>
        </Col>
        <Col xs={24}>
          <EmailShareButton
            className="sbutton sbutton_mail"
            url={window.location.href}
            subject="AJ-MEET "
            separator="Link: "
            body={description}
          >
            <MdEmail />
            &ensp; Email
          </EmailShareButton>
        </Col>
        <Col xs={24}>
          <TelegramShareButton
            className="sbutton sbutton_telegram"
            url={window.location.href}
            title={description}
          >
            <FaTelegramPlane />
            &ensp; Telegram
          </TelegramShareButton>
        </Col>
        <Col xs={24}>
          <CopyToClipboard text={window.location.href}>
            <Button
              className="sbutton sbutton_copy"
              onClick={() => message.success("Code copied successfully!")}
            >
              <MdFileCopy />
              &ensp; Copy URL
            </Button>
          </CopyToClipboard>
        </Col>
        <Col xs={24}>
          <CopyToClipboard text={code}>
            <Button
              className="sbutton sbutton_copy"
              onClick={() => message.success("Code copied successfully!")}
            >
              <MdFileCopy /> &ensp; Copy code
            </Button>
          </CopyToClipboard>
        </Col>
      </Row>
    </div>
  );
};

export default Share;

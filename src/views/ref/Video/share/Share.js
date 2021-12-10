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
  return (
    <div>
      <Row>
        <Col xs={24}>
          <WhatsappShareButton
            className="sbutton sbutton_whatsapp"
            title={`Join this meeting with the given code "${code}"\n`}
            separator="Link: "
            url={"https://ajayaj.tech/#"}
          >
            <RiWhatsappLine size={15} /> Whatsapp
          </WhatsappShareButton>
        </Col>
        <Col xs={24}>
          <FacebookShareButton
            className="sbutton sbutton_facebook"
            url={"https://ajayaj.tech/#"}
            quote={`Join this meeting with the given code "${code}"\n `}
          >
            <FaFacebookF /> Facebook
          </FacebookShareButton>
        </Col>
        <Col xs={24}>
          <LinkedinShareButton
            className="sbutton sbutton_linkedin"
            url={"https://ajayaj.tech/#"}
            title="AJ-MEET"
            summary={`Join this meeting with the given code "${code}"\n`}
          >
            <FaLinkedinIn /> Linkedin
          </LinkedinShareButton>
        </Col>
        <Col xs={24}>
          <TwitterShareButton
            className="sbutton sbutton_twitter"
            url={"https://ajayaj.tech/#"}
            hashtags={["joinmeet", "ajmeet"]}
            title={`Join this meeting with the given code "${code}"\n`}
          >
            <FaTwitter /> Twitter
          </TwitterShareButton>
        </Col>
        <Col xs={24}>
          <EmailShareButton
            className="sbutton sbutton_mail"
            url={"https://ajayaj.tech/#"}
            subject="AJ-MEET "
            separator="Link: "
            body={`Join this meeting with the given code "${code}"\n`}
          >
            <MdEmail /> Email
          </EmailShareButton>
        </Col>
        <Col xs={24}>
          <TelegramShareButton
            className="sbutton sbutton_telegram"
            url={"https://ajayaj.tech/#"}
            title={`Join this meeting with the given code "${code}"\n`}
          >
            <FaTelegramPlane /> Telegram
          </TelegramShareButton>
        </Col>
        <Col xs={24}>
          <CopyToClipboard text={code}>
            <Button
              className="sbutton sbutton_copy"
              onClick={() => message.success("Code copied successfully!")}
            >
              <MdFileCopy /> Copy code
            </Button>
          </CopyToClipboard>
        </Col>
      </Row>
    </div>
  );
};

export default Share;

import React from "react";
import { enquireScreen } from "enquire-js";
import "../static/style";
import BannerAnim from "rc-banner-anim";
import logo from "../../../images/logo2.png";

import RoomForm from "./RoomForm";
const { Element } = BannerAnim;
const { BgElement } = Element;

let isMobile = false;
enquireScreen((b) => {
  isMobile = b;
});

class Room extends React.PureComponent {
  state = {
    isMobile,
    showShadow: false,
  };

  componentDidMount() {
    enquireScreen((b) => {
      this.setState({
        isMobile: !!b,
      });
    });
  }
  navToShadow = (e) => {
    this.setState({ showShadow: e.mode === "leave" });
  };
  render() {
    return (
      <div className="banner page-wrapper">
        <div className="page">
          <div className="logo">
            <img src={logo} alt="logo" width="100%" height="100%" />
          </div>
          <BannerAnim style={{ position: "relative" }}>
            <Element style={{ height: "100%" }}>
              <BgElement
                key="bg"
                className="banner-bg"
                style={{
                  backgroundImage: `url(${
                    isMobile
                      ? "https://gw.alipayobjects.com/zos/rmsportal/ksMYqrCyhwQNdBKReFIU.svg"
                      : "https://gw.alipayobjects.com/zos/rmsportal/cTyLQiaRrpzxFAuWwoDQ.svg"
                  })`,
                }}
              />

              <RoomForm />
            </Element>
          </BannerAnim>
        </div>
      </div>
    );
  }
}
export default Room;

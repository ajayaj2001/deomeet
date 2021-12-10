import { useEffect, useState, useRef, useContext } from "react";
import Video from "../ref/Video/Video";
import CheckLayout from "./checkLayout";
import VideoContext from "../../context/VideoContext";

const MediaCheck = () => {
  const { join } = useContext(VideoContext);
  const videoRef = useRef(null);
  const [videoOption, setVideoOption] = useState({
    video: true,
    audio: true,
  });
  useEffect(() => {
    const getUserMedia = async () => {
      try {
        navigator.mediaDevices
          .getUserMedia({
            video: videoOption.video,
            audio: videoOption.audio,
          })
          .then((stream) => {
            videoRef.current.srcObject = stream;
          });
      } catch (err) {
        console.log(err);
      }
    };
    getUserMedia();
  }, []);

  useEffect(() => {
    if (!navigator.onLine) alert("Connect to internet!");
  }, [navigator]);

  useEffect(() => {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }, []);
  return (
    <div>
      {join ? (
        <Video />
      ) : (
        <CheckLayout
          videoRef={videoRef}
          videoOption={videoOption}
          setVideoOption={setVideoOption}
        />
      )}
    </div>
  );
};

export default MediaCheck;

import Home from "./views/Home";
import "antd/dist/antd.css";
import VideoState from "./context/VideoState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MediaCheck from "./views/MediaCheck";
function App() {
  return (
    <div className="App">
      <VideoState>
        <Router>
          <Routes>
            <Route path="/:id" element={<MediaCheck />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </VideoState>
    </div>
  );
}

export default App;

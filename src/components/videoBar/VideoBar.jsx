import "./VideoBar.css";
import video from "../../assets/videos/hero.mp4";

const VideoBar = () => {
  return (
    <div className="container">
      <div className="container-sidebar">
        <aside className="sidebar">

          <video
            className="sidebar-video"
            src={video}
            autoPlay
            muted
            loop
            playsInline
          />

        </aside>
      </div>
    </div>
  );
};

export default VideoBar;
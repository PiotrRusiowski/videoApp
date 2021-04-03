import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { VideoCard } from "../VideoCard/VideoCard";
import { Container, Row, Col } from "reactstrap";

const VideosList = () => {
  const selectedVideoList = useSelector(({ videosList }) => videosList);
  return (
    <Row sm="4">
      {selectedVideoList.map((video) => (
        <Col>
          <VideoCard key={video.id} video={video} />
        </Col>
      ))}
    </Row>
  );
};

export default VideosList;

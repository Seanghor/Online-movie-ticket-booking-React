const VideoSkeleton: React.FunctionComponent = () => {
  return (
    <div className="relative w-full h-48 overflow-hidden" style={{ paddingBottom: '56.25%' }}>
      <div className="absolute top-0 left-0 w-full h-full" ></div>
    </div>
  );
};

export default VideoSkeleton;
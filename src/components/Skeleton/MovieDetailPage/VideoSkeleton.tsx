import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
const VideoSkeleton: React.FunctionComponent = () => {
    return (
        <div className="relative h-[800px] overflow-hidden bg-gray-300 animate-pulse">
            <PlayCircleOutlineIcon className="absolute top-0 left-0 right-0 bottom-0 m-auto text-gray-200 dark:text-gray-400" style={{ fontSize: '50px' }} />
        </div>
    );
};

export default VideoSkeleton;
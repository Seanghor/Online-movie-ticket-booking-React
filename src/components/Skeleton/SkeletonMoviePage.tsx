const SkeletonMoviePage = () => {
  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg max-w-md items-center h-[350px] space-y-2.5 animate-pulse ">
        <div data-placeholder className="h-72 w-full overflow-hidden relative bg-gray-200 rounded-lg"></div>
        
        <div className="flex flex-col p-4">
            <div className="flex">
            <div data-placeholder  className="flex h-5 w-full overflow-hidden relative bg-gray-200 mb-3"></div>
            </div>
            <div className="flex mt-1">
            <div data-placeholder  className="flex h-5 w-5 overflow-hidden relative bg-gray-200 mr-1"></div>
            <div data-placeholder  className="flex h-5 w-48 overflow-hidden relative bg-gray-200"></div>
            </div>
        </div>
    </div>
  )
}

export default SkeletonMoviePage

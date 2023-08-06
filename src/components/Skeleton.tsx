import React from 'react'

const Skeleton = () => {
  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg max-w-md items-center h-[350px]">
        {/* <div className="flex items-center p-4">
            <div data-placeholder className="mr-2 h-10 w-10  rounded-full overflow-hidden relative bg-gray-200">
            </div>

            <div className="flex flex-col justify-between items-center">
            <div data-placeholder className="mb-2 h-5 w-40 overflow-hidden relative bg-gray-200">
            </div>
            </div>
        </div> */}

        <div data-placeholder className="h-72 w-full overflow-hidden relative bg-gray-200 rounded-lg"></div>
        
        <div className="flex flex-col p-4">
            <div className="flex">
            {/* <div data-placeholder  className=" flex h-5 w-5 overflow-hidden relative bg-gray-200 mr-1"></div> */}
            <div data-placeholder  className="flex h-5 w-full overflow-hidden relative bg-gray-200 mb-3"></div>
            </div>
            <div className="flex mt-1">
            <div data-placeholder  className="flex h-5 w-5 overflow-hidden relative bg-gray-200 mr-1"></div>
            <div data-placeholder  className="flex h-5 w-48 overflow-hidden relative bg-gray-200"></div>
            </div>
        </div>

        {/* <div className="w-full h-px  overflow-hidden relative bg-gray-200 m-4"></div>
        <div className="flex justify-between items-center p-4 w-full">
            <div data-placeholder className="mr-2 h-10 w-16  overflow-hidden relative bg-gray-200"></div>
            <div data-placeholder className="mb-2 h-5 w-20 overflow-hidden relative bg-gray-200"> </div>
        </div> */}
    </div>
  )
}

export default Skeleton

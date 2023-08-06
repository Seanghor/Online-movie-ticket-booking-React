import TicketBookingSkeleton from './TicketBookingSkeleton';

const SkeletonSeat = () => {
  return (
    // Skeleton loader while loading
    <div className="flex flex-row">
      <div className="flex flex-row">
        {/* Select Seat */}
        <div className="h-screen border border-gray-200 rounded shadow flex flex-col justify-center items-center rounded-xl py-5">
          {/* Screen */}
          <div className="screen rounded-t-[0%] rounded-b-[0%]">
          </div>
          {/* Screen End */}
          <div className="flex flex-col my-10 overflow-y-auto h-4/5">
            {Array.from({ length: 10 }, (_, indexRow) => (
              <div key={indexRow} className='flex flex-row justify-evenly place-items-center px-10'>
                {Array.from({ length: 4 }, (_, indexBlock) => (
                    <div key={indexBlock} className="mx-1 w-12 h-12 bg-gray-300 rounded-full animate-pulse">
                    {/* <Skeleton circle={true} height={50} width={50} /> */}
                  </div>
                  ))}
                
                <div className='flex flex-row px-10 justify-items-start items-start py-7 w-2/3'>
                  {Array.from({ length: 10 }, (_, indexBlock) => (
                    <div key={indexBlock} className="mx-1 w-12 h-12 bg-gray-300 rounded-full animate-pulse">
                      {/* <Skeleton circle={true} height={50} width={50} /> */}
                    </div>
                  ))}
                </div>
                {Array.from({ length: 4 }, (_, indexBlock) => (
                    <div key={indexBlock} className="mx-1 w-12 h-12 bg-gray-300 rounded-full animate-pulse">
                    {/* <Skeleton circle={true} height={50} width={50} /> */}
                  </div>
                  ))}
              </div>
            ))}
          </div>

          {/* Seat note */}
          <div className=''>
            {/* <SeatNote /> */}
          </div>

        </div>
      </div>
       {/* Ticket Summary */}           
        <div className="ml-10 basis-1/3">
           <TicketBookingSkeleton/>
        </div>
    </div>
  )
}

export default SkeletonSeat

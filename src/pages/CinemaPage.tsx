import { useEffect, useState } from 'react';
import CinemaImg from '../assets/cinema.jpg';
import { CinemaBranch } from '../components/CinemaBranch';

import { CinemaResponse } from '../types/campus.dto';
// import { log } from 'console';
import { getAllCinema } from '../services/campus';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';
// import { getTheaters } from '../services/campus';

const Cinemas = () => {
  const navigate = useNavigate()
  const [cinema, SetCinema] = useState<CinemaResponse[]>([]);
  // search:
  const [search, setSearch] = useState('')

  //useEffect
  useEffect(() => {
    const fetchAllCinema = async () => {
      const res = await getAllCinema()
      console.log(res.status);
      const allCinema = await res.json();
      SetCinema(allCinema);


    }
    fetchAllCinema();
  }, [])
  // console.log(cinema);



  const handleSeeMore = async (id: number) => {
    // console.log("See more");
    // window.location.href = `/cinema/moreinfiormation?id=${id}`;
    navigate(`/cinema/moreinfiormation?id=${id}`)
  }

  const handleShowTime = async (id: number) => {
    // console.log("Show Time");
    // window.location.href = `/cinema/showtime?id=${id}`;
    navigate(`/cinema/showtime?id=${id}`)
  }
  return (
    <div className="mx-auto bg-gradient-to-r from-red-900 to-purple-900 min-h-screen">
      <img src={CinemaImg} alt="" className='w-full h-96 object-cover' />

      <div className="container flex-grow w-full py-4 sm:py-16 mx-auto ">
        <div className="md:max-w-4xl ">
          <SearchBar search={search} onChange={setSearch} placeHolder='search' />
        </div>
        <div className='divide-y'>
          {
            cinema.filter(
              ((item: any) => {
                return search?.toLocaleLowerCase() === ""
                  ? item
                  : item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
              })
            )
              .map((singleCinema: CinemaResponse, index: number) => (
                <CinemaBranch
                  key={index}
                  branchName={singleCinema.name}
                  address={singleCinema.address || ""}
                  phone={singleCinema?.phone || ""}
                  map={singleCinema.map}
                  onClickBtn1={() => { handleSeeMore(singleCinema?.id) }}
                  onClickBtn2={() => { handleShowTime(singleCinema?.id) }}
                />
              ))

          }
        </div>


      </div>
    </div>
  )
}

export default Cinemas

import Image from 'next/image'

type RideProp = {
  id: number
  city: string
  date: string
  map_url: string
  station_path: number[]
  state: string
  origin_station_code: number
}

const Ride = ({
  city,
  map_url,
  station_path,
  state,
  id,
  origin_station_code,
  date,
}: RideProp) => {
  return (
    <div className="bg-[#171717] rounded-[0.625rem] text-[#cfcfcf] flex flex-col  md:flex-row justify-between p-5 mb-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-[18.5rem] h-[11rem] md:h-[9.25rem] bg-[#292929] md:mr-10 rounded-[0.313rem] overflow-hidden mb-6 md:mb-0">
          <Image
            src={map_url}
            alt="ride"
            layout="responsive"
            width={296}
            height={148}
            style={{ width: '100%', height: '100%', display: 'none' }}
          />
        </div>
        <div className="text-[0.938rem]">
          <p className="mb-2">
            Ride Id : <span className="font-medium text-white">{id}</span>
          </p>
          <p className="mb-2">
            Origin Station :{' '}
            <span className="font-medium text-white">
              {origin_station_code}
            </span>
          </p>
          <p className="mb-2">
            station_path :{' '}
            <span className="font-medium text-white">
              [{station_path.toString()}]
            </span>
          </p>
          <p className="mb-2">
            Date : <span className="font-medium text-white">{date}</span>
          </p>
          <p className="mb-2">
            Distance : <span className="font-medium text-white">0</span>
          </p>
        </div>
      </div>
      <div className="">
        <button
          type="button"
          className="rounded-full py-2 px-4 mr-6 text-xs bg-[#000] bg-opacity-[0.56]"
        >
          {city}
        </button>
        <button
          type="button"
          className="rounded-full py-2 px-4 text-xs bg-[#000] bg-opacity-[0.56]"
        >
          {state}
        </button>
      </div>
    </div>
  )
}

export default Ride

import Image from 'next/image'

type HeaderProps = {
  user: {
    name: string
    station_code: number
    url: string
  }
}

const Header = ({ user }: HeaderProps) => {
  return (
    <div className="bg-[#101010] text-[#fff] py-4 mb-6 sticky top-0 w-full z-10">
      <div className="flex justify-between items-center w-[95%] mx-auto">
        <h2 className=" text-xl md:text-[1.8rem] font-bold">Edvora</h2>
        <div className="flex items-center">
          <p className="mr-4 text-sm mb:text-base font-bold">{user.name}</p>
          <Image
            src={user.url || 'https://picsum.photos/200'}
            alt={user.name}
            width={40}
            height={40}
            style={{ borderRadius: '50%' }}
          />
        </div>
      </div>
    </div>
  )
}

export default Header

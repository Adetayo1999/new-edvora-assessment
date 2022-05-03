import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import filterIcon from '../assets/img/filter-icon.svg'
import navbarStyles from '../styles/navbar.module.css'

type NavbarProps = {
  upcomingRides: number
  pastRides: number
  active: number
  handleActive: (index: number) => void
  states: string[]
  cities: string[]
  stateFilter: string
  cityFilter: string
  handleFilter: (e: React.SyntheticEvent) => void
}

const Navbar = ({
  upcomingRides,
  pastRides,
  active,
  handleActive,
  states,
  cities,
  stateFilter,
  cityFilter,
  handleFilter,
}: NavbarProps) => {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <div className="mb-4">
      <div className="w-[95%] mx-auto flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex mb-6 md:mb-0 justify-between md:justify-start">
          {[
            {
              text: 'Nearest rides',
              number: null,
              path: '/',
            },
            {
              text: 'Upcoming rides',
              number: upcomingRides,
              path: '/',
            },
            {
              text: 'Past rides',
              number: pastRides,
              path: '/',
            },
          ].map((link, index) => (
            <Link href={link.path} key={Math.random() * Date.now()}>
              <a
                className={`text-xs md:text-sm md:text-[1rem] ${
                  active === index
                    ? 'text-[#fff]  border-white border-b-2 font-bold'
                    : 'text-[#D0CBCB]'
                }  md:mr-10 hover:text-[#fff] transition-colors pb-1`}
                onClick={() => handleActive(index)}
              >
                {link.text} {link.number !== null && `(${link.number})`}
              </a>
            </Link>
          ))}
        </div>
        <div className="relative">
          <button type="button" onClick={() => setIsVisible(!isVisible)}>
            <span>
              {' '}
              <Image src={filterIcon} alt="filter-icon" />{' '}
            </span>
            <span className="ml-2 text-[#f2f2f2] text-xs md:text-[0.85rem]">
              Filters
            </span>
          </button>
          {isVisible && (
            <div className="bg-[#131313] w-[14.25rem] h-[11.875rem] absolute md:-left-40 mt-2 rounded-xl p-3 md:p-5">
              <h4 className="text-[#A5A5A5] pb-2 mb-3 border-b border-[#cbcbcb]">
                Filters
              </h4>
              <div className={` ${navbarStyles.select} my-3`}>
                <select
                  name="states"
                  value={stateFilter}
                  onChange={handleFilter}
                  id=""
                  className={navbarStyles.standardSelect}
                >
                  <option value="">State</option>
                  {states.map((state: string) => (
                    <option key={Math.random() * Date.now()} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div className={navbarStyles.select}>
                <select
                  name="cities"
                  id=""
                  value={cityFilter}
                  onChange={handleFilter}
                  className={navbarStyles.standardSelect}
                >
                  <option value="">City</option>
                  {cities.map((city: string) => (
                    <option key={Math.random() * Date.now()} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar

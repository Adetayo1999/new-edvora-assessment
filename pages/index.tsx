import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Header from '../components/header'
import Navbar from '../components/navbar'
import Ride from '../components/ride'
import { getUser } from '../service/user.service'
import { getRides } from '../service/ride.service'
import { RideProp } from '../types/ride'

const Home: NextPage = () => {
  const [user, setUser] = useState({
    name: '',
    station_code: 0,
    url: '',
  })
  const [, setLoading] = useState(false)
  const [, setError] = useState('')
  const [active, setActive] = useState(0)
  const [stateFilter, setStateFilter] = useState('')
  const [cityFilter, setCityFilter] = useState('')
  const [rideState, setRideState] = useState({
    loading: false,
    rides: [],
    error: '',
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const response = await getUser()
        setUser(response.data)
        setLoading(false)
      } catch (err) {
        setError('Something went wrong')
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    const fetchRides = async () => {
      try {
        setRideState((prev) => ({ ...prev, loading: true }))
        const response = await getRides()
        const ridesWithPosition = response.data.map((ride: RideProp) => {
          let position = Math.abs(user.station_code - ride.station_path[0])
          ride.station_path.map((path) => {
            if (position > Math.abs(user.station_code - path)) {
              position = Math.abs(user.station_code - path)
            }
          })
          ride.position = position
          return ride
        })
        setRideState((prev) => ({
          ...prev,
          rides: ridesWithPosition,
          loading: false,
          error: '',
        }))
      } catch (err) {
        setRideState((prev) => ({
          ...prev,
          rides: [],
          error: 'Something weng wrong',
          loading: false,
        }))
      }
    }
    fetchRides()
  }, [user.station_code])

  const handleActive = (index: number) => {
    setActive(index)
  }

  const handleFilter = (e: React.BaseSyntheticEvent) => {
    const { name, value } = e.target

    if (name === 'states') {
      setStateFilter(value)
      return
    }
    setCityFilter(value)
  }

  return (
    <div className="min-h-screen bg-[#292929] pb-10">
      <Header user={user} />
      <Navbar
        stateFilter={stateFilter}
        cityFilter={cityFilter}
        handleFilter={handleFilter}
        upcomingRides={
          rideState.rides.filter(
            (ride: RideProp) =>
              new Date(ride.date).getTime() > new Date().getTime()
          ).length
        }
        pastRides={
          rideState.rides.filter(
            (ride: RideProp) =>
              new Date(ride.date).getTime() < new Date().getTime()
          ).length
        }
        active={active}
        handleActive={handleActive}
        states={rideState.rides.map((ride: RideProp) => ride.state)}
        cities={rideState.rides
          .filter((ride: RideProp) => {
            if (stateFilter) {
              return ride.state === stateFilter
            }
            return ride
          })
          .map((ride: RideProp) => ride.city)}
      />
      <div className="w-[95%] mx-auto">
        {rideState.loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          rideState.rides.length > 0 &&
          rideState.rides
            .sort((ride1: RideProp, ride2: RideProp) =>
              ride1.position > ride2.position ? 1 : -1
            )
            .filter((ride: RideProp) => ride.state.includes(stateFilter))
            .filter((ride: RideProp) => ride.city.includes(cityFilter))
            .filter((ride: RideProp) => {
              if (active === 1) {
                return new Date(ride.date).getTime() > new Date().getTime()
              } else if (active === 0) {
                return new Date(ride.date).getTime() < new Date().getTime()
              }
              return ride
            })
            .map(
              ({
                id,
                city,
                date,
                map_url,
                origin_station_code,
                state,
                station_path,
                position,
              }) => (
                <Ride
                  key={Math.random() * Date.now()}
                  id={id}
                  city={city}
                  date={date}
                  map_url={map_url}
                  origin_station_code={origin_station_code}
                  state={state}
                  station_path={station_path}
                  position={position}
                />
              )
            )
        )}
      </div>
    </div>
  )
}

export default Home

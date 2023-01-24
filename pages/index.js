import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Paper, Button, Text, Group, TextInput } from '@mantine/core';


export default function Home() {
  const [data, setData] = useState({})
  const [location,setLocation] = useState('');
  const [weather, setWeather] = useState('')
  const [errorMessage, setErrorMessage] = useState('');


  var apiKey = "5dfcc4ac8bc24858dc36669d2e82db95"
  var lang = "en"
  var units = "metric"
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}&lang=${lang}`

  const searchLocation = (event) => {
    if(event.key === 'Enter') {
      axios.get(url)
        .then((response) => {
          console.clear();
          setData(response.data)
          console.log(response.data)
          setWeather(response.data.weather)
          setErrorMessage("")
        }).catch(err => {
          console.log(err)
          setErrorMessage("Please enter another location")
          setData({})
          setWeather()
        })
        setLocation('')
    }
  }


  return (
    
    

    <div 
    style={{
      position: "static",
      height:"100vh",
      backgroundImage:"url('https://littlevisuals.co/images/fluff.jpg')",
      backgroundSize: "cover"
    }} >

      <main className={styles.main}>

        <h1>My Weather App</h1>

        <Paper withBorder p="lg" style={{maxWidth: "500"}}>

      {errorMessage}

      <Group position="apart">
      <Group position="apart">
      <Group position="apart">

        <Text size="xl" weight={500}>

          Check the weather!

          <Text size="lg" >

          Enter a city name

        <TextInput
        
        label="City Name"
        value={location}
        onChange={event => setLocation(event.target.value)}
        placeholder='Enter Location'
        onKeyDown={searchLocation}
        type="text"
        
        />
         
        {data.name}
        </Text>
        </Text>
        </Group>
        </Group>
        </Group>
        {
          weather && weather.map((w, index) => {
            return(
              <div key={index}>
                <div>{w.description}</div>
                <div>
                  {w.main} </div>
              </div>
            )
          })
        }
        </Paper>


      </main>

  
    </div>
  )
}

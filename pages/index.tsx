import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "styles/index.module.scss";
import { WeatherBlock, MainWeather } from "components";
import { parseMainWeather } from "utils/conversions";
import { MouseEventHandler, useState } from "react";

interface MainWeatherData {
  city: string;
  lat: string;
  lon: string;
}
interface WeatherData {
  mainWeather: any;
  resolvedWeatherDataArray: any;
}

const Home: NextPage<WeatherData> = ({ mainWeather }) => {
  const [degree, changeDegree] = useState<string>("f");
  return (
    <main className={styles.main}>
      <div className={styles.weather_data_area}>
        <h1
          className={styles.degreeToggle}
          onClick={() => {
            if (degree === "f") changeDegree("c");
            if (degree === "c") changeDegree("f");
          }}
        >
          {degree === "f" && "°F"}
          {degree === "c" && "°C"}
        </h1>
        <MainWeather degree={degree} data={mainWeather} />
      </div>

      {/* <header className={styles.hero}>
        <section className={styles.welcome_section}>
          <p>Check the weather in your city!</p>
          <input type="text" />
        </section>

        <MainWeather data={props.parsedMainWeatherData} />
      </header>
      <div className={styles.big_weather_grid}>
        {props.resolvedWeatherDataArray.map((w: any) => {
          return <WeatherBlock data={w} />;
        })}
      </div> */}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const api_key = process.env.API_KEY;

  // const weatherRes = await (
  //   await fetch(
  //     `https://api.openweathermap.org/data/2.5/onecall?lat=${query.lat}&lon=${query.lon}&appid=${api_key}`
  //   )
  // ).json();
  let weatherRes: any = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${query.lat}&lon=${query.lon}&appid=${api_key}`
  );
  weatherRes = await weatherRes.json();

  weatherRes = {
    ...parseMainWeather(weatherRes),
    lat: query.lat,
    lon: query.lon,
    city: query.city,
  };

  const cities: object[] = [
    { city: "San Francisco", lat: "37.7749", lon: "122.4194" },
    { city: "New York", lat: "40.7128", lon: "74.0060" },
    { city: "London", lat: "51.5072", lon: "0.1276" },
    { city: "Hong Kong", lat: "22.3193", lon: "114.1694" },
    { city: "Cairo", lat: "30.0444", lon: "31.2357" },
    { city: "Tokyo", lat: "35.6762", lon: "139.6503" },
    { city: "Barcelona", lat: "41.3874", lon: "2.1686" },
    { city: "Seoul", lat: "37.5665", lon: "126.9780" },
    { city: "Dayton", lat: "39.7589", lon: "84.1916" },
  ];

  return {
    props: {
      mainWeather: { ...weatherRes },
    },
  };
  // const weatherDataArray = cities.map(async (city: any) => {
  //   const data = await (
  //     await fetch(
  //       `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&appid=${api_key}`
  //     )
  //   ).json();
  //   const parsed = parseMainWeather(data);
  //   parsed.city = city.city as string;
  //   parsed.lat = city.lat as string;
  //   parsed.lon = city.lon as string;
  //   return parsed;
  // });

  // const resolvedWeatherDataArray = await Promise.all(weatherDataArray);

  // const weatherRes = await (
  //   await fetch(
  //     `https://api.openweathermap.org/data/2.5/onecall?lat=${query.lat}&lon=${query.lon}&appid=${api_key}`
  //   )
  // ).json();

  // const parsedMainWeatherData = parseMainWeather(weatherRes);
  // parsedMainWeatherData.city = query.city as string;
  // parsedMainWeatherData.lat = query.lat as string;
  // parsedMainWeatherData.lon = query.lon as string;
  // parsedMainWeatherData.main = true;

  // return {
  //   props: {
  //     parsedMainWeatherData,
  //     resolvedWeatherDataArray,
  //   },
  // };
};

export default Home;

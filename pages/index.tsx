import type { NextPage, GetServerSideProps } from "next";
import styles from "styles/index.module.scss";
import { MainWeather } from "components";
import { parseMainWeather } from "utils/conversions";
import { useState } from "react";

interface WeatherData {
  mainWeather: any;
  resolvedWeatherDataArray: any;
}

const Home: NextPage<WeatherData> = ({ mainWeather }) => {
  const [degree, changeDegree] = useState<string>("f");
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1>This is a little weather app I made.</h1>
        <p>
          If your location is enabled, it shows you the weather for your
          location.
        </p>
      </section>
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
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const api_key = process.env.API_KEY;

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
};

export default Home;

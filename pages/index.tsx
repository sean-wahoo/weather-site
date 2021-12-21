import type { NextPage, GetServerSideProps } from "next";
import styles from "styles/index.module.scss";
import { MainWeather } from "components";
import { nameToCode, parseMainWeather } from "utils/conversions";
import { ChangeEvent, useState } from "react";
import Link from "next/link";

interface WeatherData {
  mainWeather: any;
  api_key: string;
}

const Home: NextPage<WeatherData> = ({ mainWeather, api_key }) => {
  const [error, setError] = useState<string>("");
  const [degree, changeDegree] = useState<string>("f");
  const [userCity, changeUserCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<any>(mainWeather);

  const onFormSubmit = async (userCity: string) => {
    try {
      if (userCity.split(",").length < 2)
        throw new Error("Please provide a valid state!");

      const city = userCity.split(",")[0].trim();
      const state = userCity.split(",")[1].trim();

      if (!city) throw new Error("Please provide a valid city name!");
      if (!state) throw new Error("Please provide a valid state!");

      let code = state?.length > 2 ? nameToCode(state) : state.toUpperCase();
      if (!code) throw new Error("Please provide a valid state!");

      let data: any = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city},${code},US&limit=5&appid=${api_key}`
      );
      data = await data.json();
      let weatherRes: any = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&appid=${api_key}`
      );
      weatherRes = await weatherRes.json();
      weatherRes = {
        ...parseMainWeather(weatherRes),
        lat: data[0].lat,
        lon: data[0].lon,
        city: data[0].name,
        state: data[0].state,
      };
      setWeatherData(weatherRes);
      setError("");
    } catch (error: any) {
      changeUserCity("");
      setError(error.message);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1>This is a little weather app I made.</h1>
        <h6>It uses the OpenWeatherMap.org Weather API and Next.JS</h6>
        <h6>At the moment, this only works for cities in the United States.</h6>
        <h6>
          Come look at more stuff I made at{" "}
          <Link href="https://seanreichel.com">
            <a target="_blank">my website</a>
          </Link>
          .
        </h6>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onFormSubmit(userCity);
          }}
        >
          <label htmlFor="userCity">
            Search your city and see the weather!
          </label>
          <input
            type="text"
            placeholder="city, state"
            id="userCity"
            value={userCity}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              changeUserCity(e.currentTarget.value)
            }
          />

          <button className={styles.city_submit_button} type="submit">
            Search your city
          </button>
        </form>
        {error.length > 0 && (
          <div className={styles.error_box}>
            <h1 className={styles.error_message}>{error}</h1>
          </div>
        )}
      </section>
      <div className={styles.weather_data_area}>
        <div className={styles.weather_data_header}>
          <h1 className={styles.city}>
            Weather in {weatherData.city}, {weatherData.state}...
          </h1>
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
        </div>
        <MainWeather degree={degree} data={weatherData} />
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

  // const cities: object[] = [
  //   { city: "San Francisco", lat: "37.7749", lon: "122.4194" },
  //   { city: "New York", lat: "40.7128", lon: "74.0060" },
  //   { city: "London", lat: "51.5072", lon: "0.1276" },
  //   { city: "Hong Kong", lat: "22.3193", lon: "114.1694" },
  //   { city: "Cairo", lat: "30.0444", lon: "31.2357" },
  //   { city: "Tokyo", lat: "35.6762", lon: "139.6503" },
  //   { city: "Barcelona", lat: "41.3874", lon: "2.1686" },
  //   { city: "Seoul", lat: "37.5665", lon: "126.9780" },
  //   { city: "Dayton", lat: "39.7589", lon: "84.1916" },
  // ];

  return {
    props: {
      mainWeather: { ...weatherRes },
      api_key,
    },
  };
};

export default Home;

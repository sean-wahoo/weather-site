import styles from "styles/MainWeather.module.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet, faWind, faSun } from "@fortawesome/free-solid-svg-icons";

export const MainWeather = ({ degree, data }: any) => {
  const {
    temp_f,
    temp_c,
    weather_icon,
    temp_min_c,
    temp_min_f,
    temp_max_f,
    temp_max_c,
    humidity,
    uvi,
    wind_speed,
  } = data.current;

  const temp = degree === "f" ? temp_f : temp_c;
  const temp_max = degree === "f" ? temp_max_f : temp_max_c;
  const temp_min = degree === "f" ? temp_min_f : temp_min_c;
  const temp_style =
    degree === "f" ? styles.temperature_f : styles.temperature_c;

  return (
    <div className={styles.weather}>
      <div className={styles.main_info}>
        <section className={`${styles.block} ${styles.temp_and_weather}`}>
          <h1 className={`${temp_style} ${styles.main_temp}`}>{temp}</h1>
          <img className={styles.weather_icon} src={weather_icon} />
          <h2 className={`${temp_style} ${styles.minmax_temp}`}>
            {temp_max}
          </h2>{" "}
          <h2
            className={`${temp_style} ${styles.minmax_temp}`}
            style={{ marginLeft: "1rem", opacity: 0.6 }}
          >
            {temp_min}
          </h2>
        </section>
        <section className={`${styles.block} ${styles.details}`}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faDroplet} color="#9BDFFF" size="2x" />
            <h6>Humidity</h6>
            <h6 className={styles.humidity}>{humidity}</h6>
          </div>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faWind} color="#E5EBEE" size="2x" />
            <h6>Wind</h6>
            <h6 className={styles.wind_speed}>{wind_speed}</h6>
          </div>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faSun} color="#FFE437" size="2x" />
            <h6>UV Index</h6>
            <h6 className={styles.uvi}>{uvi}</h6>
          </div>
        </section>
      </div>
      <div className={styles.forecast_container}>
        <section className={`${styles.block} ${styles.forecast}`}>
          {data.week.map((day: any, i: number) => {
            if (i === 0) return;
            const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const date = new Date();
            let weekday_num = date.getDay() + i;
            if (weekday_num > 6) weekday_num = weekday_num - 7;
            const weekday_name = days[weekday_num];
            return (
              <div className={styles.day}>
                <h6 className={styles.weekday_name}>{weekday_name}</h6>
                <img className={styles.weather_icon} src={day.weather_icon} />

                <h6 className={`${temp_style} ${styles.main_temp}`}>{temp}</h6>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default MainWeather;

import styles from "styles/WeatherBlock.module.scss";
import PulseLoader from "react-spinners/PulseLoader";
import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";

interface WeatherProps {
  country: string;
  city: string;
  region: string;
}

export const WeatherBlock = ({ data }: any) => {
  const { main } = data;
  const [loaded, setLoaded] = useState<boolean>(true);

  return (
    <div className={`${main ? styles.main_block : styles.block}`}>
      <div>
        <h1>{data.city}</h1>
        <img src={data.current.weather_icon} />
        {<h1>{data.current.weather_description}</h1>}
      </div>
      <div className={styles.temps}>
        <span className={styles.high}>
          {Math.round(data.current.temp_max_f)}
          <sup>°F</sup>
        </span>
        <span className={styles.low}>
          {Math.round(data.current.temp_min_f)}
          <sup>°F</sup>
        </span>
      </div>
      {main && (
        <div className={styles.weekdays}>
          {data.week.map((day: any) => {
            return (
              <div className={styles.weekday}>
                <img src={day.weather_icon} className={styles.weekday} />
                <div>
                  <span>
                    {Math.round(day.temp_f)}
                    <sup>°F</sup>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WeatherBlock;

export const ktof = (t: number) => {
  return (t - 273.15) * (9 / 5) + 32;
};
export const ktoc = (t: number) => {
  return t - 273.15;
};
export const ftoc = (t: number) => {
  return (t - 32) * (5 / 9);
};
export const ctof = (t: number) => {
  return (t * 9) / 5 + 32;
};
export const capitalize = (s: string) => {
  let tmp: string[] = s.split(" ");
  tmp = tmp.map((s: string) => {
    s = s[0].toUpperCase() + s.substring(1);
    return s;
  });
  return tmp.join(" ");
};

export const parseMainWeather = (data: any) => {
  const week: any = data.daily.map((day: any) => {
    return {
      temp_f: ktof(day.temp.day),
      temp_c: ktoc(day.temp.day),
      weather_description: capitalize(day.weather[0].description),
      weather_icon: `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`,
    };
  });

  const mainWeatherData = {
    main: false,
    city: "",
    lat: "",
    lon: "",
    current: {
      temp_f: ktof(data.current.temp),
      temp_c: ktoc(data.current.temp),
      temp_min_f: ktof(data.daily[0].temp.min),
      temp_min_c: ktoc(data.daily[0].temp.min),
      temp_max_f: ktof(data.daily[0].temp.max),
      temp_max_c: ktoc(data.daily[0].temp.max),
      feels_like: data.current.feels_like,
      weather_description: capitalize(data.current.weather[0].description),
      weather_icon: `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`,
    },
    week,
  };
  return mainWeatherData;
};
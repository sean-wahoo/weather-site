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
      temp_f: Math.round(ktof(day.temp.day)),
      temp_c: Math.round(ktoc(day.temp.day)),
      weather_description: capitalize(day.weather[0].description),
      weather_icon: `https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`,
    };
  });

  const mainWeatherData = {
    main: false,
    city: "",
    lat: "",
    lon: "",
    current: {
      uvi: data.current.uvi,
      wind_speed: data.current.wind_speed,
      humidity: data.current.humidity,
      temp_f: Math.round(ktof(data.current.temp)),
      temp_c: Math.round(ktoc(data.current.temp)),
      temp_min_f: Math.round(ktof(data.daily[0].temp.min)),
      temp_min_c: Math.round(ktoc(data.daily[0].temp.min)),
      temp_max_f: Math.round(ktof(data.daily[0].temp.max)),
      temp_max_c: Math.round(ktoc(data.daily[0].temp.max)),
      feels_like: data.current.feels_like,
      weather_description: capitalize(data.current.weather[0].description),
      weather_icon: `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@4x.png`,
    },
    week,
  };
  return mainWeatherData;
};

export const nameToCode = (state: string) => {
  const states = [
    ["Arizona", "AZ"],
    ["Alabama", "AL"],
    ["Alaska", "AK"],
    ["Arkansas", "AR"],
    ["California", "CA"],
    ["Colorado", "CO"],
    ["Connecticut", "CT"],
    ["Delaware", "DE"],
    ["Florida", "FL"],
    ["Georgia", "GA"],
    ["Hawaii", "HI"],
    ["Idaho", "ID"],
    ["Illinois", "IL"],
    ["Indiana", "IN"],
    ["Iowa", "IA"],
    ["Kansas", "KS"],
    ["Kentucky", "KY"],
    ["Louisiana", "LA"],
    ["Maine", "ME"],
    ["Maryland", "MD"],
    ["Massachusetts", "MA"],
    ["Michigan", "MI"],
    ["Minnesota", "MN"],
    ["Mississippi", "MS"],
    ["Missouri", "MO"],
    ["Montana", "MT"],
    ["Nebraska", "NE"],
    ["Nevada", "NV"],
    ["New Hampshire", "NH"],
    ["New Jersey", "NJ"],
    ["New Mexico", "NM"],
    ["New York", "NY"],
    ["North Carolina", "NC"],
    ["North Dakota", "ND"],
    ["Ohio", "OH"],
    ["Oklahoma", "OK"],
    ["Oregon", "OR"],
    ["Pennsylvania", "PA"],
    ["Rhode Island", "RI"],
    ["South Carolina", "SC"],
    ["South Dakota", "SD"],
    ["Tennessee", "TN"],
    ["Texas", "TX"],
    ["Utah", "UT"],
    ["Vermont", "VT"],
    ["Virginia", "VA"],
    ["Washington", "WA"],
    ["West Virginia", "WV"],
    ["Wisconsin", "WI"],
    ["Wyoming", "WY"],
  ];
  const tmp = state.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
  for (let i = 0; i < states.length; i++) {
    if (states[i][0] == tmp) {
      return states[i][1];
    }
  }
};
export const codeToName = (state: string) => {
  const states = [
    ["Arizona", "AZ"],
    ["Alabama", "AL"],
    ["Alaska", "AK"],
    ["Arkansas", "AR"],
    ["California", "CA"],
    ["Colorado", "CO"],
    ["Connecticut", "CT"],
    ["Delaware", "DE"],
    ["Florida", "FL"],
    ["Georgia", "GA"],
    ["Hawaii", "HI"],
    ["Idaho", "ID"],
    ["Illinois", "IL"],
    ["Indiana", "IN"],
    ["Iowa", "IA"],
    ["Kansas", "KS"],
    ["Kentucky", "KY"],
    ["Louisiana", "LA"],
    ["Maine", "ME"],
    ["Maryland", "MD"],
    ["Massachusetts", "MA"],
    ["Michigan", "MI"],
    ["Minnesota", "MN"],
    ["Mississippi", "MS"],
    ["Missouri", "MO"],
    ["Montana", "MT"],
    ["Nebraska", "NE"],
    ["Nevada", "NV"],
    ["New Hampshire", "NH"],
    ["New Jersey", "NJ"],
    ["New Mexico", "NM"],
    ["New York", "NY"],
    ["North Carolina", "NC"],
    ["North Dakota", "ND"],
    ["Ohio", "OH"],
    ["Oklahoma", "OK"],
    ["Oregon", "OR"],
    ["Pennsylvania", "PA"],
    ["Rhode Island", "RI"],
    ["South Carolina", "SC"],
    ["South Dakota", "SD"],
    ["Tennessee", "TN"],
    ["Texas", "TX"],
    ["Utah", "UT"],
    ["Vermont", "VT"],
    ["Virginia", "VA"],
    ["Washington", "WA"],
    ["West Virginia", "WV"],
    ["Wisconsin", "WI"],
    ["Wyoming", "WY"],
  ];

  const tmp = state.toUpperCase();
  for (let i = 0; i < states.length; i++) {
    if (states[i][1] == tmp) {
      return states[i][0];
    }
  }
};

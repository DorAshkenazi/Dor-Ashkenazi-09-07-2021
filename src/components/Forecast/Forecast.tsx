import { useEffect, useState } from "react";

// Components
import { ForecastDayContainer } from "../ForecastDayContainer/ForecastDayContainer";

// React Material-UI
import { makeStyles, Typography } from "@material-ui/core";

// Redux
import { useSelector } from "react-redux";

// Models
import City from "../../models/City";
import { APIKey, rootUrl } from "../../models/AccuWeather";
import ForecastDay from "../../models/ForecastDay";

// Stubs from API
// import fiveDayForecast from "../../accuweatherStubs/fiveDayForecast.json";

const getForecast = async (key: number, isMetric: boolean) => {
  let url = `${rootUrl}forecasts/v1/daily/5day/${key}?apikey=${APIKey}&metric=${isMetric}`;
  const response = await fetch(url);
  const body = await response.json();
  return body;
};

const useStyles = makeStyles({
  rootContainer: {
    marginTop: "80px",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  forecastContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export const Forecast: React.FC = () => {
  const classes = useStyles();
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const selectedCity: City = useSelector((state: any) => state.selectedCity);
  const isMetric: boolean = useSelector((state: any) => state.isMetric);

  useEffect(() => {
    if (selectedCity.key) {
      // const forecastArray: ForecastDay[] = fiveDayForecast.DailyForecasts.map(
      //   (day: any) => {
      //     return {
      //       minTemp: day.Temperature.Minimum.Value,
      //       maxTemp: day.Temperature.Maximum.Value,
      //       dayPhrase: day.Day.IconPhrase,
      //       nightPhrase: day.Night.IconPhrase,
      //       date: day.Date,
      //     };
      //   }
      // );

      // setForecast(forecastArray);

      getForecast(selectedCity.key, isMetric).then((res) => {
        const forecastArray: ForecastDay[] = res.DailyForecasts.map(
          (day: any) => {
            return {
              minTemp: day.Temperature.Minimum.Value,
              maxTemp: day.Temperature.Maximum.Value,
              dayPhrase: day.Day.IconPhrase,
              nightPhrase: day.Night.IconPhrase,
              date: day.Date,
            };
          }
        );

        setForecast(forecastArray);
      });
    }
  }, [isMetric, selectedCity]);

  return (
    <div className={classes.rootContainer}>
      <Typography variant="h4" style={{ paddingBottom: "50px" }}>
        5 Day Forecast:
      </Typography>
      <div className={classes.forecastContainer}>
        {forecast.map((day) => (
          <ForecastDayContainer
            key={day.date}
            forecastDay={day}
          ></ForecastDayContainer>
        ))}
      </div>
    </div>
  );
};

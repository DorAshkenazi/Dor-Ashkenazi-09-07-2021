import { useEffect, useState } from "react";

// Components
import { ForecastDayContainer } from "../ForecastDayContainer/ForecastDayContainer";

// React Material-UI
import { makeStyles, Typography } from "@material-ui/core";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../redux/snackbarSlice";

// Models
import City from "../../models/City";
import ForecastDay from "../../models/ForecastDay";

// Services
import getForecast from "../../services/forecastService";

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
  const dispatch = useDispatch();
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const selectedCity: City = useSelector((state: any) => state.selectedCity);
  const isMetric: boolean = useSelector((state: any) => state.isMetric);

  useEffect(() => {
    if (selectedCity.key) {
      getForecast(selectedCity.key, isMetric)
        .then((res) => {
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
        })
        .catch(() => {
          dispatch(
            openSnackbar({
              message: "Error in call to forecast API on AccuWeather",
              color: "red",
            })
          );
        });
    }
  }, [dispatch, isMetric, selectedCity]);

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

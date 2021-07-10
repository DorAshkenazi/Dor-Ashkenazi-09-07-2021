import { useState, useEffect } from "react";

// React Material-UI
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

// Models
import { rootUrl, APIKey } from "../../models/AccuWeather";
import CityWeather from "../../models/CityWeather";

// Components
import { Forecast } from "../Forecast/Forecast";

// Redux
import { useSelector } from "react-redux";

// Stubs from api
import weatherStub from "../../accuweatherStubs/currentWeather.json";
import { TempTypes } from "../../models/TempTypes";

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
});

const getWeather = async (cityKey: number) => {
  let url = `${rootUrl}currentconditions/v1/${cityKey}?apikey=${APIKey}`;
  const response = await fetch(url);
  const body = await response.json();
  return body;
};

export const CityContainer: React.FC = () => {
  const classes = useStyles();
  const selectedCity = useSelector((state: any) => state.selectedCity);
  const isMetric: boolean = useSelector((state: any) => state.isMetric);
  const [weather, setWeather] = useState<CityWeather>();

  useEffect(() => {
    if (selectedCity?.key) {
      const cityWeather = weatherStub[0];
      setWeather({
        text: cityWeather.WeatherText,
        icon: cityWeather.WeatherIcon,
        temp: {
          metric: cityWeather.Temperature.Metric.Value,
          imperial: cityWeather.Temperature.Imperial.Value,
        },
      });

      // getWeather(selectedCity.key).then((res) => {
      //   const weatherRes = res[0];
      //   setWeather({
      //     text: weatherRes.WeatherText,
      //     icon: weatherRes.WeatherIcon,
      //     temp: {
      //       metric: weatherRes.Temperature.Metric.Value,
      //       imperial: weatherRes.Temperature.Imperial.Value,
      //     },
      //   });
      // });
    }
  }, [selectedCity]);

  return (
    <Card elevation={2}>
      <CardHeader
        title={selectedCity.name}
        subheader={selectedCity.country}
        avatar={<Avatar alt="Weather" src="../../images/sunny.png" />}
        action={
          <IconButton style={{color: "red"}}>
            <FavoriteIcon />
            {/* <FavoriteBorderIcon /> */}
          </IconButton>
        }
      />
      <CardContent className={classes.content}>
        <div>
          <Typography variant="h5">
            {isMetric ? (
              <>{weather?.temp.metric} &#8451;</>
            ) : (
              weather?.temp.imperial + TempTypes.IMPERIAL
            )}
          </Typography>
          <Typography variant="h5">{weather?.text}</Typography>
        </div>
      </CardContent>
      <CardContent>
        <Forecast />
      </CardContent>
    </Card>
  );
};

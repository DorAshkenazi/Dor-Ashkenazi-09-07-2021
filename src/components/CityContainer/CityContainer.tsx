import { useState, useEffect } from "react";

// React Material-UI
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  makeStyles
} from "@material-ui/core";
import CloudQueueIcon from '@material-ui/icons/CloudQueue';

// Models
import CityWeather from "../../models/CityWeather";

// Components
import { Forecast } from "../Forecast/Forecast";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";
import { WeatherDisplay } from "../WeatherDisplay/WeatherDisplay";

// Redux
import { useSelector } from "react-redux";

// Stubs from api
// import weatherStub from "../../accuweatherStubs/currentWeather.json";

// Services
import { getWeather } from "../../services/WeatherService";


const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
});

export const CityContainer: React.FC = () => {
  const classes = useStyles();
  const selectedCity = useSelector((state: any) => state.selectedCity);
  
  const [weather, setWeather] = useState<CityWeather>();

  useEffect(() => {
    if (selectedCity?.key) {
      // const cityWeather = weatherStub[0];
      // setWeather({
      //   text: cityWeather.WeatherText,
      //   icon: cityWeather.WeatherIcon,
      //   temp: {
      //     metric: cityWeather.Temperature.Metric.Value,
      //     imperial: cityWeather.Temperature.Imperial.Value,
      //   },
      // });

      getWeather(selectedCity.key).then((res) => {
        const weatherRes = res[0];
        setWeather({
          text: weatherRes.WeatherText,
          icon: weatherRes.WeatherIcon,
          temp: {
            metric: weatherRes.Temperature.Metric.Value,
            imperial: weatherRes.Temperature.Imperial.Value,
          },
        });
      });
    }
  }, [selectedCity]);

  return (
    <Card elevation={2}>
      <CardHeader
        title={selectedCity.name}
        subheader={selectedCity.country}
        avatar={<Avatar alt="Weather" ><CloudQueueIcon /> </Avatar>}
        action={<FavoriteButton city={selectedCity}/>}
      />
      <CardContent className={classes.content}>
        <WeatherDisplay weather={weather}/>
        
      </CardContent>
      <CardContent>
        <Forecast />
      </CardContent>
    </Card>
  );
};

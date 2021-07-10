import { useEffect, useState } from "react";

// React Material-UI
import {
  Card,
  CardHeader,
  CardContent,
  makeStyles,
  CardActionArea,
} from "@material-ui/core";

// Models
import CityWeather from "../../models/CityWeather";
import City from "../../models/City";

// Components
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";
import { WeatherDisplay } from "../WeatherDisplay/WeatherDisplay";

// Services
import { getWeather } from "../../services/WeatherService";

// Stubs from api
// import weatherStub from "../../accuweatherStubs/currentWeather.json";

// Router
import { useHistory } from "react-router";

// Redux
import { useDispatch } from "react-redux";
import { setSelectedCity } from "../../redux/selectedCitySlice";

interface Props {
  favorite: City;
}

const useStyles = makeStyles({
  favoriteCard: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    textAlign: "center",
    minWidth: "250px",
    margin: "20px",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
  },
});

export const FavoriteCard: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [cityWeather, setCityWeather] = useState<CityWeather>();

  const handleMoveToHome = () => {
    dispatch(setSelectedCity(props.favorite));
    history.push("/");
  };

  useEffect(() => {
    if (props.favorite?.key) {
      // const weather = weatherStub[0];
      // setCityWeather({
      //   text: weather.WeatherText,
      //   icon: weather.WeatherIcon,
      //   temp: {
      //     metric: weather.Temperature.Metric.Value,
      //     imperial: weather.Temperature.Imperial.Value,
      //   },
      // });

      getWeather(props.favorite.key).then((res) => {
        const cityWeather = res[0];
        setCityWeather({
          text: cityWeather.WeatherText,
          icon: cityWeather.WeatherIcon,
          temp: {
            metric: cityWeather.Temperature.Metric.Value,
            imperial: cityWeather.Temperature.Imperial.Value,
          },
        });
      });
    }
  }, [props.favorite.key]);

  return (
    <Card className={classes.favoriteCard}>
      <div className={classes.favoriteButton}>
        <FavoriteButton city={props.favorite} />
      </div>
      <CardActionArea onClick={() => handleMoveToHome()}>
        <CardHeader title={props.favorite.name} />
        <CardContent>
          <WeatherDisplay weather={cityWeather} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

import React, { useEffect, useState } from "react";

// React Material-UI
import {
  Card,
  CardHeader,
  CardContent,
  makeStyles,
  IconButton,
  CardActions,
} from "@material-ui/core";
import ReplyIcon from "@material-ui/icons/Reply";

// Models
import CityWeather from "../../models/CityWeather";
import City from "../../models/City";

// Components
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";
import { WeatherDisplay } from "../WeatherDisplay/WeatherDisplay";

// Services
import { getWeather } from "../../services/WeatherService";

// Router
import { useHistory } from "react-router";

// Redux
import { useDispatch } from "react-redux";
import { setSelectedCity } from "../../redux/selectedCitySlice";
import { openSnackbar } from "../../redux/snackbarSlice";

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
});

export const FavoriteCard: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [cityWeather, setCityWeather] = useState<CityWeather>();

  const handleMoveToHome = () => {
    dispatch(setSelectedCity(props.favorite));
    history.push({
      pathname: "/",
      state: props.favorite.key,
    });
  };

  useEffect(() => {
    if (props.favorite?.key) {
      getWeather(props.favorite.key)
        .then((res) => {
          const cityWeather = res[0];
          setCityWeather({
            text: cityWeather.WeatherText,
            icon: cityWeather.WeatherIcon,
            temp: {
              metric: cityWeather.Temperature.Metric.Value,
              imperial: cityWeather.Temperature.Imperial.Value,
            },
          });
        })
        .catch(() => {
          dispatch(
            openSnackbar({
              message: "Error in call to currentconditions API on AccuWeather",
              color: "red",
            })
          );
        });
    }
  }, [dispatch, props.favorite.key]);

  return (
    <Card className={classes.favoriteCard}>
      {cityWeather ? (
        <CardActions style={{ justifyContent: "space-between" }}>
          <IconButton onClick={() => handleMoveToHome()}>
            <ReplyIcon />
          </IconButton>
          <FavoriteButton city={props.favorite} />
        </CardActions>
      ) : (
        ""
      )}
      <CardHeader title={props.favorite.name} />
      <CardContent>
        <WeatherDisplay weather={cityWeather} />
      </CardContent>
    </Card>
  );
};

// React Material-UI
import { Typography } from "@material-ui/core";

// Redux
import { useSelector } from "react-redux";

// Models
import { TempTypes } from "../../models/TempTypes";
import CityWeather from "../../models/CityWeather";

interface Props {
  weather: CityWeather | undefined;
}

export const WeatherDisplay: React.FC<Props> = (props: Props) => {
  const isMetric: boolean = useSelector((state: any) => state.isMetric);

  if (props.weather) {
    return (
      <>
        <Typography variant="h5">
          {isMetric ? (
            <>{props.weather?.temp.metric} &#8451;</>
          ) : (
            props.weather?.temp.imperial + TempTypes.IMPERIAL
          )}
        </Typography>
        <Typography variant="h5">{props.weather?.text}</Typography>
      </>
    );
  } else {
    return <Typography>No weather data available</Typography>;
  }
};

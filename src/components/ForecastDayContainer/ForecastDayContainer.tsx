// React Material-UI
import {
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  Typography,
} from "@material-ui/core";

// Redux
import { useSelector } from "react-redux";

// Models
import ForecastDay from "../../models/ForecastDay";
import { TempTypes } from "../../models/TempTypes";

const useStyles = makeStyles({
  cardContainer: {
    minWidth: "200px",
    margin: "auto",
    marginBottom: "20px",
  },
});

interface Props {
  forecastDay: ForecastDay;
}

const extractDayName = (dateString: string) => {
  var daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date: Date = new Date(dateString);
  return daysOfTheWeek[date.getDay()];
};

export const ForecastDayContainer: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const dayName = extractDayName(props.forecastDay.date);
  const isMetric: boolean = useSelector((state: any) => state.isMetric);

  return (
    <Card elevation={3} className={classes.cardContainer}>
      <CardHeader title={dayName} />
      <CardContent>
        <Typography>
          Min Temp: {props.forecastDay.minTemp}
          {isMetric ? <>&#8451;</> : TempTypes.IMPERIAL}
        </Typography>
        <Typography>
          Max Temp: {props.forecastDay.maxTemp}
          {isMetric ? <>&#8451;</> : TempTypes.IMPERIAL}
        </Typography>
        <Typography>Day: {props.forecastDay.dayPhrase}</Typography>
        <Typography>Night: {props.forecastDay.nightPhrase}</Typography>
      </CardContent>
    </Card>
  );
};

// React Material-UI
import { makeStyles } from "@material-ui/core/styles";

// Components
import { CityInput } from "../CityInput/CityInput";
import { CityContainer } from "../CityContainer/CityContainer";

const useStyles = makeStyles({
  layout: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  cityInput: {
    margin: "auto",
    marginTop: "20px",
  },
  cityCard: {
    width: "80%",
    marginTop: "20px",
  },
});

export const HomePage: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <div className={classes.cityInput}>
        <CityInput />
      </div>
      <div className={classes.cityCard}>
        <CityContainer />
      </div>
    </div>
  );
};

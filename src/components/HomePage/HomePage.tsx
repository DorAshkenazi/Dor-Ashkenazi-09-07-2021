import React, { useEffect } from "react";

// React Material-UI
import { makeStyles } from "@material-ui/core/styles";

// Components
import { CityInput } from "../CityInput/CityInput";
import { CityContainer } from "../CityContainer/CityContainer";

// Redux
import { useSelector } from "react-redux";

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
  const selectedCity = useSelector((state: any) => state.selectedCity);

  useEffect(() => {
    //console.log(selectedCity);
  }, [selectedCity]);

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

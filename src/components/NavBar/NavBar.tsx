import React, { useState, useEffect } from "react";

// React Material-UI
import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";

// React Router
import { useHistory, useLocation } from "react-router";

// Models
import { Pages } from "../../models/Pages";

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
});

export const NavBar: React.FC = () => {
  const classes = useStyles();
  let location = useLocation();
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState<Pages>(Pages.HOME);

  const handleNavigation = (page: Pages) => {
    if (page === Pages.HOME) {
      history.push("/");
    } else {
      history.push("/favorites");
    }
  };

  useEffect(() => {
    if (location.pathname.includes("favorites")) {
      setCurrentPage(Pages.FAVORITES);
    } else {
      setCurrentPage(Pages.HOME);
    }
  }, [location.pathname]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Herolo Weather Task
        </Typography>
        <Button
          variant={currentPage === Pages.HOME ? "outlined" : undefined}
          color="inherit"
          onClick={() => handleNavigation(Pages.HOME)}
        >
          Home
        </Button>
        <Button
          variant={currentPage === Pages.FAVORITES ? "outlined" : undefined}
          color="inherit"
          onClick={() => handleNavigation(Pages.FAVORITES)}
        >
          Favorites
        </Button>
      </Toolbar>
    </AppBar>
  );
};

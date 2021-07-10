import React, { useState, useEffect } from "react";

// React Material-UI
import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";

// React Router
import { useHistory, useLocation } from "react-router";

// Models
import { Pages } from "../../models/Pages";

// Components
import { NavBarMenuControls } from "../NavBarMenuControls/NavBarMenuControls";

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
});

export const NavBar: React.FC = () => {
  const classes = useStyles();
  let location = useLocation();
  const history = useHistory();
  const matches = useMediaQuery("(min-width:450px)");
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
        <NavBarMenuControls
          isScreenSizeSmall={matches}
          currentPage={currentPage}
          handleNavigation={handleNavigation}
        />
      </Toolbar>
    </AppBar>
  );
};

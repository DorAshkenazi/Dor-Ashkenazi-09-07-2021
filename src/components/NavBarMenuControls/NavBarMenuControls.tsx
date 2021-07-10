import { useState } from "react";

// React Material-UI
import { Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

// Models
import { Pages } from "../../models/Pages";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { toggleMetric } from "../../redux/isMetricSlice";

interface Props {
  isScreenSizeSmall: boolean;
  currentPage: Pages;
  handleNavigation: (page: Pages) => void;
}

export const NavBarMenuControls: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMetric: boolean = useSelector((state: any) => state.isMetric);
  
  const handleChangeTempType = () => {
    dispatch(toggleMetric());
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuNavigate = (page: Pages) => {
    handleMenuClose();
    props.handleNavigation(page);
  };

  if (props.isScreenSizeSmall) {
    return (
      <>
        <Button color="inherit" onClick={() => handleChangeTempType()}>
          {isMetric ? <>&#8451;</> : 'F'}
        </Button>
        <Button
          variant={props.currentPage === Pages.HOME ? "outlined" : undefined}
          color="inherit"
          onClick={() => props.handleNavigation(Pages.HOME)}
        >
          Home
        </Button>
        <Button
          variant={
            props.currentPage === Pages.FAVORITES ? "outlined" : undefined
          }
          color="inherit"
          onClick={() => props.handleNavigation(Pages.FAVORITES)}
        >
          Favorites
        </Button>
      </>
    );
  } else {
    return (
      <>
        <Button color="inherit" onClick={() => handleChangeTempType()}>
          {isMetric ? <>&#8451;</> : 'F'}
        </Button>
        <IconButton onClick={handleMenuOpen}>
          <MenuIcon style={{ color: "white" }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleMenuNavigate(Pages.HOME)}>
            Home
          </MenuItem>
          <MenuItem onClick={() => handleMenuNavigate(Pages.FAVORITES)}>
            Favorites
          </MenuItem>
        </Menu>
      </>
    );
  }
};


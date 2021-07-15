import { useEffect, useState } from "react";

// React Material-UI
import {
  CircularProgress,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";

// Models
import City from "../../models/City";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCity } from "../../redux/selectedCitySlice";
import { openSnackbar } from "../../redux/snackbarSlice";

// Services
import handleGetOptions from "../../services/autocompleteService";
import getLocationByGeoposition from "../../services/locationService";

// Router
import { useHistory, useLocation } from "react-router";

const useStyles = makeStyles({
  autocompleteContainer: {
    width: "300px",
    backgroundColor: "white",
    border: "1px solid black",
  },
  "@global": {
    '.MuiAutocomplete-option[data-focus="true"]': {
      background: "white",
    },
  },
});

export const CityInput: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const selectedCity = useSelector((state: any) => state.selectedCity);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSelectedCityChange = (city: City) => {
    dispatch(setSelectedCity(city));
  };

  const handleInputChange = (inputValue: string) => {
    if (inputValue.length >= 3) {
      setIsLoading(true);

      handleGetOptions(inputValue)
        .then((res) => {
          const newOptions = res.map((e: any) => {
            return {
              name: e.LocalizedName,
              country: e.Country.LocalizedName,
              key: e.Key,
            };
          });
          setOptions(newOptions);
          setIsLoading(false);
        })
        .catch(() => {
          dispatch(
            openSnackbar({
              message: "Error in call to autocomplete API on AccuWeather",
              color: "red",
            })
          );
        });
    }
  };

  useEffect(() => {
    if (!location.state) {
      getLocationByGeoposition()
        .then((res) => {
          dispatch(
            setSelectedCity({
              name: res.LocalizedName,
              country: res.Country.LocalizedName,
              key: res.Key,
            })
          );
        })
        .catch(() => {
          dispatch(
            openSnackbar({
              message: "Error in getting position for initial city",
              color: "red",
            })
          );
        });
    }
  }, [dispatch, location.state]);

  return (
    <Autocomplete
      className={classes.autocompleteContainer}
      open={isOpen}
      onOpen={() => {
        setIsOpen(true);
      }}
      onClose={() => {
        setIsOpen(false);
      }}
      onInputChange={(event: any, inputValue: string) =>
        handleInputChange(inputValue)
      }
      onChange={(event: any, inputValue: City | null) => {
        if (inputValue) {
          handleSelectedCityChange(inputValue);
        }
      }}
      getOptionSelected={(option, value) => {
        return true;
      }}
      getOptionLabel={(option) => option.name}
      options={options}
      value={selectedCity}
      loading={isLoading}
      renderOption={(option) => (
        <>
          <Typography>{option.name}</Typography>
          <Typography
            style={{ paddingLeft: "10px" }}
            variant="caption"
            display="block"
            gutterBottom
          >
            {option.country}
          </Typography>
        </>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

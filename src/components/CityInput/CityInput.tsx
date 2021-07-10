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
import { rootUrl, APIKey } from "../../models/AccuWeather";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCity } from "../../redux/selectedCitySlice";

const useStyles = makeStyles({
  autocompleteContainer: {
    width: "300px",
    backgroundColor: "white",
    border: "1px solid black",
  },
});

export const CityInput: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const selectedCity = useSelector((state: any) => state.selectedCity);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<City[]>([
    // return to empty when prod
    // console.log for quick sweep later
    { name: "Tel Aviv", country: "Israel", key: 215854 },
    { name: "Venice", country: "Italy", key: 216711 },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSelectedCityChange = (city: City) => {
    dispatch(setSelectedCity(city));
  };

  const handleGetOptions = async (cityNameQuery: string) => {
    let url = `${rootUrl}locations/v1/cities/autocomplete?apikey=${APIKey}&q=${cityNameQuery}`;
    const response = await fetch(url);
    const body = await response.json();
    return body;
  };

  const handleInputChange = (inputValue: string) => {
    if (inputValue.length >= 3) {
      setIsLoading(true);

      // Turn on in prod
      // console.log for quick sweep later
      // handleGetOptions(inputValue).then((res) => {
      //   const newOptions = res.map((e: any) => {
      //     return {
      //       name: e.LocalizedName,
      //       country: e.Country.LocalizedName,
      //       key: e.Key,
      //     };
      //   });
      //   setOptions(newOptions);
      //   setIsLoading(false);
      // });
    }
  };

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
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      value={selectedCity}
      loading={isLoading}
      autoComplete={true}
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

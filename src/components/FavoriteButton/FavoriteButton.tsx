// Redux
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/favoritesSlice";
import { openSnackbar } from "../../redux/snackbarSlice";

// React Material-UI
import { IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

// Models
import City from "../../models/City";

interface Props {
  city: City;
}

export const FavoriteButton: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const isFavorite: boolean = useSelector((state: any) => {
    return state.favorites.find(
      (favorite: City) => favorite.key === props.city.key
    );
  });

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(props.city));
    dispatch(
      openSnackbar({
        message: isFavorite ? "Removed from favorites" : "Saved to favorites",
        color: "green",
      })
    );
  };

  return (
    <IconButton style={{ color: "red" }} onClick={() => handleToggleFavorite()}>
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

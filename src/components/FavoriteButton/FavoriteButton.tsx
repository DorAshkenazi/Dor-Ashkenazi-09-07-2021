// Redux
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/favoritesSlice";

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
  };

  return (
    <IconButton style={{ color: "red" }} onClick={() => handleToggleFavorite()}>
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

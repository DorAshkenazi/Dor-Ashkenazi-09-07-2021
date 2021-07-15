// React Material-UI
import { makeStyles, Typography } from "@material-ui/core";

// Redux
import { useSelector } from "react-redux";

// Models
import City from "../../models/City";

// Components
import { FavoriteCard } from "../FavoriteCard/FavoriteCard";

const useStyles = makeStyles({
  favoritesContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

export const FavoritesPage: React.FC = () => {
  const classes = useStyles();
  const favorites: City[] = useSelector((state: any) => state.favorites);

  return (
    <div className={classes.favoritesContainer}>
      {favorites.length > 0 ? (
        favorites.map((favorite) => (
          <FavoriteCard key={favorite.key} favorite={favorite} />
        ))
      ) : (
        <div>
          <Typography
            variant="h3"
            style={{ textAlign: "center", color: "white", marginTop: "20px" }}
          >
            Favorite list empty.
          </Typography>
          <Typography
            variant="h3"
            style={{ textAlign: "center", color: "white", marginTop: "20px" }}
          >
            Add more to manage them here!
          </Typography>
        </div>
      )}
    </div>
  );
};

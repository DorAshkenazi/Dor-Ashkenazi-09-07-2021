import React, { useState, useEffect } from "react";

// React Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

export const HomePage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
  return <div>Hello world!</div>;
}
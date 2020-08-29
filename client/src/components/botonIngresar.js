import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
 
export const BotonIngresar = ({ handleClickIngresar }) => (
    <Button
      variant="contained"
      color="primary"
      className={makeStyles().button}
      onClick={handleClickIngresar}
    >
      Ingresar
    </Button>
  ); 

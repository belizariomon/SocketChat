import React from "react"; 
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";

export const GridUsuarios = ({ listaPersonas }) => { 
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      {listaPersonas.map((item, indx) => (
        <Paper
          className={makeStyles().paper}
          style={{
            textAlign: "center",
            color: "lightgray",
            padding:10,
            margin:10,
            width:"100%"
          }}
          key={indx}
        >
          {" "}
          {item.nombre}
        </Paper>
      ))}
    </Grid>
  );
};

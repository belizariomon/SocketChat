import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Messages from "./Messages";
import { GridUsuarios } from "./components/gridUsuarios";
import { BotonIngresar } from "./components/botonIngresar";

const useStyles = makeStyles((theme) => ({ 
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const socket = io("http://127.0.0.1");

const App = () => {
  const [usuario, setUsuario] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [showModal, setshowModal] = useState(true);
  const [listaPersonas, setlistaPersonas] = useState([]);
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    // Listener de mensajes
    socket.on("crearMensaje", (resp) => {
      renderMensaje(resp);
    });

    // Listener de listado
    socket.on("listaPersona", (resp) => {
      setlistaPersonas(resp);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  const handleClick = () => {
    const data = { nombre: usuario, mensaje: mensaje };

    socket.emit("crearMensaje", data, function (resp) {
      renderMensaje(resp);
    });
  };

  const renderMensaje = (resp) => {
    if (!!resp.nombre && resp.nombre !== "Administrador") {
      const nuevMens = { nombre: resp.nombre, mensaje: resp.mensaje };
      setMensajes((est) => [...est, nuevMens]);
    } else {
      const nuevMens = { nombre: "         ===>", mensaje: resp.mensaje };
      setMensajes((est) => [...est, nuevMens]);
    }
  };

  const handleClickIngresar = () => {
    let data = {
      nombre: usuario,
      sala: "1",
    };

    socket.emit("entrarChat", data, function (resp) {
      setlistaPersonas(resp);
    });

    setshowModal(false);
  };

  return (
    <div>
      <Modal
        open={showModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {
          <div
            style={{
              top: "40vh",
              left: "32vw",
              display: "grid",
              direction: "column",
            }}
            className={useStyles().paper}
          >
            <h2 id="simple-modal-title" style={{ textAlign: "center" }}>
              Ingreso
            </h2>
            <TextField
              id="standard-basic"
              label="Nombre"
              value={usuario}
              style={{ margin: 10 }}
              onChange={(val) => setUsuario(val.target.value)}
            />

            {usuario.length > 3 ?  <BotonIngresar handleClickIngresar={handleClickIngresar}/> : <></>}
          </div>
        }
      </Modal>

      <CssBaseline />

      <div style={{ float: "left", width: "30vw", padding: 20 }}>
        <h3>Participantes</h3>
        <GridUsuarios listaPersonas={listaPersonas} />
      </div>

      <Container maxWidth="sm" style={{ maxHeight: "100vh", overflow: "auto" }}>
        <Typography
          component="div"
          style={{
            backgroundColor: "#cfe8fc",
            minHeight: "100vh",
          }}
        >
          <Messages mensajes={mensajes} usuario={usuario} />
        </Typography>
      </Container>
      <Box
        color="text.primary"
        style={{
          position: "fixed",
          bottom: 0,
          backgroundColor: "#ffa8fc99",
          width: "100vw",
          direction: "row",
          alignItems: "center",
        }}
      >
        <TextField
          id="standard-basic"
          value={mensaje}
          onChange={(val) => setMensaje(val.target.value)}
          label="Enviar"
          style={{ width: "70vw", margin: 10 }}
        />

        <Button
          variant="contained"
          color="primary"
          className={useStyles().button}
          endIcon={<SendIcon />}
          onClick={handleClick}
        >
          Enviar
        </Button>
      </Box>
    </div>
  );
};

export default App;

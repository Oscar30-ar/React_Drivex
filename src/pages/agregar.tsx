import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AgregarCarro: React.FC = () => {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [fecha, setFecha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("marca", marca);
    formData.append("modelo", modelo);
    formData.append("fecha", fecha);

    try {
      const response = await fetch("http://localhost:8000/carros", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          title: "Éxito",
          text: data.message,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
        });

        setMarca("");
        setModelo("");
        setFecha("");
      } else {
        Swal.fire("Error", data.message, "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Error de red o servidor.", "error");
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 6, p: 2 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
        <Typography
          variant="h5"
          color="primary"
          fontWeight="bold"
          textAlign="center"
          mb={3}
        >
          🚗 Registro de Carro - Drivex
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <TextField
                fullWidth
                label="Marca"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Modelo"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                type="number"
                label="Año"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
                inputProps={{ min: 1900, max: new Date().getFullYear() }}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                fullWidth
                sx={{
                  backgroundColor: "#d32f2f",
                  "&:hover": { backgroundColor: "#9a0007" },
                }}
              >
                Registrar Carro
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AgregarCarro;

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import Swal from "sweetalert2";
import { useNavigate, useParams, Link } from "react-router-dom";

const EditarCarro: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8000/carros/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const carro = data.data;
        setMarca(carro.marca);
        setModelo(carro.modelo);
        setFecha(carro.fecha.toString());
      })
      .catch((error) => {
        console.error("Error al cargar carro", error);
        Swal.fire("Error", "No se pudo cargar la información del carro.", "error");
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const year = parseInt(fecha);
    const currentYear = new Date().getFullYear();

    if (isNaN(year) || year < 1900 || year > currentYear) {
      return Swal.fire("Error", `El año debe estar entre 1900 y ${currentYear}.`, "warning");
    }

    const formData = new FormData();
    formData.append("marca", marca);
    formData.append("modelo", modelo);
    formData.append("fecha", fecha);

    try {
      const response = await fetch(`http://localhost:8000/carros/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        Swal.fire("Actualizado", "Carro actualizado exitosamente", "success").then(() =>
          navigate("/")
        );
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error("Error al actualizar", error);
      Swal.fire("Error", "No se pudo actualizar el carro.", "error");
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
          ✏️ Editar Carro - Drivex
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
                  backgroundColor: "#1976d2",
                  "&:hover": { backgroundColor: "#115293" },
                }}
              >
                Actualizar Carro
              </Button>
            </Grid>

            <Grid item>
              <Button
                component={Link}
                to="/"
                variant="outlined"
                fullWidth
                endIcon={<KeyboardReturnIcon />}
              >
                Regresar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default EditarCarro;

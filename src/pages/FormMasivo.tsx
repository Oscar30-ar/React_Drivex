import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useNavigate } from "react-router-dom";

const FormularioMasivo = () => {
  const [formData, setFormData] = useState({
    documento: "",
    nombre: "",
    apellido: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Enviando datos...", formData);

    try {
      const response = await fetch("http://localhost:8000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          title: "Usuario Agregado",
          icon: "success",
          draggable: true,
        }).then(() => {
          navigate("/");
        });
      } else {
        Swal.fire({
          title: "Error al agregar usuario",
          text: "Por favor, verifica los datos ingresados.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }
      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();
      console.log("Respuesta del servidor:", data);
    } catch (error) {
      console.error("Error al enviar datos: ", error);
    }
  };

  return (
    <Box
      sx={{
        boxShadow: 3,
        p: 2,
        borderRadius: 2,
        textAlign: "center",
        width: "100%",
        maxWidth: 400,
        margin: "auto",
        mt: 4,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Typography variant="h4" component="h1" align="center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-file-earmark-spreadsheet"
            viewBox="0 0 16 16"

          >
            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5zM3 12v-2h2v2zm0 1h2v2H4a1 1 0 0 1-1-1zm3 2v-2h3v2zm4 0v-2h3v1a1 1 0 0 1-1 1zm3-3h-3v-2h3zm-7 0v-2h3v2z" />
          </svg> - 
          Archivo excel

        </Typography>

        <TextField
          id="excel"
          name="excel"
          type="file"
          required
          value={formData.apellido}
          onChange={handleChange}
        />

        <Button variant="contained" type="submit" endIcon={<SendIcon />}>
          Enviar
        </Button>

        <Button
          component={Link}
          to="/"
          variant="contained"
          endIcon={<KeyboardReturnIcon />}
        >
          Regresar
        </Button>
      </form>
    </Box>
  );
};

export default FormularioMasivo;

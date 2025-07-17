import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import EmailIcon from "@mui/icons-material/MailOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useNavigate } from "react-router-dom";

const Formulario = () => {
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
          Formulario
        </Typography>

        <TextField
          id="form_documento"
          label="Documento"
          name="documento"
          type="number"
          required
          value={formData.documento}
          onChange={handleChange}
        />
        <TextField
          id="form_nombre"
          label="Nombre"
          name="nombre"
          type="text"
          required
          value={formData.nombre}
          onChange={handleChange}
        />
        <TextField
          id="form_apellido"
          label="Apellido"
          name="apellido"
          type="text"
          required
          value={formData.apellido}
          onChange={handleChange}
        />
        <TextField
          id="form_email"
          label="Email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
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

export default Formulario;

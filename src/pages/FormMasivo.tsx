import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import Swal from "sweetalert2";

const FormularioMasivo = () => {
  const onsubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const archivoExcel = document.getElementById(
      "excel"
    ) as HTMLInputElement | null;

    const file =
      archivoExcel && archivoExcel.files ? archivoExcel.files[0] : null;
    const formData = new FormData();
    if (file) {
      formData.append("excel", file);
    }

    fetch("http://localhost:8000/carros", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Subida masiva exitosa",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.href = "/";
          });
        } else {
          throw new Error("Error en la respuesta del servidor");
        }
      })

      .catch((error) => {
        console.error("Error: ", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: String(error),
        });
      });
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
        onSubmit={onsubmit}
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
          </svg>{" "}
          - Archivo excel
        </Typography>

        <TextField id="excel" name="excel" type="file" required />

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

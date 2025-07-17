import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 2,
        p: 3,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, color: "#f44336" }} />
      <Typography variant="h3" color="error">
        Error 404
      </Typography>
      <Typography variant="h6" color="text.secondary">
        La página que estás buscando no existe.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ mt: 2 }}
      >
        Volver al inicio
      </Button>
    </Box>
  );
};

export default Error404;

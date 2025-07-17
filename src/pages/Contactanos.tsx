import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Contactanos = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
              Contáctanos
            </Typography>

            <Typography variant="body1" color="text.secondary" align="center" mb={3}>
              Puedes comunicarte con nosotros a través de los siguientes medios:
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={4} textAlign="center">
                <ContactPhoneIcon sx={{ fontSize: 40, color: "#1976d2" }} />
                <Typography variant="h6">Teléfono</Typography>
                <Typography variant="body2">+57 300 123 4567</Typography>
              </Grid>

              <Grid item xs={12} md={4} textAlign="center">
                <EmailIcon sx={{ fontSize: 40, color: "#1976d2" }} />
                <Typography variant="h6">Correo</Typography>
                <Typography variant="body2">contacto@drivex.com</Typography>
              </Grid>

              <Grid item xs={12} md={4} textAlign="center">
                <LocationOnIcon sx={{ fontSize: 40, color: "#1976d2" }} />
                <Typography variant="h6">Dirección</Typography>
                <Typography variant="body2">Calle 123 #45-67, Bogotá</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contactanos;

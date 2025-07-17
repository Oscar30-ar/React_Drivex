import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";

import { Link } from "react-router-dom";
import { useState } from "react";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const navItems = [
  {
    text: "Inicio",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    text: "Quiénes Somos",
    path: "/quienesSomos",
    icon: <InfoIcon />,
  },
  {
    text: "Contáctanos",
    path: "/contactanos",
    icon: <ContactMailIcon />,
  },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        backgroundColor: "#1e1e1e",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          py: 2,
        }}
      >
        <DirectionsCarIcon sx={{ color: "#fff" }} />
        <Typography variant="h6" sx={{ color: "#fff" }}>
          Drivex
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <Link
              to={item.path}
              style={{
                textDecoration: "none",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                padding: "1rem",
                width: "100%",
                gap: "10px",
                transition: "background 0.3s",
              }}
            >
              {item.icon}
              <ListItemText primary={item.text} />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#1e1e1e" }}>
        <Toolbar>
          <IconButton
            onClick={handleDrawerToggle}
            color="inherit"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexGrow: 1,
            }}
          >
            <DirectionsCarIcon sx={{ color: "#fff" }} />
            <Typography variant="h6" component="div">
              Drivex
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: "500",
                  "&:hover": {
                    backgroundColor: "#333",
                    transition: "0.3s",
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer para móviles */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
            backgroundColor: "#1e1e1e",
            color: "#fff",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Espacio para evitar que el contenido quede detrás del AppBar */}
      <Toolbar />
    </Box>
  );
};

export default Navbar;

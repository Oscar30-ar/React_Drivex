import { Box, Divider, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import GroupsIcon from "@mui/icons-material/Groups";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

const QuienesSomos = () => {
    return (
        <Box sx={{ p: 4 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
                <Box sx={{ textAlign: "center", mb: 4 }}>
                    <Typography
                        variant="h4"
                        color="primary"
                        fontWeight="bold"
                        gutterBottom
                    >
                        ¿Quiénes Somos?
                    </Typography>
                    <Typography
                        variant="body1"
                        color="textSecondary"
                        maxWidth="md"
                        margin="auto"
                    >
                        En <strong>Drivex</strong>{" "}
                        nos apasionan los autos y la tecnología. Somos una
                        empresa dedicada a ofrecer soluciones innovadoras para
                        la gestión y venta de vehículos, con enfoque en la
                        eficiencia, seguridad y satisfacción del cliente.
                    </Typography>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: "center" }}>
                            <GroupsIcon
                                sx={{ fontSize: 50, color: "#1976d2", mb: 1 }}
                            />
                            <Typography variant="h6" fontWeight="bold">
                                Nuestro Equipo
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Profesionales apasionados por los autos, el
                                diseño y la ingeniería. Nuestra experiencia es
                                tu mejor garantía.
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: "center" }}>
                            <VisibilityIcon
                                sx={{ fontSize: 50, color: "#1976d2", mb: 1 }}
                            />
                            <Typography variant="h6" fontWeight="bold">
                                Nuestra Visión
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Ser la plataforma líder en soluciones
                                tecnológicas para el sector automotor en toda
                                Latinoamérica.
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: "center" }}>
                            <EmojiObjectsIcon
                                sx={{ fontSize: 50, color: "#1976d2", mb: 1 }}
                            />
                            <Typography variant="h6" fontWeight="bold">
                                Innovación Constante
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Usamos tecnologías de vanguardia para mejorar la
                                experiencia de nuestros clientes y adaptarnos al
                                futuro.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default QuienesSomos;
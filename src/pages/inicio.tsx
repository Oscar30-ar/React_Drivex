import "../index.css";
import * as React from "react";
import { Typography, Button, Box, Paper } from "@mui/material";
import DinamicTable from "../components/DinamicTable";
import type { GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface Users {
  idGenerico: number | null;
  id: number | null;
  marca: string;
  modelo: string;
  fecha: string;
}

const Inicio = () => {
  const navigate = useNavigate();
  const [dataUser, setDataUser] = React.useState<Users[]>([]);

  React.useEffect(() => {
    fetch("http://localhost:8000/carros")
      .then((response) => response.json())
      .then((data) =>
        setDataUser(
          data.data.map((row: { id: unknown }) => ({
            ...row,
            idGenerico: row.id,
          }))
        )
      )
      .catch((error) => console.error("Error al obtener datos", error));
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 100 },
    { field: "marca", headerName: "Marca", width: 200 },
    { field: "modelo", headerName: "Modelo", width: 200 },
    { field: "fecha", headerName: "Fecha", width: 180 },
  ];

  const handleEdit = (id: number) => navigate(`/editar/${id}`);

  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el carro permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:8000/carros/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          Swal.fire("Eliminado", "El carro ha sido eliminado.", "success");
          setDataUser((prev) => prev.filter((user) => user.id !== id));
        } else {
          Swal.fire("Error", "No se pudo eliminar el carro.", "error");
        }
      } catch (error) {
        console.error("Error al eliminar:", error);
        Swal.fire("Error", "Error de red o servidor.", "error");
      }
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h4" color="primary" fontWeight="bold">
            🚗 Vehículos Registrados - Drivex
          </Typography>
          <Box>

          <Button
            component={Link}
            to="/agregar"
            variant="contained"
            endIcon={<AddIcon />}
            sx={{ backgroundColor: "#d32f2f", "&:hover": { backgroundColor: "#9a0007" } }}
          >
            Agregar Carro
          </Button>
          <Button
            component={Link}
            to="/agregar"
            variant="contained"
            endIcon={<AddIcon />}
            sx={{ backgroundColor: "#3f2fd3ff", "&:hover": { backgroundColor: "#000a9aff" } }}
          >
            Subida Masiva
          </Button>
          </Box>
        </Box>

        <DinamicTable
          rows={dataUser}
          columns={columns}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </Paper>
    </Box>
  );
};

export default Inicio;

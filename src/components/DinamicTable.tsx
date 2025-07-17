/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { IconButton, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { esES } from '@mui/x-data-grid/locales';


interface DinamicTableProps{
    rows: any[];
    columns:  GridColDef[];
    onDelete: (idGenerico:number) => void;
    onEdit: (row: any) => void;
}



const DinamicTable:React.FC<DinamicTableProps> = ({rows, columns, onDelete, onEdit,})=>{

    const [tableRows, setTableRows] = React.useState<any[]>([]);

    React.useEffect(()=>{
        setTableRows(rows);
    },[rows])

    const columnasBotones = [
        ...columns,{
            field:"actions",
            headerName:"Acciones",
            width:100,
            renderCell: (params:any)=>(
                <>
                    <IconButton color='primary' onClick={()=>onEdit(params.row.id)}>
                        <EditIcon/>
                    </IconButton>

                    <IconButton color='primary' onClick={()=>onDelete(params.row.id)}>
                        <DeleteIcon/>
                    </IconButton>
                </>
            )
        }
    ]

    const paginationModel = {page:0,pageSize:8};


    return(
        <Paper sx={{height:600, width:'100%'}} role="region" aria-label='tabla dinamica'>
            <DataGrid
            rows={tableRows}
            columns={columnasBotones}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            initialState={{pagination:{paginationModel}}}
            pageSizeOptions={[5,8,10,50,100]}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{border:0}}
            />

        </Paper>
    )
}

export default DinamicTable
import React, { useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { allJobLoadAction, jobLoadAction } from "../../redux/actions/jobAction";

const DashAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allJobLoadAction());
  }, []);

  const { jobs, loading } = useSelector((state) => state.loadJobs);
  let data = [];
  data = jobs !== undefined && jobs.length > 0 ? jobs : [];

  const columns = [
    {
      field: "title",
      headerName: "JOB NAME",
      width: 340,
    },
    {
      field: "user",
      headerName: "USER",
      width: 300,
      valueGetter: (data) => data.row.user.firstName,
    },

    {
      field: "salary",
      headerName: "SALARY",
      type: Number,
      width: 300,
      renderCell: (values) => "$" + values.row.salary,
    },
  ];

  return (
    <>
      <Box display="flex" justifyContent="center" mt={3}>
        <Box width="70%">
          <Typography
            variant="h4"
            sx={{
              color: "black",
              pb: 3,
              display: "flex",
              mt: -3,
            }}
          >
            Jobs list
          </Typography>
          <Box sx={{ pb: 1, display: "flex", justifyContent: "right" }}></Box>
          <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>
            <Box sx={{ height: 500, width: "100%" }}>
              <DataGrid
                getRowId={(row) => row._id}
                sx={{
                  "& .MuiTablePagination-displayedRows": {
                    color: "black",
                  },
                  color: "black",
                  [`& .${gridClasses.row}`]: {},
                  button: {
                    color: "black",
                  },
                }}
                rows={data}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                slots={{ toolbar: GridToolbar }}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                density="comfortable"
              />
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default DashAllJobs;

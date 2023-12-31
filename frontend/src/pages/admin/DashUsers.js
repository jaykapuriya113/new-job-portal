import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Paper,
  Typography,
  CircularProgress,
  Chip,
  Dialog,
} from "@mui/material";
import { GridToolbar, gridClasses } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  updateJobStatusAction,
  userApplyLoadJobAction,
} from "../../redux/actions/jobAction";

const DashUsers = () => {
  const dispatch = useDispatch();
  const [jobDetail, setJobDetail] = useState([]);
  const success = useSelector((state) => state.applyByUser);
  const admin = useSelector((state) => state.signIn);
  const [data, setData] = useState([]);
  const [processingAcceptRowId, setProcessingAcceptRowId] = useState(null);
  const [processingRejectRowId, setProcessingRejectRowId] = useState(null);
  const [openResumeDialog, setOpenResumeDialog] = useState(false);
  const [resumeImageURL, setResumeImageURL] = useState("");
  const FetchData = (admin) => {
    dispatch(userApplyLoadJobAction(admin.userInfo.role._id));
  };
  useEffect(() => {
    if (success.success?.availableJobs) {
      setJobDetail(success.success);
    }
  }, [success]);
  const acceptUserById = (rowData) => {
    setProcessingAcceptRowId(rowData._id);
    console.log(rowData._id);
    if (rowData) {
      const updatedData = {
        ...rowData,
        user: rowData._id,
        applicationStatus: "accepted",
      };
      dispatch(updateJobStatusAction(updatedData))
        .then(() => {
          FetchData(admin);
        })
        .finally(() => {
          setProcessingAcceptRowId(null);
        });
    }
  };
  const rejectUserById = (rowData) => {
    setProcessingRejectRowId(rowData._id);
    console.log(rowData._id);
    if (rowData) {
      const updatedData = {
        ...rowData,
        user: rowData._id,
        applicationStatus: "rejected",
      };
      dispatch(updateJobStatusAction(updatedData))
        .then(() => {
          FetchData(admin);
        })
        .finally(() => {
          setProcessingRejectRowId(null);
        });
    }
  };

  useEffect(() => {
    let tempData = [];
    if (jobDetail !== false) {
      const outdata = jobDetail?.availableJobs;
      if (outdata) {
        for (let i = 0; i < outdata.length; i++) {
          const element = outdata[i].userAppliedForJob;
          for (let j = 0; j < element.length; j++) {
            let temp = element[j];
            delete temp.user._id;
            temp = { ...temp, ...temp.user };
            tempData.push(temp);
          }
        }
      }
    }
    setData(tempData);
  }, [jobDetail]);
  const handleViewResume = (rowData) => {
    setResumeImageURL(rowData.resume);
    setOpenResumeDialog(true);
  };
  const columns = [
    {
      field: "firstName",
      headerName: "NAME",
      width: 100,
    },
    {
      field: "title",
      headerName: "TITLE",
      width: 200,
    },
    {
      field: "salary",
      headerName: "SALARY",
      width: 100,
      editable: true,
    },
    {
      field: "email",
      headerName: "EMAIL",
      width: 150,
    },
    {
      field: "phoneNumber",
      headerName: "PHONE NUMBER",
      width: 150,
    },
    {
      field: "assessment",
      headerName: "ASSESSMENT",
      width: 150,
      renderCell: (params) => (
        <button
          variant="contained"
          size="medium"
          onClick={() => window.open(params.row.assessment, "_blank")}
          style={{
            height: "35px",
            borderRadius: "5px",
            border: "1px solid #2196f3",
          }}
        >
          <div style={{ color: "#2196f3" }}>View assessment</div>
        </button>
      ),
    },
    {
      field: "resume",
      headerName: "RESUME",
      width: 150,
      renderCell: (params) => (
        <button
          variant="contained"
          onClick={() => handleViewResume(params.row)}
          style={{
            cursor: "pointer",
            height: "35px",
            borderRadius: "5px",
            border: "1px solid #2196f3",
          }}
        >
          <div style={{ color: "#2196f3" }}> View Resume</div>
        </button>
      ),
    },
    {
      field: "applicationStatus",
      headerName: "STATUS",
      width: 150,
      renderCell: (params) => {
        const statusColor =
          params.row.applicationStatus === "accepted"
            ? "#4CAF50"
            : params.row.applicationStatus === "rejected"
            ? "#f44336"
            : "#2196f3";

        return (
          <Chip
            label={params.row.applicationStatus}
            size="small"
            style={{
              backgroundColor: statusColor,
              color: "#ffffff",
              minWidth: "70px",
            }}
          />
        );
      },
    },
    {
      field: "ACTIONS",
      width: 200,
      renderCell: (values) => {
        const isAccepted = values.row.applicationStatus === "accepted";
        const isRejected = values.row.applicationStatus === "rejected";

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "170px",
              gap: 2,
            }}
          >
            <Button
              onClick={() => acceptUserById(values.row)}
              variant="contained"
              sx={{
                bgcolor: "#cadacb",
                "&:hover": {
                  bgcolor: "#92ba91",
                },
              }}
              disabled={
                processingAcceptRowId === values.row._id ||
                isAccepted ||
                isRejected
              }
            >
              {processingAcceptRowId === values.row._id ? (
                <CircularProgress size={24} />
              ) : (
                <div style={{ color: "green" }}>Accept</div>
              )}
            </Button>
            <Button
              onClick={() => rejectUserById(values.row)}
              variant="contained"
              sx={{
                bgcolor: "#e7c5c5",
                "&:hover": {
                  bgcolor: "#dd8181",
                },
              }}
              disabled={
                processingRejectRowId === values.row._id ||
                isAccepted ||
                isRejected
              }
            >
              {processingRejectRowId === values.row._id ? (
                <CircularProgress size={24} />
              ) : (
                <div style={{ color: "red" }}>Reject</div>
              )}
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box display="flex" justifyContent="center" mt={3}>
      <Box width="100%">
        <Typography
          variant="h4"
          sx={{
            color: "black",
            pb: 3,
            display: "flex",
            justifyContent: "left",
            mt: -2,
          }}
        >
          All users
        </Typography>
        <Box sx={{ pb: 0, display: "flex", justifyContent: "center" }}></Box>
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
              job={jobDetail}
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
            <Dialog
              open={openResumeDialog}
              onClose={() => setOpenResumeDialog(false)}
            >
              <img
                src={resumeImageURL}
                alt="Resume"
                style={{ width: "100%" }}
              />
            </Dialog>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default DashUsers;

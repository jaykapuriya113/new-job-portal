import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, CircularProgress } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {
  ref as addRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useTheme } from "@emotion/react";
import storage from "../../../utils/firebase";
import { editUserAction } from "../../../redux/actions/userAction";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  resume: "",
  profilePhoto: "",
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditAdminData = (props) => {
  const { user } = useSelector((state) => state.userprofile);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [formdata, setFormdata] = useState(INITIAL_STATE);
  const [profilePreview, setProfilePreview] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const { palette } = useTheme();

  useEffect(() => {
    let fn = user && user.firstName;
    let ln = user && user.lastName;
    let re = user && user.resume;
    let pr = user && user.profilePhoto;

    setFormdata({
      firstName: fn,
      lastName: ln,
      resume: re,
      profilePhoto: pr,
    });
  }, [user]);

  const handleClose = () => {
    setOpen(false);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(editUserAction(user && user._id, formdata));
    window.location.reload();
    setOpen(!open);
  };

  const uploadProfilePhoto = (event) => {
    let file = event.target.files[0];

    if (!file) {
      alert("Please upload an image first!");
      return;
    }

    setProfileLoading(true);

    const storageRef = addRef(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setFormdata((prevData) => ({
            ...prevData,
            profilePhoto: url,
          }));
          setProfilePreview(url);
          setProfileLoading(false);
        });
      }
    );
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        sx={{
          color: "white",
          bgcolor: "#2196f3",
          "&:hover": {
            bgcolor: "#1976d2",
          },
        }}
      >
        EDIT
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "500px",
            maxWidth: "80%",
          },
        }}
      >
        <DialogTitle style={{ fontSize: "25px", textAlign: "center" }}>
          {"Update Me!!"}
        </DialogTitle>
        <DialogContent>
          <form action="" onSubmit={onSubmitHandler}>
            {user && (
              <div>
                <DialogContentText id="alert-dialog-slide-description">
                  <br />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Avatar
                      src={profilePreview || formdata.profilePhoto}
                      sx={{ width: 130, height: 130, mt: -2, mb: -2 }}
                    />
                  </Box>

                  <br />
                  <TextField
                    sx={{
                      mb: 0,
                      "& .MuiInputBase-root": {
                        color: "text.secondary",
                      },
                      fieldset: { borderColor: "rgb(231, 235, 240)" },
                    }}
                    fullWidth
                    id="profilePhoto"
                    name="profilePhoto"
                    label="Profile Photo"
                    type="file"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="photo"
                    onChange={uploadProfilePhoto}
                  />
                  {profileLoading && <CircularProgress />}
                  <br />
                  <br />
                  <TextField
                    sx={{ mb: 3, mt: 2 }}
                    fullWidth
                    id="firstName"
                    label="First Name"
                    type="text"
                    name="firstName"
                    value={formdata.firstName}
                    onChange={changeHandler}
                    required
                  />
                  <br />
                  <br />
                  <TextField
                    sx={{ mb: 3 }}
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    type="text"
                    value={formdata.lastName}
                    onChange={changeHandler}
                    required
                  />
                  <br />
                  <br />
                </DialogContentText>
                <DialogActions>
                  <Button variant="outlined" type="submit">
                    Edit
                  </Button>
                  <Button variant="outlined" onClick={handleClose}>
                    Cancel
                  </Button>
                </DialogActions>
              </div>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditAdminData;

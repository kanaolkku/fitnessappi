import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "./Select";

export default function Addtrainings(props) {
  const [trainings, setTrainings] = useState([
    {
      firstname: "",
      lastname: "",
    },
  ]);
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = React.useState(false);

  const fetchCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((responseData) => setCustomers(responseData.content))
      .catch((err) => console.err(err));
  };

  useEffect(() => fetchCustomers(), []);

  const saveTrainings = (trainings) => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trainings),
    })
      .then((res) => props.fetchTrainings())
      .catch((err) => console.error(err));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setTrainings({ ...trainings, [event.target.name]: event.target.value });
  };

  const addTrainings = () => {
    const trainingsObject = {
      activity: trainings.activity,
      duration: trainings.duration,
      date: new Date(trainings.date),
      customer: `https://customerrest.herokuapp.com/${trainings.links[0].href}`,
    };
    console.log(trainingsObject);
    saveTrainings(trainingsObject);
    handleClose();
  };

  return (
    <div class="addButton">
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add trainings
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add trainings</DialogTitle>
        <DialogContent>
          <Select customers={customers} setTrainings={setTrainings} />
          <TextField
            autoFocus
            margin="dense"
            name="customer.firstname"
            value={trainings.firstname}
            onChange={(e) => handleInputChange(e)}
            fullWidth
            disabled={true}
          />
          <TextField
            autoFocus
            margin="dense"
            name="customer.lastname"
            value={trainings.lastname}
            onChange={(e) => handleInputChange(e)}
            fullWidth
            disabled={true}
          />
          <TextField
            margin="dense"
            name="duration"
            value={trainings.duration}
            onChange={(e) => handleInputChange(e)}
            label="Duration"
            fullWidth
          />
          <TextField
            margin="dense"
            name="activity"
            value={trainings.activity}
            onChange={(e) => handleInputChange(e)}
            label="Activity"
            fullWidth
          />
          <TextField
            id="datetime-local"
            margin="dense"
            label=""
            name="date"
            type="datetime-local"
            value={trainings.date}
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={addTrainings} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

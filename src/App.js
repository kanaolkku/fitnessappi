import React from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TabApp from "./components/TabApp";

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" id="navbar">
            FitnessApp
          </Typography>
        </Toolbar>
      </AppBar>
      <TabApp />
    </div>
  );
}

export default App;

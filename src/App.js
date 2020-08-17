import React from 'react';
import './App.css';
import Customerlist from './components/CustomerList';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Trainingslist from './components/Trainingspage';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

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
      <BrowserRouter>
        <div id="napit">
          <Button variant="outlined" size="large" component={Link} to="/" color="default">Customers</Button>
          <span className="erottaja" />
          <Button variant="outlined" size="large" component={Link} to="/components/Trainingspage" color="default">Trainings</Button>
          <span className="tyontaja" />
          <Switch>
            <Route path="/components/Trainingspage" component={Trainingslist}></Route>
            <Route path="/" component={Customerlist}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div >

  );
}

export default App;

import React, { useState } from 'react';

import { Tab, Tabs, AppBar } from '@material-ui/core';

import Trainingslist from './Trainingspage';
import Customerlist from './CustomerList';

export default function TabApp() {



  const [value, setValue] = useState('one');

  const handleChange = (event, value) => {
    setValue(value);
  };


  return (
    <div>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab value="one" label="Customers" />
          <Tab value="two" label="Trainings" />
        </Tabs>
      </AppBar>
      {value === 'one' && <div><Customerlist /></div>}
      {value === 'two' && <div><Trainingslist /></div>}
    </div>
  );
};
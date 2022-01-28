import React from "react";
const Select = ({ customers, setTrainings }) => {
  const findPerson = (name) => {
    const names = name.split(" ");
    const customer = customers.find(
      (person) => person.firstname === names[0] && person.lastname === names[1]
    );
    if (customer !== undefined) {
      setTrainings(customer);
    }
  };
  return (
    <div>
      <label>Customer: </label>
      <input
        list="customers"
        name="customer"
        id="customer"
        placeholder="select customer"
        onSelect={(e) => {
          findPerson(e.target.value);
        }}
      />
      <datalist id="customers">
        {customers.map((customer) => {
          return (
            <option>{`${customer.firstname} ${customer.lastname}`}</option>
          );
        })}
      </datalist>
    </div>
  );
};

export default Select;

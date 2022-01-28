import React, { useState, useEffect, } from 'react';
import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Addcustomer from './AddCustomer';
import Editcustomer from './EditCustomer'

export default function Customerlist() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => fetchCustomers(), []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(responseData => setCustomers(responseData.content))
            .catch(err => console.err(err));
    }
    console.log(customers);

    const deleteCustomer = (link) => {
        if (window.confirm("Are you sure?")) {
            fetch(link, { method: 'DELETE' })
                .then(res => fetchCustomers())
                .catch(err => console.error(err));
        };


    }
    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(res => fetchCustomers())
            .catch(err => console.error(err))

    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(res => fetchCustomers())
            .catch(err => console.error(err));
    }
    const columns = [
        {
            Header: 'Firstname',
            accessor: 'firstname'
        },
        {
            Header: 'Lastname',
            accessor: 'lastname'
        },
        {
            Header: 'Street address',
            accessor: 'streetaddress'
        },
        {
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        },
        {
            filterable: false,
            sortable: false,
            width: 150,
            Cell: row => <Editcustomer updateCustomer={updateCustomer} customer={row.original} />
        },
        {
            accessor: 'links[0].href',
            Cell: row =>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteCustomer(row.value)}>
                    Delete
                </Button>,
            filterable: false,
            sortable: false,
            width: 150
        }
    ];
    return (
        <div>
            <div>
                <Addcustomer saveCustomer={saveCustomer} />
                <ReactTable filterable={true} data={customers} columns={columns} />
            </div>
        </div>
    )
};
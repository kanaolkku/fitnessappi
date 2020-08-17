import React, { useState, useEffect, } from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import moment from 'moment'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Addtrainings from './AddTrainings'

export default function Trainingslist() {
    const [trainings, setTrainings] = useState([]);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(responseData => setTrainings(responseData))
            .catch(err => console.err(err));
    };
    const deleteTrainings = (value) => {
        if (window.confirm("Are you sure?")) {
            fetch(`https://customerrest.herokuapp.com/api/trainings/${value}`, { method: 'DELETE' })
                .then(res => fetchTrainings())
                .catch(err => console.error(err));
        };
    };

    useEffect(() => fetchTrainings(), []);
    console.log(trainings);

    const saveTrainings = (trainings) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trainings)
        })
            .then(res => fetchTrainings())
            .catch(err => console.error(err))

    }

    const columns = [
        {
            Header: 'Firstname',
            accessor: 'customer.firstname'
        },
        {
            Header: 'Lastname',
            accessor: 'customer.lastname'
        },
        {
            Header: 'Date',
            accessor: 'date',
            Cell: (d) => {
                const formatDate = moment(d).format('LLL');
                return <span>{formatDate}</span>;
            }
        },
        {
            Header: 'Duration',
            accessor: 'duration'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            accessor: 'id',
            Cell: row =>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteTrainings(row.value)}
                >
                    Delete
          </Button>,
            filterable: false,
            sortable: false,
            width: 150
        }
    ];

    return (
        <div>
            <Addtrainings saveTrainings={saveTrainings} />
            <ReactTable filterable={true} data={trainings} columns={columns} />
        </div>
    )
}


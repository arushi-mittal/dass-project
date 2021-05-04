import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ReportIcon from '@material-ui/icons/Report';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


const useStylesRecord = makeStyles((theme) => ({
    button: {
        // marginTop: "25px",
        marginBottom: "20px",
        marginLeft: "20px"
    }
}));


const SelectedRecord = (props) => {
    const classes = useStylesRecord();
    const { record } = props
    // console.log(record)
    // console.log(props)

    const handleView = () => {
        console.log(record)
    }
    const handleReport = () => {
        console.log(record)
    }
    const handleSaveForLater = () => {
        console.log(record)
    }
    const handleDelete = () => {
        console.log(record)
    }

    return (
        <div>
            <h3>Selected Record <b>{record.id}</b> - Take actions</h3>
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                startIcon={<LaunchIcon />}
                onClick={handleView}
            >
                View
            </Button>
            <Button
                className={classes.button}
                variant="contained"
                // color="primary"
                style={{ backgroundColor: 'green', color: 'white' }}
                startIcon={<CheckCircleOutlineIcon />}
                onClick={handleReport}
            >
                Report
            </Button>
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                startIcon={<BookmarkIcon />}
                onClick={handleSaveForLater}
            >
                Save for Later
            </Button>
            <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
            >
                Delete
            </Button>
        </div>
    )
}


const ViolationsDashboard = () => {


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'vehicleType', headerName: 'Vehicle Type', width: 130 },
        { field: 'plateNumber', headerName: 'Plate Number', width: 130 },
        { field: 'location', headerName: 'Location', width: 200 },
        { field: 'time', headerName: 'Time', width: 100 },
        { field: 'date', headerName: 'Date', width: 100 },
        // { field: 'image', headerName: 'Age', type: 'number', width: 90, },
    ];

    const rows = [
        { id: 1, vehicleType: 'SUV', location: 'Gachibowli, Hyderabad', time: '10:00 AM', date: '18/03/21' },
        { id: 2, vehicleType: 'Sedan', location: 'Gachibowli, Hyderabad', time: '11:00 AM', date: '15/03/21' },
        { id: 3, vehicleType: 'Sedan', location: 'Gachibowli, Hyderabad', time: '12:00 AM', date: '16/03/21' },
        { id: 4, vehicleType: 'Sedan', location: 'Gachibowli, Hyderabad', time: '10:15 AM', date: '17/03/21' },
        { id: 5, vehicleType: 'Sedan', location: 'Gachibowli, Hyderabad', time: '10:00 PM', date: '02/03/21' },
        { id: 6, vehicleType: 'Hatchback', location: 'Gachibowli, Hyderabad', time: '7:00 PM', date: '01/03/21' },
        { id: 7, vehicleType: 'Hatchback', location: 'Gachibowli, Hyderabad', time: '6:00 PM', date: '02/03/21' },
        { id: 8, vehicleType: 'Hatchback', location: 'Gachibowli, Hyderabad', time: '9:00 PM', date: '03/03/21' },
        { id: 9, vehicleType: 'Hatchback', location: 'Gachibowli, Hyderabad', time: '10:00 AM', date: '04/03/21' },
        { id: 10, vehicleType: 'SUV', location: 'Gachibowli, Hyderabad', time: '11:20 AM', date: '18/03/21' },
        { id: 11, vehicleType: 'SUV', location: 'Gachibowli, Hyderabad', time: '12:20 AM', date: '18/03/21' },
        { id: 12, vehicleType: 'SUV', location: 'Gachibowli, Hyderabad', time: '10:00 AM', date: '18/03/21' },
        { id: 13, vehicleType: 'Truck', location: 'Gachibowli, Hyderabad', time: '10:00 AM', date: '18/03/21' },
        { id: 14, vehicleType: 'Bus', location: 'Gachibowli, Hyderabad', time: '10:00 AM', date: '18/03/21' },
        { id: 15, vehicleType: 'Bus', location: 'Gachibowli, Hyderabad', time: '10:00 AM', date: '18/03/21' },
    ];

    return (
        <div>
            <h1>All Violations</h1>
            <div style={{ height: 650, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    pagination
                    rowsPerPageOptions={[10, 20, 50]}
                // checkboxSelection
                />

            </div>
        </div>
    );
}

export default ViolationsDashboard;
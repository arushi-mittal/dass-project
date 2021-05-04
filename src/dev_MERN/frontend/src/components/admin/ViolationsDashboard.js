import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

const useStylesRecord = makeStyles((theme) => ({
    button: {
        // marginTop: "25px",
        marginBottom: "20px",
        marginLeft: "20px",
        display: 'inline'
    }
}));

const SelectedRecord = (props) => {
    const classes = useStylesRecord();
    const { record } = props
    const [action, setAction] = useState("")

    const handleView = () => {
        console.log("view", record)
        setAction("view")
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
        </div >
    )
}


const ViolationsDashboard = () => {

    const [selectedRecord, setSelectedRecord] = useState({});
    const [allRecords, setAllRecords] = useState([]);
    const [formattedRecords, setFormattedRecords] = useState([]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'vehicle_type', headerName: 'Vehicle Type', width: 170 },
        { field: 'plate_no', headerName: 'Plate Number', width: 170 },
        { field: 'location', headerName: 'Location', width: 350 },
        { field: 'time', headerName: 'Time', width: 130 },
        { field: 'date', headerName: 'Date', width: 130 },
    ];

    const formatRows = (allrecords) => {
        console.log("format rows")
        var rows = allrecords.map((record, ind) => {
            return {
                id: ind + 1,
                _id: record._id,
                vehicle_type: record.vehicle_type,
                plate_no: record.plate_no,
                location: record.location,
                date: String(record.date).slice(0, 10),
                time: String(record.date).slice(11, 19),
            }
        })
        setFormattedRecords(rows)
    }

    const onSelect = (e) => {
        console.log("on selecting a row", e.data)
        setSelectedRecord(e.data)
    }

    useEffect(() => {
        // axios request to fetch all the violations
        const config = {
            headers: {
                'x-auth-token': `${localStorage.getItem("token")}`
            }
        }
        axios.get('api/records/violations', config)
            .then((res) => {
                console.log("records data", res.data)
                setAllRecords(res.data)
                formatRows(res.data)
            }).catch(error => {
                if (error) {
                    console.log("records error", error);
                }
            });
    }, [])

    return (
        <div>
            <h1>All Violations</h1>

            {
                selectedRecord.id > 0
                &&
                <SelectedRecord
                    record={selectedRecord}
                />
            }

            <div style={{ height: 650, width: '100%', backgroundColor: 'white'}}>
                <DataGrid
                    rows={formattedRecords}
                    columns={columns}
                    pageSize={10}
                    pagination
                    rowsPerPageOptions={[10, 20, 50]}
                    onRowSelected={onSelect}
                />
            </div>
        </div>
    );
}

export default ViolationsDashboard;
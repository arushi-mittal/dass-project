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
    },
    alertDialog: {
        display: 'inline'
    }
}));

const AlertDialog = (props) => {
    const classes = useStylesRecord();
    const { actionType, confirmed, setConfirmed, open, setOpen } = props;
    var msgTitle = "";
    var msgContent = "";

    // available actions = [ "report", "bookmark", "delete" ] 
    if (actionType === 'report') {
        msgTitle = "Mark As Violation?"
        msgContent = "The selected record will be marked as a Violation, which will be reported further.\n"
            + "Note: This cannot be undone."
    } else if (actionType === 'delete') {
        msgTitle = "Delete this record?"
        msgContent = "This will delete the record from the database and will not appear on this dashboard.\n"
            + "Note: This action cannot by undone."
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        handleClose()
        setConfirmed(false)
    };

    const handleConfirm = () => {
        handleClose()
        setConfirmed(true)
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className={classes.alertDialog}
            >
                <DialogTitle id="alert-dialog-title">{msgTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {msgContent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}
                        variant="contained"
                        color="secondary" >
                        Cancel
                      </Button>
                    <Button
                        onClick={handleConfirm}
                        variant="contained"
                        color="primary" autoFocus>
                        Proceed
                       </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}


const SelectedRecord = (props) => {

    const classes = useStylesRecord();
    const { record, isSuccess, setIsSuccess } = props
    const [action, setAction] = useState("")
    const [open, setOpen] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const handleView = () => {
        console.log(record)
    }

    const handleClick = (actionType) => {
        console.log("actionType", actionType)
        setAction(actionType)
        setOpen(true)
        console.log("confirmation", actionType, confirmed)
    }

    const handleConfirmAction = () => {
        console.log("inside confirm - action, confirmed", action, confirmed)
        // axio request to take care of the required action

        const config = {
            headers: {
                'x-auth-token': `${localStorage.getItem("token")}`
            }
        }
        const id = record._id;
        console.log("hi", id)
        var api_path = '';
        if (action === 'report') {
            api_path = 'api/records/markViolation'

        } else if (action === 'delete') {
            api_path = 'api/records/delete'
        }

        axios.put(api_path, { id }, config)
            .then((response) => {
                console.log("DATA after modification", response.data.updatedRecord)
                setIsSuccess(true)
            }).catch(error => {
                if (error) {
                    console.log(error.response);
                    setIsSuccess(false)
                }
            });

        setConfirmed(false)
    }


    useEffect(() => {
        console.log("action, confirmation", action, confirmed);
        if (confirmed === true) {
            handleConfirmAction()
        }
        setIsSuccess(false)
    }, [confirmed, open])

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
                style={{ backgroundColor: 'green', color: 'white' }}
                startIcon={<CheckCircleOutlineIcon />}
                onClick={() => handleClick('report')}
            >
                Report
            </Button>
            {
                action === 'report' && open &&
                <AlertDialog
                    actionType='report'
                    confirmed={confirmed}
                    setConfirmed={setConfirmed}
                    open={open}
                    setOpen={setOpen}
                />
            }
            <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => handleClick('delete')}
            >
                Delete
            </Button>
            {
                action === 'delete' && open &&
                <AlertDialog
                    actionType='delete'
                    confirmed={confirmed}
                    setConfirmed={setConfirmed}
                    open={open}
                    setOpen={setOpen}
                />
            }
        </div >
    )
}

const BookmarkedDashboard = () => {

    const [selectedRecord, setSelectedRecord] = useState({});
    const [allRecords, setAllRecords] = useState([]);
    const [formattedRecords, setFormattedRecords] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);

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
        // axios request to fetch all the records
        const config = {
            headers: {
                'x-auth-token': `${localStorage.getItem("token")}`
            }
        }
        axios.get('api/records/bookmarked', config)
            .then((res) => {
                console.log("records data", res.data)
                setAllRecords(res.data)
                formatRows(res.data)
            }).catch(error => {
                if (error) {
                    console.log("records error", error);
                }
            });
    }, [isSuccess])

    return (
        <div>
            <h1>Bookmarked Records</h1>

            {
                selectedRecord.id > 0
                &&
                <SelectedRecord
                    record={selectedRecord}
                    isSuccess={isSuccess}
                    setIsSuccess={setIsSuccess}

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

export default BookmarkedDashboard;
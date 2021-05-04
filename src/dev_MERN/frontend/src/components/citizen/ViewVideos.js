import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button as MButton } from '@material-ui/core/'
import { Button } from 'reactstrap'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Alert from '@material-ui/lab/Alert';
import TableRow from '@material-ui/core/TableRow';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

const useStylesRecord = makeStyles((theme) => ({
    alertDialog: {
        display: 'inline'
    }
}));

const AlertDialog = (props) => {

    const classes = useStylesRecord();
    const [open, setOpen] = useState(false)
    const { video, confirmed, setConfirmed, selVideo, setSelVideo } = props;
    var msgTitle = "Confirm delete";
    var msgContent = "This video will be deleted. This cannot be undone.";

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        handleClose()
        setConfirmed(false)
    };

    const handleConfirm = () => {
        handleClose()
        setSelVideo(video)
        setConfirmed(true)
    };

    return (
        <div>
            <MButton
                onClick={handleClickOpen}
                variant="contained"
                color="secondary"
            >
                Delete
            </MButton>
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
                    <MButton onClick={handleCancel}
                        variant="contained"
                        color="secondary" >
                        Cancel
                      </MButton>
                    <MButton
                        onClick={handleConfirm}
                        variant="contained"
                        color="primary" autoFocus>
                        Proceed
                       </MButton>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default function ViewVideos() {
    const [videos, setVideos] = useState(null)
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [playSource, setPlaySource] = useState(null)
    const [isSuccess, setIsSuccess] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'videoName', headerName: 'VideoName', width: 400 },
        { field:'description', headerName: 'Description' },
        { field: 'playButton', headerName: ' ', width: 200 },
        { field: 'deleteButton', headerName: ' ', width: 200 },
    ];

    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': `${localStorage.getItem("token")}`
            }
        }
        const email = localStorage.getItem('email')
        const body = JSON.stringify({ email })
        axios.post('/api/uploadVideo/getVideos', body, config)
            .then(response => {
                console.log(response.data.response)
                setVideos(response.data.response)
            })
            .catch(err => {
                console.log({ err })
            })
    }, [])

    useEffect(() => {
        console.log("confirmation", confirmed);
        if (confirmed === true && selectedVideo) {
            deleteVideo(selectedVideo)
        }
        // setIsSuccess(false)
    }, [confirmed])

    const playVideo = (videoPath) => {
        // console.log(event.target.value)
        console.log(videoPath)
        setPlaySource(videoPath)
    }

    const disableVideo = () => {
        setPlaySource(null)
    }

    const deleteVideo = (video) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': `${localStorage.getItem("token")}`
            }
        }

        axios.post('/api/uploadVideo/deleteVideo', video, config)
            .then(response => {
                console.log(response.data)
                const newvideos = videos.filter((item) => item !== video)
                setVideos(newvideos)
                setPlaySource(null)
                setIsSuccess(true)
                setTimeout(() => setIsSuccess(false), 3000);
            })
        setConfirmed(false)

    }

    return (
        <div>
            <h1>Uploaded Videos</h1>
            {
                playSource != null
                    ?
                    <div>
                        <video style={{ width: '90%' }} src={`http://localhost:5000/${playSource}`} controls></video>
                        <Button onClick={disableVideo} close />
                    </div>
                    :
                    null
            }
            {
                isSuccess &&
                <Alert severity="success" style={{ textAlign: "center", fontSize: "20px" }}>
                    Successfully Deleted.
                </Alert>
            }
            {
                videos != null
                    ?
                    <div style={{ height: 650, width: '100%'}}>
                        <Table>
                            <TableHead>
                                {columns.map((colName, ind) => {
                                    return <TableCell>{colName.headerName}</TableCell>
                                })}
                            </TableHead>
                            <TableBody>
                                {
                                    videos.map((video, videoIndex) => {
                                        return <TableRow>
                                            <TableCell>
                                                {videoIndex + 1}
                                            </TableCell>
                                            <TableCell>
                                                {video.fileName}
                                            </TableCell>
                                            <TableCell>
                                                {video.description}
                                            </TableCell>
                                            <TableCell>
                                                <MButton
                                                    onClick={() => playVideo(video.filePath)}
                                                    variant="contained"
                                                    color="primary" >
                                                    Play
                                                </MButton>
                                                {/* <Button outline className="rounded mb-0" onClick={() => playVideo(video.filePath)}>Play</Button> */}
                                            </TableCell>
                                            <TableCell>
                                                <AlertDialog
                                                    video={video}
                                                    confirmed={confirmed}
                                                    setConfirmed={setConfirmed}
                                                    selVideo={selectedVideo}
                                                    setSelVideo={setSelectedVideo}
                                                />
                                                {/* <Button onClick={() => deleteVideo(video)} outline className="rounded mb-0" color='danger'>Delete</Button> */}
                                            </TableCell>
                                        </TableRow>
                                    })
                                }
                            </TableBody>
                        </Table>
                    </div>
                    : null
            }
        </div>
    )
}

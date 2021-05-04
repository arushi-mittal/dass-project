import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Card, CardHeader, Button, ButtonGroup } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import { List, ListItem, ListItemSecondaryAction, IconButton, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
// import profileImg from '../../assets/images/profileImg.png';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: 50,
        marginRight: 50
    },
    heading: {
        textAlign: "center",
        fontSize: 45,
    },
    // profile_img: {
    //     width: "200px",
    //     height: "200px",
    //     marginLeft: "80px",
    //     marginTop: "30px"
    // },
    textField: {
        marginTop: 30,
        marginLeft: 20,
        width: "100%"
    }
}));


const AdminProfile = () => {
    // console.log("AdminProfile");
    const classes = useStyles();
    // const userType = localStorage.getItem("Type");
    const [formData, setFormData] = useState({
        name: "demo1",
        username: "demo1_username",
        email: "demo1@mail.com",
        bio: "random bio info",
        address: "IIITH Gachibowli Hyderabad",
        contactNum: "911111111",
    });
    const [edit, setEdit] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSuccess, setIsSuccess] = useState(false);


    //     // console.log("errors", errors);

    //     // useEffect(() => {
    //     //     axios({
    //     //         method: "GET",
    //     //         url: `/recruiter/profile`,
    //     //         headers: {
    //     //             'x-auth-token': `${localStorage.getItem("Token")}`
    //     //         }
    //     //     }).then((response) => {
    //     //         console.log("recruiter profile", response.data);
    //     //         setFormData(response.data);
    //     //     }).catch(error => {
    //     //         if (error) {
    //     //             console.log("recruiter profile error", error.response.data);
    //     //             setIsError(true);
    //     //             setErrors(error.response.data);
    //     //         }
    //     //     });
    //     // }, [edit])

    const handleChange = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        const newFormData = Object.assign({}, formData);
        newFormData[e.target.id] = e.target.value;
        setFormData(newFormData);
    }

    const handleEdit = () => {
        const tempEdit = !edit;
        setEdit(tempEdit);
    }

    const handleSave = (e) => {
        e.preventDefault();
        let newFormData = Object.assign({}, formData);
        newFormData['contactNum'] = '+' + newFormData['contactNum']
        console.log("while saving", newFormData);
        //         // axios({
        //         //     method: "PUT",
        //         //     url: `/recruiter/profile/edit`,
        //         //     data: JSON.stringify(newFormData),
        //         //     headers: {
        //         //         'Content-Type': 'application/json',
        //         //         'x-auth-token': `${localStorage.getItem("Token")}`
        //         //     }
        //         // }).then((response) => {
        //         //     console.log("DATA after save", response.data)
        //         //     localStorage.removeItem("Name");
        //         //     localStorage.setItem("Name", response.data.name);
        //         //     setFormData(response.data);
        //         //     setIsError(false);
        //         //     setErrors({});
        //         //     setIsSuccess(true);
        //         //     setTimeout(() => setIsSuccess(false), 3000);
        //         // }).catch(error => {
        //         //     if (error) {
        //         //         console.log(error.response);
        //         //         setIsError(true);
        //         //         setErrors(error.response.data)
        //         //     }
        //         // });
    }

    //     // if (userType !== 'recruiter') {
    //     //     alert(`Forbidden.`);
    //     //     window.location.replace("http://localhost:3000/")
    //     // }

    return (
        <div>
            <Typography className={classes.heading}> Admin Profile </Typography>
            <Card className={classes.root} variant="outlined">
                <Grid container spacing={5}>
                    <Grid item xs={5}>
                        <br /> <br />
                        <TextField
                            id="name"
                            label="Name"
                            placeholder="Name"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            className={classes.textField}
                            onChange={handleChange}
                            value={formData['name']}
                            disabled={!edit}
                            error={isError && errors.name}
                            helperText={errors.name}
                        />
                        <TextField
                            id="username"
                            label="UserName"
                            placeholder="userName"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            className={classes.textField}
                            onChange={handleChange}
                            value={formData['username']}
                            disabled={!edit}
                            error={isError && errors.name}
                            helperText={errors.name}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            placeholder="bob@gmail.com"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            className={classes.textField}
                            onChange={handleChange}
                            value={formData['email']}
                            disabled={!edit}
                            error={isError && errors.email}
                            helperText={errors.email}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            id="address"
                            label="Address"
                            placeholder="home address"
                            fullWidth
                            multiline
                            rows={5}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            className={classes.textField}
                            onChange={handleChange}
                            value={formData['bio']}
                            disabled={!edit}
                            error={isError && errors.bio}
                            helperText={errors.bio}
                        />
                        <TextField
                            id="contactNum"
                            label="contactNum"
                            placeholder="+91...."
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            className={classes.textField}
                            onChange={handleChange}
                            value={formData['contactNum']}
                            disabled={!edit}
                            error={isError && errors.contactNum}
                            helperText={errors.contactNum}
                        />
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            style={{
                                marginTop: "25px",
                                // marginBottom: "20px",
                                marginLeft: "20px"
                            }}
                            startIcon={!edit ? <EditIcon /> : <ClearIcon />}
                            onClick={handleEdit}
                        >
                            {!edit ? "Edit" : "Reset"}
                        </Button>
                        <Button
                            variant="contained"
                            disabled={!edit}
                            color="primary"
                            size="large"
                            style={{
                                marginTop: "25px",
                                // marginBottom: "20px",
                                marginLeft: "20px"
                            }}
                            startIcon={<SaveIcon />}
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
                {
                    isSuccess &&
                    <Alert severity="success" style={{ textAlign: "center", fontSize: "20px" }}>
                        Successfully Updated
                            </Alert>
                }
            </Card>
        </div>
    )
}

export default AdminProfile;

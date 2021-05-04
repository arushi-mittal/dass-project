import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Card, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import Alert from '@material-ui/lab/Alert';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 15,
        marginLeft: 50,
        marginRight: 50
    },
    heading: {
        marginTop: 5,
        textAlign: "center",
        fontSize: 45,
    },
    // profile_img: {
    //     width: "200px",
    //     height: "200px",
    //     marginLeft: "80px",
    //     marginTop: "30px"
    // },
    button: {
        marginTop: "15px",
        marginBottom: "20px",
        marginLeft: "20px"
    },
    textField: {
        marginTop: 30,
        marginLeft: 20,
        width: "100%"
    }
}));


const CitizenProfile = () => {
    const classes = useStyles();
    const userType = localStorage.getItem("role");
    const [formData, setFormData] = useState({});
    const [edit, setEdit] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSuccess, setIsSuccess] = useState(false);


    useEffect(() => {
        const config = {
            headers: {
                'x-auth-token': `${localStorage.getItem("token")}`
            }
        }
        axios.get('api/user', config)
            .then((res) => {
                console.log("citizen data", res.data)
                if (res.data.mobile_no && res.data.mobile_no.length === 13) {
                    setFormData({
                        ...res.data,
                        "mobile_no": res.data.mobile_no.slice(3)
                    })
                } else {
                    setFormData(res.data)
                }
            }).catch(error => {
                if (error) {
                    console.log("citizen profile error", error);
                    setIsError(true);
                    setErrors(error.response.data);
                }
            });
    }, [edit])

    const handleChange = (e) => {
        e.preventDefault();
        // console.log(e.target.value);
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
        if (formData["mobile_no"] && formData["mobile_no"].length === 10) {
            newFormData['mobile_no'] = '+91' + formData['mobile_no']
        }
        console.log("while saving", newFormData);

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': `${localStorage.getItem("token")}`
            }
        }

        axios.put('api/user/profile', newFormData, config)
            .then((response) => {
                console.log("DATA after save", response.data.updatedProfile)

                if (response.data.updatedProfile.mobile_no && response.data.updatedProfile.mobile_no.length === 13) {
                    setFormData({
                        ...response.data.updatedProfile,
                        "mobile_no": response.data.updatedProfile.mobile_no.slice(3)
                    })
                } else {
                    setFormData(response.data.updatedProfile)
                }

                setIsError(false);
                setErrors({});
                setIsSuccess(true);
                setTimeout(() => setIsSuccess(false), 3000);
            }).catch(error => {
                if (error) {
                    console.log(error.response);
                    setIsError(true);
                    setErrors(error.response.data)
                }
            });
    }

    if (userType !== 'citizen') {
        console.log("user", userType)
        alert(`Forbidden.`);
        window.location.replace("http://localhost:3000/")
    }

    return (
        <div>
            <Typography className={classes.heading}> Citizen Profile </Typography>
            <Card className={classes.root} style={{backgroundColor: 'transparent'}} variant="outlined">
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
                            disabled={true}
                            error={isError && errors.username}
                            helperText={errors.username}
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
                            disabled={true}
                            error={isError && errors.email}
                            helperText={errors.email}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            id="address"
                            label="Address"
                            placeholder="Home address"
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
                            value={formData['address']}
                            disabled={!edit}
                            error={isError && errors.address}
                            helperText={errors.address}
                        />
                        <TextField
                            id="mobile_no"
                            label="mobile_no"
                            placeholder="+91XXXXXXXXXX"
                            fullWidth
                            margin="normal"
                            inputProps={{ maxLength: 10 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            className={classes.textField}
                            onChange={handleChange}
                            value={formData['mobile_no']}
                            disabled={!edit}
                            error={isError && errors.mobile_no}
                            helperText={errors.mobile_no}
                        />
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            className={classes.button}
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
                            className={classes.button}
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

export default CitizenProfile;

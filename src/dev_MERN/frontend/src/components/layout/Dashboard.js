import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
        marginTop: '5%',
    },
    image: {
        position: 'relative',
        height: 300,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
}));



const AdminLinks = () => {

    const classes = useStyles();
    const Actions = [
        {
            url: 'img/profile.jpg',
            title: 'Profile',
            width: '23%',
            path: 'admin/profile'
        },
        {
            url: 'img/records.jpg',
            title: 'Records',
            width: '23%',
            path: 'admin/records'
        },
        {
            url: 'img/bookmark.jpg',
            title: 'Bookmarked',
            width: '23%',
            path: 'admin/bookmarked'
        },
        {
            url: 'img/violations.jpg',
            title: 'Violations',
            width: '23%',
            path: 'admin/violations'
        },
    ];

    return (
        <div className={classes.root}>

            {Actions.map((action) => (
                <ButtonBase
                    focusRipple
                    key={action.title}
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    style={{
                        width: action.width,
                        marginInline: '1%'
                    }}
                    component={Link}
                    to={action.path}
                >
                    <span
                        className={classes.imageSrc}
                        style={{
                            backgroundImage: `url(${action.url})`,
                        }}
                    />
                    <span className={classes.imageBackdrop} />
                    <span className={classes.imageButton}>
                        <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}
                        >
                            {action.title}
                            <span className={classes.imageMarked} />
                        </Typography>
                    </span>
                </ButtonBase>
            ))}

        </div>
    )
}


const CitizenLinks = () => {

    const classes = useStyles();
    const Actions = [
        {
            url: 'img/profile.jpg',
            title: 'Profile',
            width: '25%',
            path: 'citizen/profile'
        },
        {
            url: 'img/upload_video.jpg',
            title: 'Upload Video',
            width: '25%',
            path: 'citizen/uploadVideo'
        },
        {
            url: 'img/view_video1.jpg',
            title: 'View Uploaded Videos',
            width: '25%',
            path: 'citizen/viewVideos'
        },
    ];

    return (
        <div className={classes.root}>

            {Actions.map((action) => (
                <ButtonBase
                    focusRipple
                    key={action.title}
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    style={{
                        width: action.width,
                        marginInline: '4%',
                    }}
                    component={Link}
                    to={action.path}
                >
                    <span
                        className={classes.imageSrc}
                        style={{
                            backgroundImage: `url(${action.url})`,
                        }}
                    />
                    <span className={classes.imageBackdrop} />
                    <span className={classes.imageButton}>
                        <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}
                        >
                            {action.title}
                            <span className={classes.imageMarked} />
                        </Typography>
                    </span>
                </ButtonBase>
            ))}
        </div>
    )
}

const Dashboard = () => {
    const userType = localStorage.getItem("role");
    return (
        userType == 'admin' ?
            <AdminLinks /> : <CitizenLinks />
    )
}

export default Dashboard
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import _ from 'lodash';
import axios from 'axios';
import FuzzySearch from "fuzzy-search";
import { createMuiTheme, withStyles, ThemeProvider, lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Slider from '@material-ui/core/Slider';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import FilterListIcon from '@material-ui/icons/FilterList';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
    { id: 'recruiter', numeric: false, disablePadding: false, label: 'Recruiter' },
    { id: 'salary', numeric: true, disablePadding: false, label: 'Salary' },
    { id: 'duration', numeric: true, disablePadding: false, label: 'Duration' },
    { id: 'deadline', numeric: false, disablePadding: false, label: 'Deadline' },
    { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
    { id: 'rating', numeric: true, disablePadding: false, label: 'Rating' },
    { id: 'action', numeric: false, disablePadding: false, label: 'Action' },
];

const TableTitles = (props) => {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                {
                    headCells.map((header) => (
                        <TableCell
                            key={header.id}
                            align='center'
                            padding='default'
                            sortDirection={orderBy === header.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === header.id}
                                direction={orderBy === header.id ? order : 'asc'}
                                onClick={createSortHandler(header.id)}
                            >
                                <Typography variant='h6' component='h6'>
                                    {header.label}
                                </Typography>

                                {orderBy === header.id ? (
                                    <span className={classes.visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    );
}


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    textField: {
        marginLeft: 20,
        marginTop: 10,
        width: '90%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    highlight:
    {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary.light,
    },
    title: {
        flex: '1 1 100%',
    },
    button: {
        marginLeft: 20
    }
}));


const JobList = () => {
    const classes = useStyles();
    const userType = localStorage.getItem("Type");
    if (userType !== 'applicant') {
        alert(`Forbidden.`);
        window.location.replace("http://localhost:3000/")
    }
    const [sop, setSop] = useState("");
    const [jobApplyingTo, setJobApplyingTo] = useState('');

    const [isApplying, setIsApplying] = useState(false);
    const [jobs, setJobs] = useState([])
    const [filteredJobs, setFilteredJobs] = useState([])
    const [savedFilteredJobs, setSavedFilteredJobs] = useState([])

    const [searchVal, setSearchVal] = useState("")
    const [isApplyFilter, setIsApplyFilter] = useState(false)
    const [jobTypeFilter, setJobTypeFilter] = useState("")
    const [durationFilter, setDurationFilter] = useState("")
    const [salaryFilter, setSalaryFilter] = useState([0, 0])

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');

    const [isError, setIsError] = useState(false);
    const [errors, setErrors] = useState({});

    const salaryMarks = [
        { value: 0, label: '0 K' },
        { value: 100, label: '100 K' },
        { value: 200, label: '200 K' },
        { value: 300, label: '300 K' },
    ]

    const onChangeSalaryFilter = (event, newValue) => {
        setSalaryFilter(newValue)
    }
    const onChangeJobTypeFilter = (event) => {
        setJobTypeFilter(event.target.value)
    }
    const onChangeDurationFilter = (event) => {
        setDurationFilter(event.target.value)
    }
    const onRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Filter
    const applyFilter = (tempJobs) => {
        let newJobs = [];
        let sFmin = salaryFilter[0]
        let sFmax = salaryFilter[1]
        tempJobs.forEach((job, id) => {
            let toPush = true;
            if (parseInt(job.salary) < (sFmin * 1000))
                toPush = false;
            else if (!(sFmax === 0) && parseInt(job.salary) > (sFmax * 1000))
                toPush = false;
            else if (!Validator.isEmpty(jobTypeFilter) && job.typeOfJob !== jobTypeFilter)
                toPush = false;
            else if (!Validator.isEmpty(durationFilter.toString()) && parseInt(job.duration) >= parseInt(durationFilter))
                toPush = false;

            if (toPush) {
                let toCopyJob = _.cloneDeep(job)
                newJobs.push(toCopyJob);
            }
        })
        // console.log("newJobs filtered", newJobs)
        setFilteredJobs(_.cloneDeep(newJobs));
        setIsError(false);
        setErrors({});
    }

    const onClearFilter = () => {
        console.log("clear filter clicked");
        setDurationFilter("")
        setJobTypeFilter("")
        setSearchVal("")
        setSalaryFilter([0, 0])
        setIsApplyFilter(false)
        setFilteredJobs(_.cloneDeep(jobs))
    }

    const onClickFilter = () => {
        console.log("clicked filter")
        setIsApplyFilter(true)
        applyFilter(jobs)
    };
    const onChangeSearchVal = (e) => {
        setSearchVal(e.target.value)
    };
    const clearSearchTitle = () => {
        console.log("clicked clicked", savedFilteredJobs)
        setSearchVal("")
        // if (savedFilteredJobs.length)
        //     setFilteredJobs(_.cloneDeep(savedFilteredJobs));
        // else
        setFilteredJobs(_.cloneDeep(jobs))
    };
    const onSearchTitle = () => {
        console.log("searchVal", searchVal)
        setSavedFilteredJobs(_.cloneDeep(filteredJobs))

        if (searchVal && !Validator.isEmpty(searchVal)) {
            const searcher = new FuzzySearch(jobs, ['title'], {
                caseSensitive: false,
                sort: true
            });
            let searchedJobs = searcher.search(searchVal)
            setFilteredJobs(_.cloneDeep(searchedJobs))
        }
    }
    const onApplyButton = (e) => {
        console.log("job id to apply", e.target, e.target.parentNode)
        if (e.target.id) {
            setJobApplyingTo(e.target.id)
        } else if (e.target.parentNode.id) {
            setJobApplyingTo(e.target.parentNode.id)
        }
        setIsApplying(true)
    }
    const getData = () => {
        axios({
            method: "GET",
            url: '/applicant/jobs/all',
            headers: {
                'x-auth-token': `${localStorage.getItem("Token")}`
            }
        }).then((response) => {
            console.log("inside getData", response.data)
            if (isApplyFilter)
                applyFilter([...response.data]);
            else {
                setFilteredJobs([...response.data]);
                setJobs([...response.data]);
            }
        }).catch(error => {
            if (error) {
                console.log("hi newjob error", error.response);
                setIsError(true);
                setErrors(error.response.data);
            }
        });
    }
    // console.log("jobs", jobs)
    // console.log("FilteredJobs", filteredJobs)

    String.prototype.countWords = function () {
        return this.split(/\s+\b/).length;
    }

    const onChangeSop = (e) => {
        setSop(e.target.value)
    }
    const onSubmitSOP = () => {
        console.log("submiting sop")
        const data = {
            sop: sop
        }
        console.log(sop.countWords())
        if (Validator.isEmpty(sop) || sop.countWords() > 250) {
            alert("Please enter SOP between 1 and 250 words")
            return
        }
        axios({
            method: "POST",
            url: `/applicant/jobs/${jobApplyingTo}/apply`,
            data: data,
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': `${localStorage.getItem("Token")}`
            }
        }).then((response) => {
            alert("success")
            setSop("");
            setIsApplying(false)
            setJobApplyingTo('')
            window.location.reload()
        }).catch(error => {
            if (error) {
                console.log(error.response.data);
                setIsError(true);
                alert("Error", error.response.data)
                setErrors(error.response.data.errors);
            }
        });
    }


    useEffect(getData, [])

    return (
        <div className={classes.root}>

            <Paper className={classes.paper}>
                <Toolbar className={classes.highlight}>
                    <Typography className={classes.title} variant="h4" id="tableTitle" component="div">
                        All Jobs
            </Typography>
                    <Tooltip title="Clear filter">
                        <IconButton aria-label="clear filter" onClick={onClearFilter}>
                            <ClearIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Apply filter">
                        <IconButton aria-label="apply filter" onClick={onClickFilter}>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            className={classes.textField}
                            id="search"
                            autoComplete='search'
                            label="Search by Title"
                            fullWidth={false}
                            value={searchVal}
                            onChange={onChangeSearchVal}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton onClick={clearSearchTitle}>
                                            <ClearIcon />
                                        </IconButton>
                                        <IconButton onClick={onSearchTitle}>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography
                            align='center'
                            id="salary-slider"
                            variant='h6'
                            className={classes.textField}
                            gutterBottom
                        >
                            Salary Range
                            <Typography
                                align='center'
                            // gutterBottom
                            >(Monthly, in thousands)</Typography>
                            <Slider
                                min={0}
                                max={300}
                                step={5}
                                style={{ width: "80%" }}
                                value={salaryFilter}
                                onChange={onChangeSalaryFilter}
                                valueLabelDisplay="on"
                                aria-labelledby="range-slider"
                                marks={salaryMarks}
                            />
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            id="typeOfJob"
                            className={classes.textField}
                            label="Job Type"
                            value={jobTypeFilter}
                            onChange={onChangeJobTypeFilter}
                        >
                            <MenuItem value={"part-time"}>Part Time</MenuItem>
                            <MenuItem value={"full-time"}>Full Time</MenuItem>
                            <MenuItem value={"work from home"}>Work from Home</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            id="durationFilter"
                            className={classes.textField}
                            label="Duration"
                            value={durationFilter}
                            onChange={onChangeDurationFilter}
                        >
                            <MenuItem value="" disabled><em>Months</em></MenuItem>
                            <MenuItem value={1}>Till 1</MenuItem>
                            <MenuItem value={2}>Till 2</MenuItem>
                            <MenuItem value={3}>Till 3</MenuItem>
                            <MenuItem value={4}>Till 4</MenuItem>
                            <MenuItem value={5}>Till 5</MenuItem>
                            <MenuItem value={6}>Till 6</MenuItem>
                            <MenuItem value={7}>Till 7</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
                {
                    isApplying &&
                    <>
                        <div>

                            {/* <form onSubmit={onSubmitSOP}> */}
                            <Typography variant='h6'
                                className={classes.button}
                            >
                                Apply to job
                            </Typography>
                            <TextField
                                id="sop"
                                label="Statement Of Purpose"
                                placeholder="Something about you. Max 250 words..."
                                fullWidth
                                multiline
                                rows={10}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                className={classes.textField}
                                value={sop}
                                onChange={onChangeSop}
                                disabled={!isApplying}
                            // error={isError && errors.bio}
                            // helperText={errors.bio}
                            />
                            <Button
                                variant='contained'
                                onClick={() => setSop('')}
                                className={classes.button}

                            >
                                Clear
                            </Button>
                            <Button
                                // type='submit'
                                onClick={onSubmitSOP}
                                className={classes.button}
                                variant='contained'
                                color='primary'
                            >
                                Send
                            </Button>
                            <Button
                                variant='contained'
                                className={classes.button}
                                color='secondary'
                                onClick={() => { setSop(""); setIsApplying(false) }}
                            >
                                Cancel
                            </Button>
                            {/* </form> */}
                        </div>
                    </>
                }

                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                    >
                        <TableTitles
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={onRequestSort}
                        />
                        <TableBody>
                            {
                                stableSort(filteredJobs, getComparator(order, orderBy))
                                    .map((row, index) => {
                                        const labelId = `jobLabel${index}`;
                                        return (
                                            <TableRow
                                                hover
                                                // onClick={ }
                                                role="radio"
                                                tabIndex={-1}
                                                key={row._id}
                                            // selected={isItemSelected}
                                            >
                                                <TableCell component="th" id={labelId} scope="row" >
                                                    {row.title}
                                                </TableCell>
                                                <TableCell align="center">{row.recruiter.name.toString()}</TableCell>
                                                <TableCell align="center">{row.salary}</TableCell>
                                                <TableCell align="center">{row.duration}</TableCell>
                                                <TableCell align="center">{row.DOApp.substring(0, 10)}</TableCell>
                                                <TableCell align="center">{row.typeOfJob}</TableCell>
                                                <TableCell align="center">{row.rating}</TableCell>
                                                {
                                                    row.status === 'active' &&
                                                    <TableCell align="left">
                                                        <Button
                                                            id={row._id}
                                                            style={{ backgroundColor: 'green' }}
                                                            variant='contained' size='small'
                                                            onClick={onApplyButton}
                                                        >
                                                            Apply
                                                        </Button>
                                                    </TableCell>
                                                }
                                                {
                                                    row.status === 'applied' &&
                                                    <TableCell align="left">
                                                        <Button disabled style={{ color: 'blue' }} variant='contained' size='small'> Applied </Button>
                                                    </TableCell>
                                                }
                                                {
                                                    row.status === 'full' &&
                                                    <TableCell align="left">
                                                        <Button disabled style={{ color: 'red' }} variant='contained' size='small'> Full </Button>
                                                    </TableCell>
                                                }
                                            </TableRow>
                                        );
                                    })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}

export default JobList;
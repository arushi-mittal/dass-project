import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { Provider } from 'react-redux';

import store from '../store';
import { loadUser } from '../actions/auth';

// Layout imports
import Header from './layout/Header';
import Dashboard from './layout/Dashboard';
import LandingPage from '../components/layout/LandingPage'
// Accounts imports
import Login from './accounts/Login';
import Register from './accounts/Register';
import PrivateRoute from './common/PrivateRoute';
// Admin imports
import AdminProfile from './admin/adminProfile'
import RecordsDashboard from './admin/recordsDashboard'
import ViolationsDashboard from './admin/violationsDashboard'
import BookmarkedDashboard from './admin/bookmarkedDashboard'
// Citizen imports
import CitizenProfile from './citizen/citizenProfile'


class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Fragment>
                        <Header />
                        <div className="container">
                            <Switch>
                                <Route exact path="/" component={LandingPage} />
                                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                                <Route exact path="/register" component={Register} />
                                <Route exact path="/login" component={Login} />
                                <PrivateRoute exact path="/admin/profile" component={AdminProfile} />
                                <PrivateRoute exact path="/admin/records" component={RecordsDashboard} />
                                <PrivateRoute exact path="/admin/violations" component={ViolationsDashboard} />
                                <PrivateRoute exact path="/admin/bookmarked" component={BookmarkedDashboard} />
                                <PrivateRoute exact path="/citizen/profile" component={CitizenProfile} />
                            </Switch>
                        </div>
                    </Fragment>
                </Router>
            </Provider >
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

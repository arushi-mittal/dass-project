import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { Provider } from 'react-redux';

import store from './store';
import { loadUser } from './actions/auth';

// Layout imports
import Header from './components/layout/Header';
import Dashboard from './components/layout/Dashboard';
import LandingPage from './components/layout/LandingPage'
// Accounts imports
import Login from './components/accounts/Login';
import Register from './components/accounts/Register';
import PrivateRoute from './components/common/PrivateRoute';
// Admin imports
import AdminProfile from './components/admin/AdminProfile'
import RecordsDashboard from './components/admin/RecordsDashboard'
import ViolationsDashboard from './components/admin/ViolationsDashboard'
import BookmarkedDashboard from './components/admin/BookmarkedDashboard'
// Citizen imports
import CitizenProfile from './components/citizen/CitizenProfile'
import UploadVideo from './components/citizen/UploadVideo'
import ViewVideos from './components/citizen/ViewVideos'


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
                                <PrivateRoute exact path="/citizen/uploadVideo" component={UploadVideo} />
                                <PrivateRoute exact path="/citizen/viewVideos" component={ViewVideos} />
                            </Switch>
                        </div>
                    </Fragment>
                </Router>
            </Provider >
        );
    }
}

export default App

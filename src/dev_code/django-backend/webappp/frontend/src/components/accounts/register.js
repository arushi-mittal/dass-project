import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
import { createMessage } from '../../actions/messages';

export class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password2: '',
    usertype: '',
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, password2, usertype } = this.state;
    if (password !== password2) {
      this.props.createMessage({ passwordNotMatch: 'Passwords do not match' });
    } else {
      const newUser = {
        username,
        password,
        email
        // usertype,
      };
      this.props.register(newUser);
    }
  };

  onChange = (e) => {
    console.log(e.target.value)
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    if (this.props.isAuthenticated) {
      if (this.state.usertype === 'citizen')
        return <Redirect to="/citizen/profile" />;
      else
        return <Redirect to="/admin/profile" />;
    }
    const { username, email, password, password2, usertype } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={this.onChange}
                value={username}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={this.onChange}
                value={email}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                onChange={this.onChange}
                value={password2}
              />
            </div>
            <div className="form-group">
              <label>User Type</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="usertype"
                  id="citizen"
                  value="citizen"
                  onClick={this.onChange}
                  checked={usertype === "citizen"}
                />
                <label className="form-check-label" htmlFor="citizen">
                  Citizen
              </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="usertype"
                  id="admin"
                  value="admin"
                  onClick={this.onChange}
                  checked={usertype === 'admin'}
                />
                <label className="form-check-label" htmlFor="admin">
                  Admin
              </label>
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, createMessage })(Register);

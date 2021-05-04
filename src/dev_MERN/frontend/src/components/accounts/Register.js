import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Alert} from 'reactstrap'
import { register } from '../../actions/auth';
import { createMessage } from '../../actions/messages';
import { Button as MButton } from '@material-ui/core/'

export class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password2: '',
    role: '',
    msg: null
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, password2, role } = this.state;
    if (password !== password2) {
      // this.props.createMessage({ passwordNotMatch: 'Passwords do not match' });
      this.setState({
        msg: 'Passwords do not match'
      })
    } else {
      const newUser = {
        username,
        password,
        email,
        role
      };
      this.props.register(newUser);
    }
  };

  onChange = (e) => {
    console.log(e.target.value)
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidUpdate(prevProps){
    const { error } = this.props;
    if(error !== prevProps.error){
      if(error.id === 'REGISTER_FAIL'){
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState( {msg: null} );
      }
    }
  }
  render() {
    if (this.props.isAuthenticated) {
      if (this.state.role === 'citizen')
        return <Redirect to="/citizen/profile" />;
      else
        return <Redirect to="/admin/profile" />;
    }
    const { username, email, password, password2, role } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card-body mt-5" style={{border: '1px solid gray'}}>
          <h2 className="text-center">Register</h2>
          <form onSubmit={this.onSubmit}>
            { this.state.msg!=null ? <Alert color="danger">{this.state.msg}</Alert> : null}
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
                  name="role"
                  id="citizen"
                  value="citizen"
                  onClick={this.onChange}
                  checked={role === "citizen"}
                />
                <label className="form-check-label" htmlFor="citizen">
                  Citizen
              </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="role"
                  id="admin"
                  value="admin"
                  onClick={this.onChange}
                  checked={role === 'admin'}
                />
                <label className="form-check-label" htmlFor="admin">
                  Admin
              </label>
              </div>
            </div>
            <div className="form-group">
              <MButton type="submit" className="btn btn-primary" variant="contained" color="primary">
                Register
              </MButton>
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
  error: state.error
});

export default connect(mapStateToProps, { register, createMessage })(Register);

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { Alert } from 'reactstrap'
import { Button as MButton } from '@material-ui/core/'

export class Login extends Component {
  state = {
    username: '',
    password: '',
    msg: null
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  componentDidUpdate(prevProps){
    const { error } = this.props;
    if(error !== prevProps.error){
      if(error.id === 'LOGIN_FAIL'){
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState( {msg: null} );
      }
    }
  }
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }
    const { username, password } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card-body mt-5" style={{border: '1px solid gray'}}>
          <h2 className="text-center">Login</h2>
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
              <MButton type="submit" variant="contained" color="primary">
                Login
              </MButton>
            </div>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
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

export default connect(mapStateToProps, { login })(Login);

import React, {PropTypes} from 'react';
import Layout from 'coral-admin/src/components/ui/Layout';
import styles from './NotFound.css';
import {Button, TextField, Alert, Success} from 'coral-ui';
import I18n from 'coral-framework/modules/i18n/i18n';
import translations from '../translations';
const lang = new I18n(translations);

class AdminLogin extends React.Component {

  constructor (props) {
    super(props);
    this.state = {email: '', password: '', requestPassword: false};
  }

  handleSignIn = e => {
    e.preventDefault();
    this.props.handleLogin(this.state.email, this.state.password);
  }

  handleRequestPassword = e => {
    e.preventDefault();
    this.props.requestPasswordReset(this.state.email);
  }

  render () {
    const {errorMessage} = this.props;
    const signInForm = (
      <form onSubmit={this.handleSignIn}>
        {errorMessage && <Alert>{lang.t(`errors.${errorMessage}`)}</Alert>}
        <TextField
          label='Email Address'
          value={this.state.email}
          onChange={e => this.setState({email: e.target.value})} />
        <TextField
          label='Password'
          value={this.state.password}
          onChange={e => this.setState({password: e.target.value})}
          type='password' />
        <div style={{height: 10}}></div>
        <Button
          type='submit'
          cStyle='black'
          full
          onClick={this.handleSignIn}>Sign In</Button>
        <p className={styles.forgotPasswordCTA}>
          Forgot your password? <a href="#" className={styles.forgotPasswordLink} onClick={e => {
            e.preventDefault();
            this.setState({requestPassword: true});
          }}>Request a new one.</a>
        </p>
      </form>
    );
    const requestPasswordForm = (
      this.props.passwordRequestSuccess
      ? <p className={styles.passwordRequestSuccess} onClick={() => {
        location.href = location.href;
      }}>
          {this.props.passwordRequestSuccess} <a className={styles.signInLink} href="#">Sign in</a>
          <Success />
        </p>
      : <form onSubmit={this.handleRequestPassword}>
        <TextField
          label='Email Address'
          value={this.state.email}
          onChange={e => this.setState({email: e.target.value})} />
        <Button
          type='submit'
          cStyle='black'
          full
          onClick={this.handleRequestPassword}>Reset Password</Button>
      </form>
    );
    return (
      <Layout fixedDrawer restricted={true}>
        <div className={styles.loginLayout}>
          <h1 className={styles.loginHeader}>Team sign in</h1>
          <p className={styles.loginCTA}>Sign in to interact with your community.</p>
          { this.state.requestPassword ? requestPasswordForm : signInForm }
        </div>
      </Layout>
    );
  }
}

AdminLogin.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  passwordRequestSuccess: PropTypes.string,
  loginError: PropTypes.string
};

export default AdminLogin;

import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Input, Label,Col } from 'reactstrap';
import axios from 'axios';
import {configpath} from '../utils/config';

class AuthForm extends React.Component {

  constructor(props)
  {
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      confirm_password :'',
      phone_number:''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

  }
  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }

  changeAuthState = authState => event => {
    event.preventDefault();

    this.props.onChangeAuthState(authState);
  };

  handleLogin = () =>{
    console.log("login");
    let data={email: this.state.email,
    password: this.state.password};

    axios.post(configpath +'/adminusers/authenticate', data,{
      headers: {
      'Content-Type': 'application/json',
      
      //'Authorization': token
      }
    })  
    
    
    .then((response) => {
    console.log(response.data.data.user);
    const serializedState = JSON.stringify(response.data.data.user);  
               localStorage.setItem('data', serializedState);  
               localStorage.setItem('token', response.data.data.token);   
                console.log("Admin:",serializedState)  
                const adminuser =response.data.data.user;  
                console.log(response.data.message);  
    if(response.data.status==='success'){  
    window.location.href=('/admin');
    //this.props.history.push('/admin');
    }
    alert(response.data.message);  
    
    }, (error) => {
    console.log("hai"+error);
    }) 


  }

  handleSubmit = () => {
    console.log("hello");
   // event.preventDefault();
   let data = {first_name: this.state.first_name,
    last_name: this.state.last_name,
    email: this.state.email,
    password: this.state.password,
    phone_number:this.state.phone_number};
   console.log(data);
//    data.append('first_name', this.state.first_name);
// data.append('last_name', this.state.last_name);
// data.append('email', this.state.email);
// data.append('password', this.state.password);
// data.append('phone_number', this.state.phone_number);

axios.post(configpath +'/adminusers/create', data,{
  headers: {
  'Content-Type': 'application/json',
  
  //'Authorization': token
  }
})  


.then((response) => {
console.log(response);
if(response.data.status==='success'){  
window.location.href=('/admin/login');
}
alert(response.data.message);  

}, (error) => {
console.log("hai"+error);
}) 
   }  
  

  handleChange= (e)=> {  
    this.setState({[e.target.name]:e.target.value});  
    }  
    
  renderButtonText() {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return 'Login';
    }

    if (!buttonText && this.isSignup) {
      return 'Signup';
    }

    return buttonText;
  }

  render() {
    const {
      showLogo,
      usernameLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
      confirmPasswordLabel,
      confirmPasswordInputProps,
      children,
      onLogoClick,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
              onClick={onLogoClick}
            />
          </div>

        )}
        {this.isSignup && (
         <FormGroup row>
                  <Label for="First Name" sm={12}>
                    First Name
                  </Label>
                  <Col sm={12}>
                    <Input
                      type="text"
                      name="first_name"
                       onChange={this.handleChange} value={this.state.first_name}
                      placeholder="Enter your First Name"
                    />
                  </Col>
                </FormGroup>
        )}

{this.isSignup && (
                <FormGroup row>
                  <Label for="Last Name" sm={12}>
                    Last Name
                  </Label>
                  <Col sm={12}>
                    <Input
                      type="text"
                      name="last_name"
                       onChange={this.handleChange} value={this.state.last_name}
                      placeholder="Enter your Last Name"
                    />
                  </Col>
                </FormGroup>
)}
                <FormGroup row>
                  <Label for="email" sm={12}>
                   email
                  </Label>
                  <Col sm={12}>
                    <Input
                      type="text"
                      name="email"
                       onChange={this.handleChange} value={this.state.email}
                      placeholder="Enter your email"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="password" sm={12}>
                Password
                  </Label>
                  <Col sm={12}>
                    <Input
                      type="password"
                      name="password"
                       onChange={this.handleChange} value={this.state.password}
                      placeholder="Enter the password"
                    />
                  </Col>
                </FormGroup>
        {this.isSignup && (
          <FormGroup row>
          <Label for="confirm_password" sm={12}>
           Confirm Password
          </Label>
          <Col sm={12}>
            <Input
              type="password"
              name="confirm_password"
               onChange={this.handleChange} value={this.state.confirm_password}
              placeholder="Confirm your password"
            />
          </Col>
        </FormGroup>
        )}

{this.isSignup && (
         <FormGroup row>
                  <Label for="phone_number" sm={12}>
                    Phone Number
                  </Label>
                  <Col sm={12}>
                    <Input
                      type="text"
                      name="phone_number"
                       onChange={this.handleChange} value={this.state.phone_number}
                      placeholder="Enter your Phone Number"
                    />
                  </Col>
                </FormGroup>
)}
        <FormGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            {this.isSignup ? 'Agree the terms and policy' : 'Remember me'}
          </Label>
        </FormGroup>
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={this.isSignup ? this.handleSubmit : this.handleLogin }>
          {this.renderButtonText()}
        </Button>

        <div className="text-center pt-1">
          <h6>or</h6>
          <h6>
            {this.isSignup ? (
              <a href="/admin/login" onClick={this.changeAuthState(STATE_LOGIN)}>
                Login
              </a>
            ) : (
              <a href="/admin/signup" onClick={this.changeAuthState(STATE_SIGNUP)}>
                Signup
              </a>
            )}
          </h6>
        </div>

        {children}
      </Form>
    );
  }
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  usernameLabel: 'Email',
  usernameInputProps: {
    type: 'email',
    placeholder: 'your@email.com',
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    placeholder: 'your password',
  },
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'confirm your password',
  },
  onLogoClick: () => {},
};

export default AuthForm;

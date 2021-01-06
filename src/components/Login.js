import React, { useState, useContext } from 'react';
import { Auth } from "aws-amplify";
import Context from '../context/Context';
import {FlexGroup, Input, LoginForm,  ErrorSpan, LoadingButton} from './ui/elements';
import LoginNav from './LoginNav';
import { onError } from "../libs/errorLib";
import { useFormFields } from '../libs/hooksLibs';

const Login = () => {

  const [isLoading, setIsLoading] = useState(false);
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [fields, handleFieldChange] = useFormFields({
    email:"",
    password:"",
    confirmPassword:""
  });

  const [passwordError, setPasswordError] = useState(false);
  const [confirmError, setConfirmError]= useState(false);

  const context = useContext(Context);
  const {baseInfoChange} = context;
  // const {userHasAuthenticated} = context.resumeContent;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fields.password !== fields.confirmPassword) {
      setConfirmError(true);
    } else {
      setConfirmError(false);
    }

    if (fields.password.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if ((fields.password === fields.confirmPassword) && fields.password.length >7) {
      setIsLoading(true);

      try{
        await Auth.signIn(fields.email, fields.password);
        baseInfoChange({payload: true, name: 'userHasAuthenticated'})
      } catch (err) {
        onError(err);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="Login">
        <LoginNav />
        <FlexGroup style={{justifyContent: 'center'}}>
          <LoginForm onSubmit={handleSubmit}>
            <label>Email</label>
            <Input 
              id='email'
              autoFocus
              type="email"
              value={fields.email}
              onChange={handleFieldChange}
              required 
            />
            <label>Password</label>
            {passwordError && <ErrorSpan>Password must be at least 8 characters long.</ErrorSpan>}
            <Input 
              id='password'
              type="password" 
              required 
              error={passwordError}
              value={fields.password} 
              onChange={handleFieldChange}/>
            <label>Confirm Password</label>
            {confirmError && <ErrorSpan>Passwords do not match.</ErrorSpan>}
            <Input 
              id="confirmPassword"
              type="password"
              required 
              error={confirmError}
              value={fields.confirmPassword} 
              onChange={handleFieldChange}
            />
            <LoadingButton label="Login" isLoading={isLoading} />
          </LoginForm>
        </FlexGroup>
    </div>
  );
};

export default Login;
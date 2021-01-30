import React, { useState, useContext } from 'react';
import { Auth } from "aws-amplify";
import Context from '../context/Context';
import {FlexGroup, Input, LoginForm,  ErrorSpan, LoadingButton} from './ui/elements';
import LoginNav from './LoginNav';
import { onError } from "../libs/errorLib";
import { useFormFields } from '../libs/hooksLibs';
import { useHistory } from "react-router-dom";

const Signup = () => {

  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);  
  const [passwordError, setPasswordError] = useState(false);
  const [confirmError, setConfirmError]= useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email:"",
    password:"",
    confirmPassword:"",
    confirmationCode:""
  });

  const context = useContext(Context);
  const {configInfoChange} = context;

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Passwords do not match.
    if (fields.password !== fields.confirmPassword) {
      setConfirmError(true);
    } else {
      setConfirmError(false);
    }

    // Password is too short.
    if (fields.password.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    // No validation errors.
    if ((fields.password === fields.confirmPassword) && fields.password.length >7) {
      setIsLoading(true);

      try{
        const newUser = await Auth.signUp({
          username: fields.email,
          password: fields.password
        });

        setIsLoading(false);
        setNewUser(newUser);

      } catch (err) {
        onError(err);
        setIsLoading(false);
      }
    }
  };

  const handleConfirmationSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);

      configInfoChange({payload: true, name: 'userHasAuthenticated'});
      history.push("/");

    } catch(err) {
      onError(err);
      setIsLoading(false);
    }
  };

  const renderForm = () => {
    return (
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
        <LoadingButton label="Signup" isLoading={isLoading} />
      </LoginForm>
    )
  };

  const renderConfirmationForm = () => {
    return(
      <LoginForm onSubmit={handleConfirmationSubmit}>
      <label>Confirmation Code</label>
      <Input
        autoFocus
        required
        id="confirmationCode"
        type="tel"
        onChange={handleFieldChange}
        value={fields.confirmationCode}
      />
      <LoadingButton label="Verify" isLoading={isLoading}/>
    </LoginForm>
    )
  };

  return (
    <div className="Signup">
      <LoginNav />
      <FlexGroup style={{justifyContent: 'center'}}>
        {newUser === null ? renderForm() : renderConfirmationForm()}
      </FlexGroup>
    </div>
  );
};

export default Signup;
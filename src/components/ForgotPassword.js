import React, { useState } from 'react';
import { Auth } from "aws-amplify";
import {FlexGroup, Input, LoginForm, LoadingButton} from './ui/elements';
import { onError } from "../libs/errorLib";
import { useFormFields } from '../libs/hooksLibs';
import LoginNav from './LoginNav';
import { useHistory } from "react-router-dom";

const ForgotPassword = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const [fields, handleFieldChange] = useFormFields({
    email:"",
    password:"",
    // confirmPassword:"",
    verificationCode:""
  });

  const history = useHistory();

  async function sendEmail(e) {
    e.preventDefault();

    setIsLoading(true);

    try {
      await Auth.forgotPassword(fields.email);
      setIsLoading(false);
      setEmailSent(true);
    } catch (err) {
      onError(err);
      setIsLoading(false);
    }
  };

  async function changePassword(e) {
    e.preventDefault();

    setIsLoading(true);

    try{
      await Auth.forgotPasswordSubmit(fields.email, fields.verificationCode, fields.password);
      setIsLoading(false);
      history.push("/login");
    } catch (err) {
      onError(err);
      setIsLoading(false);
    }
  }

const renderForm = () => {
  return (
    <LoginForm onSubmit={sendEmail}>
        <label>Email</label>
        <Input 
          id='email'
          autoFocus
          type="email"
          value={fields.email}
          onChange={handleFieldChange}
          required 
        />
        <LoadingButton label="Submit" isLoading={isLoading}/>      
    </LoginForm>
  );
};

const renderConfirmationForm = () => {
  return (
    <LoginForm onSubmit={changePassword}>
      <p style={{color: '#FF5630'}}>
        A password reset code has been emailed to you.
      </p>
      <label>Password reset code</label>
      <Input 
        id="verificationCode"
        type="tel"
        required
        onChange={handleFieldChange}
        value={fields.verificationCode}
        autoFocus
      />
      <label>New password</label>
      <Input 
        id="password"
        type="password"
        required
        value={fields.password}
        onChange={handleFieldChange}
      />
      <LoadingButton label="Reset Password" isLoading={isLoading} width="120px"/>  
    </LoginForm>
  );
};

  return (
    <>
      <LoginNav />
      <FlexGroup style={{justifyContent: 'center'}}>
        {emailSent === false ? renderForm() : renderConfirmationForm()}
      </FlexGroup>
    </>
  );
};

export default ForgotPassword
import React, { useState, useContext } from 'react';
import { Auth } from "aws-amplify";
import Context from '../context/Context';
import {FlexGroup, Input, LoginForm, LoadingButton} from './ui/elements';
import LoginNav from './LoginNav';
import { onError } from "../libs/errorLib";
import { useFormFields } from '../libs/hooksLibs';
import { useHistory } from "react-router-dom";

const Login = () => {

  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email:"",
    password:"",
    confirmationCode:""
  });

  const context = useContext(Context);
  const {configInfoChange} = context;

  const history = useHistory();

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (fields.password.length > 0 && fields.password.length > 0) {
      setIsLoading(true);

      try{
        await Auth.signIn(fields.email, fields.password);
        configInfoChange({payload: true, name: 'userHasAuthenticated'});
        setIsLoading(false);
        history.push("/");
      } catch (err) {
        console.log(err)
        if (err.code === "UserNotConfirmedException") {
         
          await Auth.resendSignUp(fields.email);
          setNewUser(true);
        } else {
          onError(err);
        }
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
        <Input 
          id='password'
          type="password" 
          required 
          value={fields.password} 
          onChange={handleFieldChange}/>
        <LoadingButton label="Login" isLoading={isLoading} />
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
    <div className="Login">
      <LoginNav />
      <FlexGroup style={{justifyContent: 'center'}}>
        {newUser === null ? renderForm() : renderConfirmationForm()}
      </FlexGroup>
    </div>
  );
};

export default Login;
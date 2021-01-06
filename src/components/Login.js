import React, { useState, useContext } from 'react';
import { Auth } from "aws-amplify";
import Context from '../context/Context';
import {FlexGroup, Input, LoginForm, LoadingButton} from './ui/elements';
import LoginNav from './LoginNav';
import { onError } from "../libs/errorLib";
import { useFormFields } from '../libs/hooksLibs';
import { useHistory } from "react-router-dom";

const Login = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email:"",
    password:""
  });

  const context = useContext(Context);
  const {baseInfoChange} = context;

  const history = useHistory();

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (fields.password.length > 0 && fields.password.length > 0) {
      setIsLoading(true);

      try{
        await Auth.signIn(fields.email, fields.password);
        baseInfoChange({payload: true, name: 'userHasAuthenticated'});
        setIsLoading(false);
        history.push("/");
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
            <Input 
              id='password'
              type="password" 
              required 
              value={fields.password} 
              onChange={handleFieldChange}/>
            <LoadingButton label="Login" isLoading={isLoading} />
          </LoginForm>
        </FlexGroup>
    </div>
  );
};

export default Login;
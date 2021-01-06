import React, { useState } from 'react';
// import { useFormFields } from "../libs/hooksLib";
// import Context from '../context/Context';
import {FlexGroup, Input, LoginForm,  ErrorSpan, LoadingButton} from './ui/elements';
import LoginNav from './LoginNav';

const Login = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [confirmError, setConfirmError]= useState(false);

  const handleInputChange = (value, setter) => {

    setter(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setConfirmError(true);
    } else {
      setConfirmError(false);
    }

    if (password.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if ((password === confirmPassword) && password.length >7) {
      alert('logging in');
      setIsLoading(true);
    }
  };

  return (
    <div className="Login">
        <LoginNav />
        <FlexGroup style={{justifyContent: 'center'}}>
          <LoginForm onSubmit={handleSubmit}>
            <label>Email</label>
            <Input type="email" name="email" required />
            <label>Password</label>
            {passwordError && <ErrorSpan>Password must be at least 8 characters long.</ErrorSpan>}
            <Input type="password" name="password" required error={passwordError} onChange={ (e) => handleInputChange(e.target.value, setPassword)}/>
            <label>Confirm Password</label>
            {confirmError && <ErrorSpan>Passwords do not match.</ErrorSpan>}
            <Input type="password" name="confirm-password" required error={confirmError} onChange={ (e) => handleInputChange(e.target.value, setConfirmPassword)}/>
            <LoadingButton label="Login" isLoading={isLoading} />
          </LoginForm>
        </FlexGroup>
    </div>
  );
};

export default Login;
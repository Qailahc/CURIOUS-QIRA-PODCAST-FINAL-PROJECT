// Sign Up page 
import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
`;

const InputContainer = styled.div`
  margin-bottom: 15px;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const InputField = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 20px;
`;

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Form submission logic here
    console.log('Email:', email);
    console.log('Password:', password);
    setEmail('');
    setPassword('');
  };

  return (
    <FormContainer>
      <Heading>Sign Up</Heading>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <InputLabel htmlFor="email">Email</InputLabel>
          <InputField
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="password">Password</InputLabel>
          <InputField
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputContainer>
        <Button type="submit">Sign Up</Button>
      </form>
      <p>
        Already a member? <a href="/login">Log In</a>
      </p>
      <p>or sign up with</p>
      <img src="fg-logo.png" alt="Sign up with FG" />
    </FormContainer>
  );
};

export default SignUpForm;

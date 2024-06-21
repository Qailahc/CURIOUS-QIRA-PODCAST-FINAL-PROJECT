// Import necessary dependencies from React and styled-components
import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components for styling the sign-up form
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

// SignUpForm component
const SignUpForm = () => {
  // State variables to manage email and password input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Log email and password values to console
    console.log('Email:', email);
    console.log('Password:', password);
    // Clear email and password fields after submission
    setEmail('');
    setPassword('');
  };

  // Render sign-up form with input fields for email and password
  return (
    <FormContainer>
      {/* Sign-up form heading */}
      <Heading>Sign Up</Heading>
      {/* Form element with onSubmit event handler */}
      <form onSubmit={handleSubmit}>
        {/* Input field for email */}
        <InputContainer>
          <InputLabel htmlFor="email">Email</InputLabel>
          <InputField
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state on change
            required // Make email field required
          />
        </InputContainer>
        {/* Input field for password */}
        <InputContainer>
          <InputLabel htmlFor="password">Password</InputLabel>
          <InputField
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on change
            required // Make password field required
          />
        </InputContainer>
        {/* Button to submit the form */}
        <Button type="submit">Sign Up</Button>
      </form>
      {/* Link to login page for existing members */}
      <p>
        Already a member? <a href="/login">Log In</a>
      </p>
      {/* Text for alternative sign-up options */}
      <p>or sign up with</p>
      {/* Image for an alternative sign-up option */}
      <img src="fg-logo.png" alt="Sign up with FG" />
    </FormContainer>
  );
};

// Export the SignUpForm component as default
export default SignUpForm;

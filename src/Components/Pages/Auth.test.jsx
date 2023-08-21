import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'; // Import axios
import Auth from './Auth';

// Mock axios for successful login
jest.mock('axios');

test('submits login form with valid credentials', async () => {
  render(<Auth />);

  const emailInput = screen.getByLabelText('Email :');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByText('login'); // Adjust this based on your component's text

  fireEvent.change(emailInput, { target: { value: 'chandubopche8@gmail.com' } });
  fireEvent.change(passwordInput, { target: { value: 'Chandu' } });
  fireEvent.click(submitButton);

  await waitFor(() => {

    expect(localStorage.getItem('token')).toBeTruthy();
    // Add assertions here for successful login, such as navigating to home
  });
});

test('displays alert on login error', async () => {
  render(<Auth />);
  
  // Mock axios to simulate login error
  axios.post.mockRejectedValueOnce(new Error('Login error'));

  const emailInput = screen.getByLabelText('Email :');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByText('login'); // Adjust this based on your component's text

  fireEvent.change(emailInput, { target: { value: 'chandubopche8@gmail.com' } });
  fireEvent.change(passwordInput, { target: { value: 'Chandu' } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    const alertElement = screen.getByRole('alert');
    expect(alertElement).toBeInTheDocument();
    
    // Add assertions for displaying alert with error message
  });
});

test('toggles between login and signup in Auth component', () => {
  render(<Auth />);
  
  const toggleButton = screen.getByText(/New User??|Already a member??/i);
  fireEvent.click(toggleButton);
  expect(screen.getByText('SignUp')).toBeInTheDocument();

  fireEvent.click(toggleButton);
  expect(screen.getByText('Login')).toBeInTheDocument();
});

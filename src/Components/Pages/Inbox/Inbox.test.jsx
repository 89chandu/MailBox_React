import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios'; // Mock axios if needed
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { globalActions } from '../../Store/globalSlice';
import Inbox from './Inbox';

// Mock react-redux useDispatch and useSelector hooks
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mock toast functions
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

// Mock useDispatch and useSelector
const mockDispatch = jest.fn();
const mockSelector = jest.fn();

beforeEach(() => {
  useDispatch.mockReturnValue(mockDispatch);
  useSelector.mockReturnValue([]);
});

test('displays email list and handles navigation', async () => {
  const mockMails = [
    {
      _id: '1',
      sender: 'example@example.com',
      subject: 'Test Subject',
      body: 'Test Body',
      opened: false,
    },
    // ... More mock mails ...
  ];
  
  useSelector.mockReturnValue(mockMails);

  render(
    <MemoryRouter>
      <Inbox />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('example@example.com')).toBeInTheDocument();
   
    
    // Click on an email to navigate
    const email = screen.getByRole('presentation'); // Adjust this selector based on your UI
    // fireEvent.click(email);
    
    // Add assertions to check if navigation is triggered
  });
});

test('displays "No emails available" message when no emails', async () => {
  render(
    <MemoryRouter>
      <Inbox />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('No emails available')).toBeInTheDocument();
  });


  
    
    // Mock axios to simulate login error
    axios.post.mockRejectedValueOnce(new Error('Login error'));
  
    const emailInput = screen.getByLabelText('Email :');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('login'); // Adjust this based on your component's text
  
  
  
    await waitFor(() => {
      const alertElement = screen.getByRole('alert');
      expect(alertElement).toBeInTheDocument();
    // Replace with the expected error message
    });
});




import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Compose from './Compose';

// Mock the toast functions to prevent actual notifications
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

test('submits email form with valid inputs', async () => {
  render(<Compose />);
  
  // Mock axios if you want to simulate a successful response
  jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: { msg: 'Email sent successfully' } });

  const receiverInput = screen.getByLabelText('To :');
  const subjectInput = screen.getByLabelText('Sub :');
  const editor = screen.getByRole('textbox', { name: 'Compose Email :' });
  const sendButton = screen.getByRole('button', { name: 'Send' });

  fireEvent.change(receiverInput, { target: { value: 'sahilkumar2275@gmail.com' } });
  fireEvent.change(subjectInput, { target: { value: 'quitting application' } });
  fireEvent.change(editor, { target: { value: 'Loream Ipsum' } });
  fireEvent.click(sendButton);

  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/email/send', expect.any(Object), expect.any(Object));
    expect(screen.getByText('Email sent successfully')).toBeInTheDocument(); // Assert toast message
    expect(screen.queryByRole('alert')).not.toBeInTheDocument(); // Assert no alert message
  });
});

test('displays alert on email submission error', async () => {
  render(<Compose />);
  
  // Mock axios to simulate an error
  jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Email submission error'));

  const receiverInput = screen.getByLabelText('To :');
  const subjectInput = screen.getByLabelText('Sub :');
  const editor = screen.getByRole('textbox', { name: 'Compose Email :' });
  const sendButton = screen.getByRole('button', { name: 'Send' });

  fireEvent.change(receiverInput, { target: { value: 'sahilkumar2275@gmail.com' } });
  fireEvent.change(subjectInput, { target: { value: 'quitting application' } });
  fireEvent.change(editor, { target: { value: 'Loream Ipsum' } });
  fireEvent.click(sendButton);

  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/email/send', expect.any(Object), expect.any(Object));
    expect(screen.queryByText('Email sent successfully')).not.toBeInTheDocument(); // Assert no toast message
    expect(screen.getByRole('alert')).toBeInTheDocument(); // Assert alert message
  });
});

// ... More test cases ...

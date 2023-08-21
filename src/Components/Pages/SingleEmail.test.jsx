import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import axios from 'axios'; // Mock axios if needed
import SingleEmail from './SingleEmail';

test('displays single email details', async () => {
  // Mock axios response
  const mockResponse = {
    data: {
      data: {
        sender: 'example@example.com',
        subject: 'Test Email',
        body: 'This is a test email body.',
      },
    },
  };
  
  // Mock axios to simulate successful response
  jest.spyOn(axios, 'get').mockResolvedValueOnce(mockResponse);

  // Render the SingleEmail component with a mock URL parameter
  render(
    <MemoryRouter initialEntries={['/emails/1']}>
      <Route path="/emails/:id">
        <SingleEmail />
      </Route>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/email/get/1', expect.any(Object));
    
  });
});

import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import SentMailInbox from './SentMailInbox';

jest.mock('axios');

describe('SentMailInbox Component', () => {
  test('renders SentMailInbox component', () => {
    render(<SentMailInbox />);
  });

  test('renders emails when API call is successful', async () => {
    const mockData = [
      { _id: '1', sender: 'Sender 1', subject: 'Subject 1', body: 'Body 1' },
      { _id: '2', sender: 'Sender 2', subject: 'Subject 2', body: 'Body 2' },
    ];

    axios.get.mockResolvedValue({ data: { data: mockData } });

    render(<SentMailInbox />);

    await waitFor(() => {
      const emailElements = screen.getAllByText(/Sender|Subject|Body/i);
      expect(emailElements.length).toBe(mockData.length * 3); // 3 elements per email
    });
  });

  test('displays error message when API call fails', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));

    render(<SentMailInbox />);

    await waitFor(() => {
      const errorMessage = screen.getByText('couldnt fetch mails', { exact: false });
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test('displays "No emails available" message when no emails are present', () => {
    render(<SentMailInbox />);

    const noEmailsMessage = screen.getByText('No emails available', { exact: false });
    expect(noEmailsMessage).toBeInTheDocument();
  });
});

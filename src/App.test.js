import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('submits the Auth form', async () => {
  render(<App />);
  // Add the form submission test here (test case 2)
});

test('toggles between login and signup in Auth component', () => {
  render(<App />);
  // Add the toggle test here (test case 3)
});

test('displays alert after form submission in Auth component', async () => {
  render(<App />);
  // Add the alert display test here (test case 4)
});

test('navigates to home page after successful login in Auth component', async () => {
  render(<App />);
  // Add the navigation test here (test case 5)
});

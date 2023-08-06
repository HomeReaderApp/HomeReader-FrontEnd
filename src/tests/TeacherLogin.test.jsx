// TeacherLogin.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import TeacherLogin from '../pages/TeacherLogin';

describe('TeacherLogin', () => {
  test('should show error message when login fails', async () => {
    // Mock the fetch function to simulate a failed login
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(new Error('Failed to fetch')));

    // Render the component inside MemoryRouter
    render(
      <MemoryRouter>333
        <TeacherLogin />
      </MemoryRouter>
    );

    // Get the input fields by their placeholder text
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('Login');

    // Simulate typing in the input fields and clicking the "Login" button
    usernameInput.value = 'testuser';
    passwordInput.value = 'testpassword';
    loginButton.click();

    // Check if the error message is displayed
    expect(await screen.findByText('Failed to login')).toBeInTheDocument();

    // Restore the original fetch function
    global.fetch.mockRestore();
  });


});

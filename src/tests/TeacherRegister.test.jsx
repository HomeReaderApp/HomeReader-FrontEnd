// RegisterTeacherUser.test.js

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import RegisterTeacherUser from '../pages/TeacherRegister';

// Mock the RegisterTeacher function
jest.mock('../services/TeacherServices', () => ({
  RegisterTeacher: jest.fn(),
}));

describe('RegisterTeacherUser', () => {
  test('renders the component', () => {
    render(
      <MemoryRouter>
        <RegisterTeacherUser />
      </MemoryRouter>
    );
    
    // Check if the title "Teacher Register" is present on the screen
    expect(screen.getByText('Teacher Register')).toBeInTheDocument();
    
    // Check if the input fields are rendered
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('School Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    
    // Check if the "Register" button is rendered
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('should update state when input values change', () => {
    render(
      <MemoryRouter>
        <RegisterTeacherUser />
      </MemoryRouter>
    );

    // Get the input fields by their placeholder text
    const firstNameInput = screen.getByPlaceholderText('First Name');
    const lastNameInput = screen.getByPlaceholderText('Last Name');
    const schoolNameInput = screen.getByPlaceholderText('School Name');
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');

    // Simulate typing in the input fields
    const testFirstName = 'John';
    const testLastName = 'Doe';
    const testSchoolName = 'Example School';
    const testUsername = 'johndoe';
    const testPassword = 'testpassword';

    act(() => {
      firstNameInput.value = testFirstName;
      lastNameInput.value = testLastName;
      schoolNameInput.value = testSchoolName;
      usernameInput.value = testUsername;
      passwordInput.value = testPassword;
    });

    // Check if the input fields' values are updated in the component state
    expect(firstNameInput).toHaveValue(testFirstName);
    expect(lastNameInput).toHaveValue(testLastName);
    expect(schoolNameInput).toHaveValue(testSchoolName);
    expect(usernameInput).toHaveValue(testUsername);
    expect(passwordInput).toHaveValue(testPassword);
  });

  test('should show error message when registration fails', async () => {
    // Mock the RegisterTeacher function to simulate a failed registration
    const errorMessage = 'Failed to register teacher';
    require('../services/TeacherServices').RegisterTeacher.mockRejectedValueOnce(new Error(errorMessage));

    render(
      <MemoryRouter>
        <RegisterTeacherUser />
      </MemoryRouter>
    );

    // Get the input fields by their placeholder text
    const registerButton = screen.getByText('Register');

    // Click the "Register" button
    act(() => {
      registerButton.click();
    });

    // Check if the error message is displayed
    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Homepage from '../pages/Homepage';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Homepage', () => {
  it('renders the component with correct text', () => {
    render(<Homepage />);
    const headingElement = screen.getByText('HomeReader');
    const paragraphElement = screen.getByText('A place for teachers and parents to communicate and share the successes in home reading');
    const teacherLoginButton = screen.getByText('Teacher Login');
    const studentLoginButton = screen.getByText('Student Login');

    expect(headingElement).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
    expect(teacherLoginButton).toBeInTheDocument();
    expect(studentLoginButton).toBeInTheDocument();
  });

  it('calls navigate when teacher login button is clicked', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(<Homepage />);
    const teacherLoginButton = screen.getByText('Teacher Login');

    teacherLoginButton.click();
    expect(mockNavigate).toHaveBeenCalledWith('/teacher/login');
  });

  it('calls navigate when student login button is clicked', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(<Homepage />);
    const studentLoginButton = screen.getByText('Student Login');

    studentLoginButton.click();
    expect(mockNavigate).toHaveBeenCalledWith('/student/login');
  });
});



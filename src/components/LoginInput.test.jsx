/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle username typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import {
  describe, it, expect, afterEach, vi
} from 'vitest';
// eslint-disable-next-line import/no-extraneous-dependencies
import userEvent from '@testing-library/user-event';
// eslint-disable-next-line import/no-extraneous-dependencies
import matchers from '@testing-library/jest-dom/matchers';
import LoginInput from './LoginInput';

expect.extend(matchers);

describe('loginInput component', () => {
  afterEach(() => {
    cleanup();
  });
  it('should handle username typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const usernameInput = await screen.getByPlaceholderText('Username');

    // action
    await userEvent.type(usernameInput, 'usernametest');

    // assert
    expect(usernameInput).toHaveValue('usernametest');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // action
    await userEvent.type(passwordInput, 'passwordtest');

    // assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call login function when login button is clicked', async () => {
    // arrange
    const mockLogin = vi.fn();
    // get the element
    render(<LoginInput login={mockLogin} />);
    // get the username input
    const usernameInput = await screen.getByPlaceholderText('Username');
    await userEvent.type(usernameInput, 'usernametest');
    // get the password input
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'passwordtest');
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    // action
    await userEvent.click(loginButton);

    // assert
    expect(mockLogin).toBeCalledWith({
      id: 'usernametest',
      password: 'passwordtest'
    });
  });
});

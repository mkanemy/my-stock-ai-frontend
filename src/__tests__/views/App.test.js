import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../../views/App';
import axios from 'axios';

describe('Test App View', () => {
  const renderComponent = () => (render(<App />));

  test('renders the page correctly by checking for learn react', () => {
    const { getByText } = renderComponent();
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders the data from axios get on success', async () => {

    jest.mock('axios');
    axios.get = jest.fn();

    // Mock the get request
    axios.get.mockResolvedValue({
      statusCode: 200,
      data: "test"
    });

    const { getByText } = renderComponent();

    await waitFor(() => {
      const linkElement = getByText(/test/i);
      expect(linkElement).toBeInTheDocument();
    });
  });

  test('renders proper error message on axios get fail', async () => {

    jest.mock('axios');
    axios.get = jest.fn();

    // Mock the get request failing
    axios.get.mockRejectedValueOnce();

    const { getByText } = renderComponent();

    await waitFor(() => {
      const linkElement = getByText(/error/i);
      expect(linkElement).toBeInTheDocument();
    });
  });
})
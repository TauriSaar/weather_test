import { render, screen, waitFor, within } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

import { createMockServer } from './createMockServer';
import { act } from 'react-dom/test-utils';

describe('Weather Application', () => {
  let server;

  beforeEach(() => {
    server = createMockServer();
  });

  afterEach(() => {
    server.shutdown();
  });

  it('renders weather application title', () => {
    render(<App />);
    const linkElement = screen.getByText(/Weather Application/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('shows city search results', async () => {
    render(<App />);

    const input = screen.getByTestId('search-input');
    userEvent.type(input, 'Tartu');

    const button = screen.getByTestId('search-button');
    userEvent.click(button);

    await waitFor(() => {
      expect(screen.getAllByText(/Tartu/i)).toHaveLength(2);
    });
  });

  describe('Weather Application tests', () => {
    it('shows city search results details', async () => {
      render(<App />);

      const input = screen.getByTestId('search-input');
      userEvent.type(input, 'Tartu');

      const button = screen.getByTestId('search-button');
      userEvent.click(button);

      await waitFor(() => {
        expect(screen.getAllByText(/Tartu/i)).toHaveLength(2);
        expect(screen.getByText(/Tartu, 58.3801207, 26.72245/i)).toBeInTheDocument();
      });
    });

    it('add search result to my weather list', async () => {
      render(<App />);

      const input = screen.getByTestId('search-input');
      userEvent.type(input, 'Tartu');

      const button = screen.getByTestId('search-button');
      userEvent.click(button);

      await waitFor(() => {
        expect(screen.getAllByText(/Tartu/i)).toHaveLength(2);
      });

      const selected = screen.getAllByText(/Tartu/i)[1]; // Adjust index based on your actual data
      act(() => {
        userEvent.click(selected);
      });

      await waitFor(() => {
        expect(within(screen.getByTestId('my-weather-list')).getByText(/Tartu/i)).toBeInTheDocument();
      });
    });
  });
});

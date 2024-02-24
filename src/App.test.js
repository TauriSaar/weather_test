import { render, screen } from '@testing-library/react';
import App from './App';

import { createMockServer } from './createMockServer';

describe('Weather Application', () => {
  let server;
  beforeEach(() => {
    server = createMockServer();
  });
  afterEach(() => {
    server.shutdown();
  });

  if('renders weather application title', () => {
    render(<App />);
    const linkElement = screen.getByText(/Weather Application/i);
    expect(linkElement).toBeInTheDocument();
  });

  if ('shows city search results', async () => {
    render(<App />);

    const input = screen.getByTestId('search-input');
    userEvent.type(input, 'Tartu');

    const button = screen.getByTestId('search-button');
    userEvent.click(button);

    await awaitFor(() => expect(screen.getAllByText(/Tartu/i)).length).toEqual(5);
  });
});
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Weather Application', () => {
  test('renders weather application title', () => {
    render(<App />);
    const linkElement = screen.getByText(/Weather Application/i);
    expect(linkElement).toBeInTheDocument();
  });	
});

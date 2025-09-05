import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main page', () => {
  render(<App />);
  const linkElement = screen.getByRole('heading', { level: 1, name: /Hybrid Cloud Insights/i });
  expect(linkElement).toBeInTheDocument();
});
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

jest.mock('@/components/CurrencyConverter', () => ({
    CurrencyConverter: () => (
        <div>Currency Converter Component</div>
    ),
}));

describe('Home page', () => {
    it('renders the currency converter', () => {
        render(<Home />);

        expect(
            screen.getByText('Currency Converter Component')
        ).toBeInTheDocument();
    });
});
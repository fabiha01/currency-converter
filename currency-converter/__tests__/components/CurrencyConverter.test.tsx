import { render, screen, waitFor } from '@testing-library/react';
import { CurrencyConverter } from '@/components/CurrencyConverter';
import { fetchCurrencies } from '@/app/services/fetchCurrencies';

jest.mock('@/app/services/fetchCurrencies');

describe('CurrencyConverter', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        (fetchCurrencies as jest.Mock).mockResolvedValue([
            {
                id: 1,
                code: 'USD',
                name: 'US Dollar',
            },
            {
                id: 2,
                code: 'EUR',
                name: 'Euro',
            },
        ]);
    });

    it('renders the currency converter', async () => {
        render(<CurrencyConverter />);

        expect(
            screen.getByRole('heading', {
                name: 'Currency Converter',
            })
        ).toBeInTheDocument();

        await waitFor(() => {
            expect(fetchCurrencies).toHaveBeenCalledTimes(1);
        });
    });
});
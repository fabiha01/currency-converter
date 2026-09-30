import { fetchCurrencies } from '@/app/services/fetchCurrencies';

describe('fetchCurrencies', () => {
    it('fetches and returns currencies successfully', async () => {
        const mockCurrencies = [
            {
                code: 'USD',
                name: 'US Dollar',
            },
            {
                code: 'EUR',
                name: 'Euro',
            },
        ];

        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => mockCurrencies,
        });

        const result = await fetchCurrencies();

        expect(result).toEqual(mockCurrencies);
        expect(fetch).toHaveBeenCalledWith('/api/currencies');
    });

    it('throws an error when the API request fails', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            statusText: 'Internal Server Error',
        });

        await expect(fetchCurrencies()).rejects.toThrow(
            'Error fetching currencies: Internal Server Error'
        );
    });
});
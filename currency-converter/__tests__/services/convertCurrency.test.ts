import { convertCurrency } from '@/app/services/convertCurrency';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('convertCurrency', () => {
    it('converts currency successfully', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => ({
                response: {
                    value: 85,
                },
            }),
        });

        const result = await convertCurrency(100, 'USD', 'EUR');

        expect(result).toEqual({
            amount: 100,
            fromCurrency: 'USD',
            toCurrency: 'EUR',
            convertedAmount: 85,
            conversionRate: 0.85,
        });
    });
    

    it('throws an error when amount is zero', async () => {
        jest.spyOn(console, 'error').mockImplementation(() => {});

        await expect(
            convertCurrency(0, 'USD', 'EUR')
        ).rejects.toThrow('Could not convert currency');
    });
});
// Takes in amount, the 2 currencies and returns converted amount

import { ConversionData } from '@/types/conversionData';

const apiKey = process.env.CURRENCY_API_KEY; // Get the API key from environment variables

/**
 * Converts an amount from one currency to another using CurrencyBeacon.
 *
 * @param amount - The amount to convert. Must be greater than zero.
 * @param fromCurrency - The three-letter currency code to convert from.
 * @param toCurrency - The three-letter currency code to convert to.
 * @returns The original amount, currencies, converted amount, and conversion rate.
 * @throws An error when the amount is invalid or the currency API request fails.
 */
export async function convertCurrency(amount: number, fromCurrency: string, toCurrency: string): Promise<ConversionData> {

    // Fetch the conversion rate from the API
    const url = `https://api.currencybeacon.com/v1/convert?api_key=${apiKey}&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;

    try {
        
        // Check the amount before making the request
        if (amount <=0) {
            throw new Error('Amount must be greater than zero');
        }
        
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Currency API error: ${response.status}`);
        }

        const data = await response.json();
        const convertedAmount = data.response.value;
        const conversionRate = convertedAmount / amount;

        return {
            amount,
            fromCurrency,
            toCurrency,
            convertedAmount,
            conversionRate

        };
    } catch (error) {
        console.error('Currency conversion failed', error);
        throw new Error('Could not convert currency');
    }

}
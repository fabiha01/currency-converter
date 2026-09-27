// Do the math and return converted amount
// Takes in amount, the 2 currencies and returns converted amount

import { ConversionData } from '../types/currency';
import { fetchConversionRate } from './fetchRates';

export async function convertCurrency(amount: number, fromCurrency: string, toCurrency: string): Promise<ConversionData> {
    // Get the exchange rate from the external API
    const conversionRate = await fetchConversionRate(fromCurrency, toCurrency);

    // Calculate the converted amount
    const convertedAmount = amount * conversionRate;

    // Return the conversion data
    return {
        amount,
        fromCurrency,
        toCurrency,
        convertedAmount,
        conversionRate
    };
}
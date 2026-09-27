// Connect to the external API to fetch currency conversion rates

export async function fetchConversionRate (baseCurrency: string, targetCurrency: string): Promise<number> {
    const url = `https://api.exchangerate.host/latest?base=${baseCurrency}&symbols=${targetCurrency}`;
    
    const response = await fetch(url);
    const data = await response.json();

    // Get the rate for target currency from the response data
    return data.rates[targetCurrency];
}
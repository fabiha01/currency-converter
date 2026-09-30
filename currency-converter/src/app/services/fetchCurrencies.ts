// Fetch currencies from interal route

export async function fetchCurrencies() {
    const response = await fetch('/api/currencies');
    if (!response.ok) {
        throw new Error(`Error fetching currencies: ${response.statusText}`);
    }
    const data = await response.json();

    // The data could be nested inside 'response' or 'currencies'
    // Adjust the return to account for this
    return data.response || data;

}


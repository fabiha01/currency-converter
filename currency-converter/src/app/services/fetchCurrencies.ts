import { Currency } from "@/types/currency";

/**
 * Fetches the available currencies from the internal API route.
 *
 * @returns A list of available currencies.
 * @throws An error when the currency API request fails.
 */
export async function fetchCurrencies(): Promise<Currency[]> {
    const response = await fetch('/api/currencies');
    if (!response.ok) {
        throw new Error(`Error fetching currencies: ${response.statusText}`);
    }
    const data = await response.json();

    return data;

}


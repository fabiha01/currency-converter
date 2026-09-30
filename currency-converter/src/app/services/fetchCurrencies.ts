// Fetch currencies from interal route
import { Currency } from "@/types/currency";

export async function fetchCurrencies(): Promise<Currency[]> {
    const response = await fetch('/api/currencies');
    if (!response.ok) {
        throw new Error(`Error fetching currencies: ${response.statusText}`);
    }
    const data = await response.json();

    return data;

}


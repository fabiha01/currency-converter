// Define the response from Currency API

export interface CurrencyItem {
    id: number; // Unique identifier for the currency
    short_code: string; // Short code for the currency (e.g., USD, EUR)
    name: string; // Name of the currency (e.g., United States Dollar, Euro)
    code: string; // ISO Code for the currency
}
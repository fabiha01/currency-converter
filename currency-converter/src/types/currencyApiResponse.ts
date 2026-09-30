// The data structure we get back from currency beacon

// Response from Postman

// {
//     "id": 2,
//     "name": "Afghani",
//     "short_code": "AFN",
//     "code": "971",
//     "precision": 2,
//     "subunit": 100,
//     "symbol": "؋",
//     "symbol_first": false,
//     "decimal_mark": ".",
//     "thousands_separator": ","
// },

export interface ResponseItem {
    id: number; // Unique identifier for the currency
    name: string; // Short code for the currency (e.g., USD, EUR)
    short_code: string; // Name of the currency (e.g., United States Dollar, Euro)
    code: string; // ISO Code for the currency
}

// Layout sent by API
// Tested in Postman
export interface CurrencyApiResponse {
    meta: {
        code: number;
        disclaimer: string;
    }

    response: ResponseItem[];
}
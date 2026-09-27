// Blue print of data
// Types are strict to ensuure correct data types are used

export interface ConversionData {
    amount: number; // what the user typed in
    fromCurrency: string; // what the user selected in the "from" dropdown
    toCurrency: string; // what the user selected in the "to" dropdown
    convertedAmount: number; // what the user will see in field after conversion
    conversionRate: number; // exchange rate between the two currencies
}
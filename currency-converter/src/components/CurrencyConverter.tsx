"use client"; // This code will run in the browser

import { useState } from "react";
import { ConversionData } from "@/app/types/currency";

export function CurrencyConverter() {
    // State are the variables that can change
    const [amount, setAmount] = useState<number>(0);
    const [fromCurrency, setFromCurrency] = useState<string>("USD");
    const [toCurrency, setToCurrency] = useState<string>("EUR");
    const [conversionData, setConversionData] = useState<ConversionData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Function to handle the conversion when the user clicks the button
    async function handleConvert() {
        setLoading(true);

        // call our apu route
        const response = await fetch(`/api/convert?amount=${amount}&fromCurrency=${fromCurrency}&toCurrency=${toCurrency}`);
        const data = await response.json();

        if (response.ok) {
            setConversionData(data);
        } else {
            console.error("Error converting currency:", data.error);
            setConversionData(null);
        }

    }

    return (
        <div className="currency-converter">
            <h1>Currency Converter</h1>
            <div className="converter-form">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    placeholder="EnterAmount"
                />
                <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                </select>
                <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                </select>
                <button onClick={handleConvert} disabled={loading}>
                    {loading ? "Converting..." : "Convert"}
                </button>
            </div>

            {conversionData && (
                <div className="conversion-result">
                    <p>{conversionData.amount} {conversionData.fromCurrency} = {conversionData.convertedAmount.toFixed(2)} {conversionData.toCurrency}</p>
                    <p>Conversion Rate: 1 {conversionData.fromCurrency} = {conversionData.conversionRate.toFixed(4)} {conversionData.toCurrency}</p>
                </div>
            )}
        </div>
    );
}

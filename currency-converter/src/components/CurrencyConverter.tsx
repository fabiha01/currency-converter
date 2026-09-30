"use client"; // This code will run in the browser

import { useEffect, useState } from "react";
import { ConversionData } from "@/app/types/currency";
import { fetchCurrencies } from "@/app/services/fetchCurrencies";
import { CurrencyItem } from "@/app/types/currencyItem";

export function CurrencyConverter() {
    // State are the variables that can change
    const [amount, setAmount] = useState<number>(0); // The amount the user wants to convert
    const [fromCurrency, setFromCurrency] = useState<string>("USD"); // The currency the user wants to convert from
    const [toCurrency, setToCurrency] = useState<string>("EUR"); // The currency the user wants to convert to
    const [conversionResult, setConversionResult] = useState<ConversionData | null>(null); // The result of the conversion
    const [isLoadingCurrencies, setIsLoadingCurrencies] = useState<boolean>(false);
    const [isConverting, setIsConverting] = useState<boolean>(false);

    // state to hold the list of currencies
    const [currencies, setCurrencies] = useState<CurrencyItem[]>([]);

    // Fetch currencies when the component mounts
    useEffect(() => {
        async function loadCurrencies() {
            try {
                const fetchedCurrencies = await fetchCurrencies();
                // Make sure it is an array before setting state
                setCurrencies(Array.isArray(fetchedCurrencies) ? fetchedCurrencies : []);
            } catch (error) {
                console.error("Error fetching currencies:", error);
            }
            finally {
                setIsLoadingCurrencies(false);
            }
        }

        loadCurrencies();
    }, []);

    // Function to handle the conversion when the user clicks the button
    async function handleConvert() {
        setIsConverting(true);

        try {
            // call our api route
            const response = await fetch(`/api/convert?amount=${amount}&fromCurrency=${fromCurrency}&toCurrency=${toCurrency}`);
            const data = await response.json();
            console.log('Conversion response', data);

            if (!response.ok) {
                throw new Error(data.error);
            }

            setConversionResult(data);

        } catch(error) {
            console.error('Error converting currency', error);
            setConversionResult(null);
        } finally {
            setIsConverting(false);
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
                    {currencies.map((currency) => (
                        <option key={currency.id} value={currency.short_code}>
                            {currency.short_code} - {currency.name}
                        </option>
                    ))}
                </select>
                <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                    {currencies.map((currency) => (
                        <option key={currency.id} value={currency.short_code}>
                            {currency.short_code} - {currency.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleConvert} disabled={isConverting}>
                    {isConverting ? "Converting..." : "Convert"}
                </button>
            </div>

            {conversionResult && (
                <div className="conversion-result">
                    <p>
                        Amount: {conversionResult.amount}
                    </p>

                    <p>
                        From: {conversionResult.fromCurrency}
                    </p>

                    <p>
                        To: {conversionResult.toCurrency}
                    </p>

                    <p>
                        Converted amount: {conversionResult.convertedAmount.toFixed(2)}
                    </p>

                    <p>
                        Conversion rate: {conversionResult.conversionRate.toFixed(4)}
                    </p>
                </div>
            )}
        </div>
    );
}

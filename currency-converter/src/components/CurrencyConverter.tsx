"use client"; // This code will run in the browser

import { useEffect, useState } from "react";
import { ConversionData } from "@/types/conversionData";
import { fetchCurrencies } from "@/app/services/fetchCurrencies";
import { Currency } from "@/types/currency";

import { CurrencyAmountInput } from "./CurrencyAmountInput";
import { CurrencySelect } from "./CurrencySelect";

/**
 * Main currency converter component.
 *
 * Manages the selected currencies, conversion amount, API requests,
 * loading states, errors, and conversion results.
 */
export function CurrencyConverter() {
    // State are the variables that can change
    const [amount, setAmount] = useState<number>(0); // The amount the user wants to convert
    const [fromCurrency, setFromCurrency] = useState<string>("USD"); // The currency the user wants to convert from
    const [toCurrency, setToCurrency] = useState<string>("EUR"); // The currency the user wants to convert to
    const [conversionResult, setConversionResult] = useState<ConversionData | null>(null); // The result of the conversion
    const [isLoadingCurrencies, setIsLoadingCurrencies] = useState<boolean>(false);
    const [isConverting, setIsConverting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null); // Stores error message to display to the user
    

    // state to hold the list of currencies
    const [currencies, setCurrencies] = useState<Currency[]>([]);

    // Fetch currencies when the component mounts
    useEffect(() => {
        async function loadCurrencies() {
            setIsLoadingCurrencies(true);
            try {
                const fetchedCurrencies = await fetchCurrencies();
                // Make sure it is an array before setting state
                setCurrencies(fetchedCurrencies);
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
        setError(null);

        try {
            // call our api route
            const response = await fetch(`/api/convert?amount=${amount}&fromCurrency=${fromCurrency}&toCurrency=${toCurrency}`);
            const data = await response.json();
            console.log('Conversion response', data);

            if (!response.ok) {
                throw new Error(data.error);
            }

            if(!amount || amount <= 0) {
                setError('Please enter an amount greater than zero');
                return;
            }

            setConversionResult(data);

        } catch(error) {
            console.error('Error converting currency', error);
            setConversionResult(null);
            setError(error instanceof Error ? error.message: 'Unable to convert currency');
        } finally {
            setIsConverting(false);
        }
    }

    return (
        <div className="currency-converter">
            <h1>Currency Converter</h1>
            <div className="converter-form">
                <CurrencyAmountInput amount={amount} setAmount={setAmount} />
                <CurrencySelect label={"Convert From:"} value={fromCurrency} currencies={currencies} onChange={setFromCurrency} />
                <CurrencySelect label={"Convert To:"} value={toCurrency} currencies={currencies} onChange={setToCurrency} />
                <button onClick={(e) => {
                    e.preventDefault();
                    handleConvert();
                    }
                } 
                    disabled={isConverting}>
                    {isConverting ? "Converting..." : "Convert"}
                </button>

                {error && (
                    <p role="alert">
                        {error}
                    </p>
                )}
            </div>

            {conversionResult && (
                <div className="conversion-result">
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

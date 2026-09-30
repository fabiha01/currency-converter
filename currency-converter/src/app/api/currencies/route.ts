// Use the Next.js way of creating an endpoint
// When a user views this route, the code runs

import { NextResponse } from "next/server";
import { Currency } from "@/types/currency";
import { CurrencyApiResponse } from "@/types/currencyApiResponse";

// Use the API key from the environment variables
const apiKey = process.env.CURRENCY_API_KEY;

export async function GET() {

    try {

        if (!apiKey) {
            throw new Error("Currency API key has not been configured");
        }

        // Fetch the list of currencies from the external API
        const url = `https://api.currencybeacon.com/v1/currencies?api_key=${apiKey}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Currency API error: ${response.status}`);
        }

        const data: CurrencyApiResponse = await response.json();

        console.log('data from currency route', data);

        const cleanedCurrencies: Currency[] = data.response.map((item) => ({
            id: item.id,
            name: item.name,
            code: item.code,
            short_code: item.short_code
        }));

        // Return the list of currencies
         return NextResponse.json(cleanedCurrencies);

    } catch (error) {
        console.error("SERVER CRASH DETAILS:", error); // Look at your terminal for this!
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }

}   
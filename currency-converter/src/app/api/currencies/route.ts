// Use the Next.js way of creating an endpoint
// When a user views this route, the code runs

import { NextResponse } from "next/server";

export async function GET(request: Request) {
    // Use the API key from the environment variables
    const apiKey = process.env.CURRENCY_API_KEY;
    
    // Fetch the list of currencies from the external API
    const url = `https://api.currencybeacon.com/v1/currencies?api_key=${apiKey}`;
   

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching currencies: ${response.statusText}`);
        }

        const data = await response.json();
        // Return the list of currencies
         return NextResponse.json(data);

    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }

}   
// Use the Next.js way of creating an endpoint
// When a user views this route, the code runs

import { NextResponse } from "next/server";
import {convertCurrency} from "@/app/services/convertCurrency";

export async function GET(request: Request) {
    try {

        // Get the query parameters from the request URL
        const { searchParams } = new URL(request.url);
        const amount = parseFloat(searchParams.get("amount") || "0");
        const fromCurrency = searchParams.get("fromCurrency")?.toUpperCase() || "";
        const toCurrency = searchParams.get("toCurrency")?.toUpperCase() || "";

        // Validate the query parameters
        if (!amount || !fromCurrency || !toCurrency) {
            return NextResponse.json({ error: "Missing or invalid query parameters" }, { status: 400 });
        }

        // Call the convertCurrency function to perform the conversion
        const conversionData = await convertCurrency(amount, fromCurrency, toCurrency);

        // Return the conversion data as JSON
        return NextResponse.json(conversionData);
    } catch (error) {
        console.error("Error in currency conversion:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
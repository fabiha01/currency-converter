import { NextResponse } from "next/server";
import {convertCurrency} from "@/app/services/convertCurrency";

/**
 * Handles GET requests to the currency conversion API endpoint.
 *
 * Reads the amount and currency codes from the request query parameters,
 * validates them, and delegates the conversion to the currency service.
 *
 * @param request - The incoming HTTP request.
 * @returns A JSON response containing the conversion data or an error.
 */
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

        // Use the convertCurrency service to perform the conversion
        const conversionData = await convertCurrency(amount, fromCurrency, toCurrency);

        // Return the conversion data as JSON
        return NextResponse.json(conversionData);
    } catch (error) {
        console.error("Error in currency conversion:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
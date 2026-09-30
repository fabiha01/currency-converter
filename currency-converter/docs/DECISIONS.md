# Technical Decisions and Assumptions

## Overview

This document explains some of the technical decisions and assumptions made while building the currency conversion application.

The application was intentionally kept relatively small. The aim was to meet the requirements of the assessment while keeping the code easy to understand, maintain and test.

---

## Framework

I chose Next.js with React and TypeScript.

The assessment specifically mentioned React as an option, and Next.js provides React as its underlying UI framework.

I chose Next.js because I am familiar with it and it provides useful features for this application, particularly API routes and server-side handling of environment variables.

TypeScript was used to provide static typing throughout the application and to make the contracts between the different parts of the application clearer.

---

## Project Structure

The application is organised into several areas with different responsibilities.

```text
src/
├── app/
│   ├── api/
│   │   ├── convert/
│   │   │   └── route.ts
│   │   └── currencies/
│   │       └── route.ts
│   │
│   └── services/
│       ├── convertCurrency.ts
│       └── fetchCurrencies.ts
│
├── components/
│   ├── CurrencyAmountInput.tsx
│   ├── CurrencyConverter.tsx
│   └── CurrencySelect.tsx
│
└── types/
    ├── currency.ts
    ├── currencyApiResponse.ts
    └── conversionData.ts
```

The intention is to keep the UI, API handling, business logic and types reasonably separate.

This also makes individual parts easier to test.

---

## API Keys and External API Access

The CurrencyBeacon API key is stored in an environment variable rather than being included directly in the source code.

```text
CURRENCY_API_KEY
```

The API key is therefore not exposed directly to the React client.

The application uses its own Next.js API routes as a boundary between the browser and CurrencyBeacon.

For example:

```text
Browser
   ↓
/api/currencies
   ↓
CurrencyBeacon
```

and:

```text
Browser
   ↓
/api/convert
   ↓
CurrencyBeacon
```

This also gives the application a single place to handle external API errors and transform external API responses.

---

## Currency API Response Mapping

CurrencyBeacon returns currency data in a structure containing a `meta` object and a `response` array.

The external API uses `short_code` for the familiar currency abbreviation, such as `USD`, `EUR` and `GBP`.

The application maps the external response into the application's own currency model.

This means the React components do not need to know about the specific structure used by CurrencyBeacon.

The intended flow is:

```text
CurrencyBeacon response
        ↓
API route
        ↓
Map external response
        ↓
Application Currency type
        ↓
React components
```

This provides a small abstraction around the external service and means the UI is less coupled to the third-party API.

---

## Domain Types and API Types

The external CurrencyBeacon response and the application's internal currency model are represented separately.

The API response type describes the structure returned by CurrencyBeacon.

The application `Currency` type describes the data required by the application.

This distinction is intentional.

If the external API changes its response structure, the mapping at the API boundary can be changed without requiring the React components to understand the new structure.

---

## Currency Conversion

The conversion is performed using the CurrencyBeacon conversion endpoint.

CurrencyBeacon returns the converted value.

The application then calculates the conversion rate from the returned value and the original amount.

For example:

```text
Amount = 500
Converted amount = 441.178735

Conversion rate =
441.178735 / 500

= 0.88235747
```

The application keeps both values so that the user can see:

```text
500 USD = 441.18 EUR

1 USD = 0.8824 EUR
```

---

## Input Validation

The application validates the conversion amount before making the external API request.

An amount must be greater than zero.

This prevents an unnecessary request being made when the input is invalid.

Errors from the API are also handled and displayed to the user rather than allowing the application to fail silently.

---

## Loading and Error States

Loading state is separated between fetching the available currencies and performing a conversion.

This allows the application to distinguish between:

```text
Loading currencies
```

and:

```text
Converting an amount
```

Errors are also handled separately from successful conversion results.

The intention is to provide useful feedback to the user while an operation is in progress or when something goes wrong.

---

## Component Composition

The main converter component is responsible for bringing the different parts of the UI together.

Smaller components are used for specific pieces of functionality, such as:

* entering the amount
* selecting a currency
* displaying the converter interface

The aim is to keep individual components relatively small and focused.

I have avoided creating components where the abstraction does not provide a meaningful benefit.

---

## Services

External and business-related operations are kept outside the React component where possible.

For example:

```text
fetchCurrencies()
```

is responsible for retrieving currencies.

```text
convertCurrency()
```

is responsible for performing the currency conversion.

This keeps the React component focused primarily on UI state and user interaction.

It also makes the service functions easier to test independently.

---

## Testing

Jest and React Testing Library are used to test important application behaviour.

The tests focus on meaningful behaviour rather than trying to achieve complete line coverage.

The main areas being tested are:

* currency fetching
* currency conversion
* API failures
* invalid conversion amounts
* important UI behaviour

External API requests are mocked in tests so that the test suite does not depend on CurrencyBeacon being available.

This also makes the tests faster and deterministic.

---

## No Runtime Schema Validation

I considered adding a runtime validation library such as Zod for validating the external API response.

I decided not to add it for this application.

The project is relatively small and the assessment is primarily concerned with component composition, code quality, maintainability and the approach taken.

The external API response is represented using TypeScript types and is mapped at the API boundary.

For a larger production application, or an application where the external API was particularly unreliable or changed frequently, I would consider adding runtime schema validation.

---

## Styling

The application uses SCSS/CSS for styling rather than introducing a larger UI framework.

The assessment places more emphasis on code quality and component composition than visual design, so the styling has deliberately been kept relatively simple.

The intention was to create a clear and usable interface without spending disproportionate time on visual design.

---

## Assumptions

The following assumptions were made during development:

* CurrencyBeacon remains available while the application is being used.
* A valid CurrencyBeacon API key is provided through the environment.
* CurrencyBeacon returns the documented response structure.
* The user enters a positive numeric amount.
* The selected currencies are valid currencies returned by CurrencyBeacon.
* The conversion result supplied by CurrencyBeacon is used as the source of truth for the converted amount.

---

## Error Handling

The application handles errors at several points.

External API failures are caught by the service/API layer.

The Next.js API routes return an appropriate HTTP error response when an operation fails.

The React application then uses this response to provide feedback to the user.

The intention is to avoid exposing implementation details or raw API errors unnecessarily to the user.

---

## Trade-offs

Because this is a small assessment application, I deliberately avoided over-engineering it.

For example, I did not introduce:

* a global state management library
* a large UI component library
* a complex data-fetching library
* runtime schema validation
* a large abstraction layer around simple operations

These tools can be useful in larger applications, but I felt they would add complexity without providing enough benefit for this particular project.

The goal was to demonstrate good separation of responsibilities while keeping the solution understandable.

---

## Future Improvements

If this were being developed further, possible improvements could include:

* runtime validation of external API responses
* improved accessibility testing
* more comprehensive component tests
* request cancellation when appropriate
* improved API error categorisation
* caching currency data
* displaying currency symbols
* improved formatting based on currency precision
* automatic conversion when the amount or currencies change
* more comprehensive end-to-end testing

These were deliberately kept outside the initial scope to avoid over-engineering the assessment.

---

## Summary

The main design principle behind the application is to keep responsibilities separated while keeping the implementation simple.

The overall flow is:

```text
React UI
   ↓
Next.js API route
   ↓
Service
   ↓
CurrencyBeacon
```

External API data is mapped into application-specific types at the boundary.

The UI is responsible for presentation and user interaction, while services are responsible for application operations and the API routes provide a boundary around the external service.

This structure provides a reasonable balance between simplicity and maintainability for the size of the application.

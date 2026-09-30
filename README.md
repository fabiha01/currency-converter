# Currency Converter

A simple currency converter built with **Next.js**, **TypeScript**, and **React**. The application allows users to select currencies, enter an amount, and convert between currencies using live exchange-rate data.

## Features

* Convert between supported currencies
* Fetch available currencies from the application's API
* Display the converted amount and conversion rate
* Loading states while currencies and conversions are being fetched
* Error handling for invalid amounts and failed API requests
* Responsive React UI
* Unit and component tests using Jest and React Testing Library

## Tech Stack

* **Next.js**
* **React**
* **TypeScript**
* **Jest**
* **React Testing Library**
* **CurrencyBeacon API**
* **SCSS**

## Getting Started

### Prerequisites

Make sure you have **Node.js** and **npm** installed.

### Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### Environment Variables

The application uses the CurrencyBeacon API for currency conversion.

Create a `.env.local` file in the root of the project:

```env
CURRENCY_API_KEY=your_currencybeacon_api_key
```

Replace `your_currencybeacon_api_key` with your CurrencyBeacon API key.

> Do not commit `.env.local` or your API key to source control.

### Run the Development Server

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

The application will automatically reload when you make changes.

## Testing

The project uses **Jest** and **React Testing Library** for automated testing.

Run the test suite with:

```bash
npm test
```

The tests currently cover:

* Currency conversion service
* Currency fetching service
* Currency converter component
* Home page rendering
* Successful API requests
* API request failures
* Invalid conversion amounts

To run Jest in watch mode:

```bash
npm test -- --watch
```


## Project Structure

```text
currency-converter/
├── __tests__/
│   ├── components/
│   │   └── CurrencyConverter.test.tsx
│   ├── services/
│   │   ├── convertCurrency.test.ts
│   │   └── fetchCurrencies.test.ts
│   └── page.test.jsx
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── convert/
│   │   │   │   └── route.ts
│   │   │   └── currencies/
│   │   │       └── route.ts
│   │   │
│   │   ├── services/
│   │   │   ├── convertCurrency.ts
│   │   │   └── fetchCurrencies.ts
│   │   │
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── CurrencyAmountInput.tsx
│   │   ├── CurrencyConverter.tsx
│   │   └── CurrencySelect.tsx
│   │
│   └── types/
│       ├── conversionData.ts
│       ├── currency.ts
│       └── currencyApiResponse.ts
│
├── .env
├── env.example
├── eslint.config.mjs
├── jest.config.ts
├── jest.setup.ts
├── next-env.d.ts
├── next.config.ts
├── package.json
└── README.md
```


## How It Works

The application follows a simple flow:

1. The application loads the available currencies.
2. The user selects the source currency.
3. The user selects the target currency.
4. The user enters an amount.
5. The application sends the conversion request to the API.
6. The converted amount and conversion rate are displayed to the user.
7. Errors are displayed when a conversion cannot be completed.

## Available Scripts

### Development

```bash
npm run dev
```

Starts the Next.js development server.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Start Production Server

```bash
npm start
```

Starts the application using the production build.

### Tests

```bash
npm test
```

Runs the Jest test suite.

## API

Currency conversion data is provided through the **CurrencyBeacon API**.

The API key is stored in the `CURRENCY_API_KEY` environment variable and should never be committed to the repository.

## Future Improvements

Potential improvements for the application include:

* Swap source and target currencies
* More detailed loading indicators
* Improved error messages
* Conversion history
* Additional currency information
* More comprehensive component and integration tests
* Accessibility improvements
* Improved responsive styling

## Deployment

This application can be deployed using a Next.js-compatible hosting platform such as Vercel.

Before deploying, make sure the `CURRENCY_API_KEY` environment variable is configured in the hosting platform's environment settings.

## License

This project is for educational and development purposes.

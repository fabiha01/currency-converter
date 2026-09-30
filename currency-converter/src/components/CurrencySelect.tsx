import { Currency } from "@/types/currency";

interface CurrencySelectProps {
    label: string;
    value: string;
    currencies: Currency[];
    onChange: (currency: string) => void;
}

export function CurrencySelect({label, value, currencies, onChange} : CurrencySelectProps) {
    return (
        <label>
            {label}

            <select value={value} onChange={(e) => onChange(e.target.value)}>
                {currencies.map((currency) => (
                    <option key={currency.id} value={currency.code}>
                        {currency.code} - {currency.name}
                    </option>
                ))}
            </select>
        </label>

    )
}
import { Currency } from "@/types/currency";

interface CurrencySelectProps {
    label: string;
    value: string;
    currencies: Currency[];
    onChange: (currency: string) => void;
}

/**
 * Renders a select field containing the available currencies.
 *
 * @param label - Label displayed alongside the select field.
 * @param value - Currently selected currency code.
 * @param currencies - List of currencies available for selection.
 * @param onChange - Callback invoked when the selected currency changes.
 */
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
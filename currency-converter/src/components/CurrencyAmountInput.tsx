interface CurrencyAmountProps {
    amount: number;
    setAmount: (value: number) => void;
}

/**
 * Renders the input used to enter the amount to be converted.
 *
 * @param amount - The current amount entered by the user.
 * @param setAmount - Updates the amount in the parent component.
 */
export function CurrencyAmountInput({amount, setAmount} : CurrencyAmountProps) {
    return (
        <input
            type="number"
            value={Number.isNaN(amount) || !amount ? '' : amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            placeholder="Enter an Amount"
        />
    )
}
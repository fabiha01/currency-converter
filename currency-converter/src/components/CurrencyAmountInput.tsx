interface CurrencyAmountProps {
    amount: number;
    setAmount: (value: number) => void;
}

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
export default function currency(amount) {
  // format number from USD
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })
  const formattedAmount = formatter.format(amount)
  return formattedAmount
}

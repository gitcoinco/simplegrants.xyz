export function formatMoney(val: number, currency?: string, decimals = 2) {
  return Number(val / 100).toLocaleString("en-US", {
    currency,
    style: currency && "currency",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

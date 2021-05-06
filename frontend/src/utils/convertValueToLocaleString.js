export function convertValueToLocaleString(value) {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    currency: "BRL",
  });
}

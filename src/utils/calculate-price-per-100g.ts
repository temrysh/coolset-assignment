export const calculatePricePer100g = (
  price: number,
  weight: number
): number => {
  const weightInGrams = weight * 1000;
  const pricePer100g = (price / weightInGrams) * 100;
  return Math.ceil(pricePer100g * 100) / 100;
};

export default calculatePricePer100g;

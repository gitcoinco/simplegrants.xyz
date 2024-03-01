export function roundNumber(num: number) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

type Contribution = { grantId: string; userId: string; amount: number };
export function calculateQuadraticMatching(
  contributions: Contribution[],
  matchingAmount: number,
) {
  let summed = 0;
  const matching: Record<string, number> = {};

  const groupedByGrantsAndUsers = contributions.reduce(
    (acc, { amount, grantId, userId }) => ({
      ...acc,
      [grantId]: {
        ...acc[grantId],
        [userId]: (acc[grantId]?.[userId] ?? 0) + amount,
      },
    }),
    {} as Record<string, Record<string, number>>,
  );

  Object.entries(groupedByGrantsAndUsers).forEach(([grantId, funding]) => {
    let sumAmount = 0;

    Object.entries(funding).forEach(
      ([_, amount]) => (sumAmount += Math.sqrt(amount)),
    );

    sumAmount *= sumAmount;
    matching[grantId] = sumAmount;
    summed += sumAmount;
  });

  const divisor = matchingAmount / summed;

  Object.entries(groupedByGrantsAndUsers).forEach(
    ([grantId]) => (matching[grantId] *= divisor),
  );

  return matching;
}

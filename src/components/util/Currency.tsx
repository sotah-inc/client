import * as React from 'react';

type Props = {
  amount: number
};

export const Currency: React.SFC<Props> = (props: Props) => {
  let { amount } = props;
  const copper = amount % 100;
  amount = amount / 100;
  const silver = amount % 100;
  const gold = amount / 100;

  return <>{Number(gold.toFixed(0)).toLocaleString()}g {silver.toFixed(0)}s {copper.toFixed(0)}c</>;
};

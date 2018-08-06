import * as React from "react";

interface Props {
    amount: number;
}

export const Currency: React.SFC<Props> = (props: Props) => {
    let { amount } = props;
    if (amount === 0) {
        return <>0g</>;
    }

    const copper = Math.floor(amount % 100);
    amount = amount / 100;
    const silver = Math.floor(amount % 100);
    const gold = Math.floor(amount / 100);

    const copperOutput = copper > 0 ? `${copper.toFixed()}c` : null;
    const silverOutput = silver > 0 ? `${silver.toFixed()}s` : null;
    const goldOutput = gold > 0 ? `${Number(gold.toFixed(0)).toLocaleString()}g` : null;
    const output = [goldOutput, silverOutput, copperOutput].filter(v => v !== null).join(" ");

    return <>{output}</>;
};

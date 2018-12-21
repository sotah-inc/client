import * as React from "react";

interface IProps {
    amount: number;
    hideCopper?: boolean;
}

export const Currency: React.SFC<IProps> = (props: IProps) => {
    const { hideCopper } = props;
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
    const outputParams = [goldOutput, silverOutput];
    if (typeof hideCopper === "undefined" || hideCopper === false) {
        outputParams.push(copperOutput);
    }
    const output = outputParams.filter(v => v !== null).join(" ");

    return <>{output}</>;
};

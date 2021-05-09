import React from 'react';
declare type InputNumberValueType = string | number;
export interface InputNumberProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onInput' | 'onChange'> {
    defaultValue?: InputNumberValueType;
    value?: InputNumberValueType;
    prefixCls?: string;
    upNode?: React.ReactNode;
    downNode?: React.ReactNode;
    min?: InputNumberValueType;
    max?: InputNumberValueType;
    step?: InputNumberValueType;
    precision?: number;
    decimalSeparator?: string;
    keyboard?: boolean;
    formatter?: (value: InputNumberValueType | undefined) => string;
    parser?: (disPlayValue: string) => string;
    onStep?: (value: InputNumberValueType, type: 'up' | 'down') => void;
    onChange?: (value: InputNumberValueType) => void;
    onInput?: (value: InputNumberValueType) => void;
}
declare const InputNumber: React.ForwardRefExoticComponent<InputNumberProps & React.RefAttributes<HTMLInputElement>>;
export default InputNumber;

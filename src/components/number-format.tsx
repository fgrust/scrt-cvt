import React from 'react';
import { NumericFormat } from 'react-number-format';

interface NumberFormatCustomProps {
  inputRef: (instance: any) => void;
  onChange: (e: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumberFormatCustom = (props: NumberFormatCustomProps) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({ target: { name: 'amount', value: values.value } });
      }}
    />
  );
};

export default NumberFormatCustom;

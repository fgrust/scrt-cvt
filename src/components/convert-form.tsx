import React, { useEffect, useState, useCallback } from 'react';
import {
  Card,
  Box,
  Typography,
  Grid,
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormControl,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
import {
  coinConvert,
  getNativeCoinBalance,
  onAccountAvailable,
  onAccountChange,
} from '@stakeordie/griptape.js';

import NumberFormat from './number-format';

const ConvertForm = () => {
  const [scrtBalance, setScrtBalance] = useState('0');
  const [sScrtBalance, setSScrtBalance] = useState('0');
  const [toWrap, setToWrap] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [amount, setAmount] = useState();

  useEffect(() => {
    const removeOnAccountChange = onAccountAvailable(() => {
      getBalance();
    });

    return () => {
      removeOnAccountChange();
    };
  }, []);

  const handleInput = useCallback(
    (e: any) => {
      const value = Number(e.target.value);
      if (!Number.isNaN(value)) {
        setAmount(e.target.value);
      }
    },
    [amount]
  );

  const handleConvert = useCallback(() => {
    setIsProcessing(true);
  }, []);

  async function getBalance() {
    let nativeBalance = await getNativeCoinBalance();
    nativeBalance = coinConvert(nativeBalance, 6, 'human');
    setScrtBalance(nativeBalance);
  }

  return (
    <div
      style={{
        marginTop: 300,
      }}
    >
      <Card
        style={{
          padding: '24px 24px',
          borderRadius: 20,
          width: 500,
          margin: '40px auto 0',
          backgroundColor: 'black',
        }}
      >
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: toWrap ? 'row' : 'row-reverse',
          }}
        >
          <Typography variant="h5">SCRT {`(${scrtBalance})`}</Typography>
          <IconButton aria-label="switch" onClick={() => setToWrap(!toWrap)}>
            <ArrowForward />
          </IconButton>
          <Typography variant="h5">sSCRT {`(${sScrtBalance})`}</Typography>
        </Box>
        <FormControl fullWidth variant="outlined" style={{ padding: 24 }}>
          <OutlinedInput
            endAdornment={
              <InputAdornment position="end">
                {toWrap ? 'SCRT' : 'sSCRT'}
              </InputAdornment>
            }
            style={{ marginBottom: 20 }}
            value={amount}
            onChange={handleInput}
            inputComponent={NumberFormat as any}
          />
          <Box style={{ position: 'relative' }}>
            <Button
              color="primary"
              variant="contained"
              size="medium"
              fullWidth
              onClick={handleConvert}
              disabled={isProcessing}
            >
              Convert
            </Button>
            {isProcessing && (
              <CircularProgress
                size={24}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: -12,
                  marginLeft: -12,
                }}
              />
            )}
          </Box>
        </FormControl>
      </Card>
    </div>
  );
};

export default ConvertForm;

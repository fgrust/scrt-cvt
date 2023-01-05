import React, { useState, useCallback } from 'react';
import {
  Card,
  Box,
  Typography,
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormControl,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';

import NumberFormat from './number-format';
import { useAccount } from '../context/account-provider';

const ConvertForm = () => {
  const {
    nativeBalance,
    wrappedBalance,
    viewingKey,
    isProcessing,
    deposit,
    redeem,
    createViewingKey,
  } = useAccount();
  const [toWrap, setToWrap] = useState(true);
  const [amount, setAmount] = useState(0);

  const handleInput = (e: any) => {
    setAmount(Number(e.target.value));
  };

  const handleConvert = useCallback(async () => {
    if (amount === 0) return;

    try {
      if (toWrap) {
        await deposit(amount);
      } else {
        await redeem(amount);
      }
      setAmount(0);
    } catch (e) {
      console.log(e);
    }
  }, [amount, toWrap]);

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
          <Typography variant="h5">SCRT {`(${nativeBalance})`}</Typography>
          <IconButton aria-label="switch" onClick={() => setToWrap(!toWrap)}>
            <ArrowForward />
          </IconButton>
          <Typography variant="h5">sSCRT {`(${wrappedBalance})`}</Typography>
        </Box>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 24px',
          }}
        >
          {viewingKey ? (
            <Typography>
              {`Your viewing key is ${viewingKey.substring(
                0,
                15
              )}...${viewingKey.substring(viewingKey.length - 4)}`}
            </Typography>
          ) : (
            <>
              <Typography style={{ marginRight: 10 }}>
                You do not have viewing key.
              </Typography>
              <Box style={{ position: 'relative' }}>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  disabled={isProcessing}
                  onClick={createViewingKey}
                >
                  Create
                </Button>
                {isProcessing && (
                  <CircularProgress
                    size={20}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: -10,
                      marginLeft: -10,
                    }}
                  />
                )}
              </Box>
            </>
          )}
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

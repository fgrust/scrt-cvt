import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import {
  bootstrap,
  getAddress,
  onAccountAvailable,
  shutdown,
} from '@stakeordie/griptape.js';

import ConnectButton from './connect-button';

const Header = () => {
  const [address, setAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const removeOnAccountAvailable = onAccountAvailable(() => {
      setAddress(getAddress() || '');
      setIsConnected(true);
    });

    return () => {
      removeOnAccountAvailable();
    };
  }, []);

  return (
    <AppBar style={{ backgroundColor: 'transparent' }}>
      <Toolbar>
        <Typography variant="h5" style={{ flexGrow: 1 }}>
          SCRT Converter
        </Typography>
        <ConnectButton
          connect={bootstrap}
          disconnect={shutdown}
          connected={isConnected}
          address={address}
          walletIcon={
            'https://wallet.keplr.app/keplr-brand-assets/keplr-logo.svg'
          }
          label="Connect"
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;

import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { bootstrap, shutdown } from '@stakeordie/griptape.js';

import ConnectButton from './connect-button';
import { useAccount } from '../context/account-provider';

const Header = () => {
  const { address, isConnected } = useAccount();

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

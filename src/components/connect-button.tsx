import React from 'react';
import { Button, makeStyles, Tooltip } from '@material-ui/core';
import { LinkOff } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'flex',
    margin: `${theme.spacing(2)}px auto`,
    width: 300,
    height: 35,
    textTransform: 'none',
  },
  icon: {
    height: 24,
    width: 24,
  },
}));

const ConnectButton = ({
  connect,
  disconnect,
  connected,
  address,
  walletIcon,
  label,
}: {
  connect(): any;
  disconnect(): any;
  connected: boolean;
  address: string;
  walletIcon?: string;
  label: string | null;
}) => {
  const classes = useStyles();
  return connected ? (
    <Tooltip title={address}>
      <Button
        color="primary"
        variant="contained"
        size="medium"
        onClick={disconnect}
        className={classes.button}
        startIcon={
          walletIcon ? (
            <img className={classes.icon} src={walletIcon} alt="Wallet" />
          ) : (
            <LinkOff />
          )
        }
      >
        {address.substring(0, 15)}...{address.substring(address.length - 4)}
      </Button>
    </Tooltip>
  ) : (
    <Button
      color="primary"
      variant="contained"
      size="medium"
      onClick={connect}
      className={classes.button}
    >
      {label}
    </Button>
  );
};

export default ConnectButton;

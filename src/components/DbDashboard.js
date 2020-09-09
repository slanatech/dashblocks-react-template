import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const DbDashboard = ({ dbspec, dbdata, dark, themeClass, logLevel, onDbEvent }) => {
  const classes = useStyles();
  const ref = React.useRef();

  React.useLayoutEffect(() => {
    const { current } = ref;
    const handleDbEvent = (customEvent) => {
      if( Array.isArray(customEvent.detail) && customEvent.detail.length>0 ) {
        onDbEvent(customEvent.detail[0]);
      }
    };

    current.dbspec = dbspec;
    current.dbdata = dbdata;
    current.dark = dark;

    current.addEventListener('db-event', handleDbEvent);
    return () => current.removeEventListener('db-event', handleDbEvent);
  }, [ref]);

  return (
    <db-dashboard className={classes.root} ref={ref} />
  );
};

DbDashboard.propTypes = {
  dbspec: PropTypes.object,
  dbdata: PropTypes.object,
  dark: PropTypes.bool,
  themeClass: PropTypes.string,
  logLevel: PropTypes.string,
  onDbEvent: PropTypes.func
};

export default DbDashboard;

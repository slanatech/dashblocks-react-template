import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const [customers] = useState(data);

  const ref = React.useRef();

  const dbspec = {
    layout: {
      type: 'grid'
    },
    widgets: [
      {
        id: 'w1',
        type: 'DbDygraphs',
        cspan: 16,
        height: 250,
        properties: {
          options: {
            stackedGraph: true
          }
        }
      },
      {
        id: 'w2',
        type: 'DbDygraphsBar',
        cspan: 12,
        height: 250,
        properties: {
          options: {
            stackedGraph: true
          }
        }
      },
      {
        id: 'w4',
        type: 'DbChartjsPie',
        cspan: 4,
        height: 250
      }
    ]
  };

  React.useLayoutEffect(() => {
    const { current } = ref;

    let dbdata = {};

    let dthData = [];
    let sTS = Date.now() - 100 * 3600 * 1000;
    for (let i = 0; i < 100; i++) {
      let cTs = sTS + i * 3600 * 1000;
      let d = new Date(cTs);
      let r = Math.random();
      dthData.push([d, r, r + 0.5]);
    }

    dbdata['w1'] = {
      data: dthData
    };

    dbdata['w2'] = {
      data: dthData
    };

    dbdata['w4'] = {
      data: {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            label: 'Data One',
            data: [50, 10, 67, 45]
          }
        ]
      }
    };

    current.dbspec = dbspec;
    current.dbdata = dbdata;
    current.dark = true;
    console.log(`useLayoutEffect called !!! => ${JSON.stringify(dbspec)}`);
  }, [ref]);

  // <!--<Results customers={customers} />-->
  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <db-dashboard ref={ref} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;

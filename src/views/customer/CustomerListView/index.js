import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import DbDashboard from 'src/components/DbDashboard';

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

  const dbspecInitial = {
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

  const [dbspec, setDbSpec] = useState(dbspecInitial);

  let dthData = [];
  let sTS = Date.now() - 100 * 3600 * 1000;
  for (let i = 0; i < 100; i++) {
    let cTs = sTS + i * 3600 * 1000;
    let d = new Date(cTs);
    let r = Math.random();
    dthData.push([d, r, r + 0.5]);
  }

  let dbDataInitial = {
    w1: { data: dthData },
    w2: { data: dthData },
    w4: {
      data: {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            label: 'Data One',
            data: [50, 10, 67, 45]
          }
        ]
      }
    }
  };

  const [dbdata, setDbData] = useState(dbDataInitial);

  const handleDbEvent = (event) => {
    console.log(`Got handleDbEvent: ${event.type}`);
    if(event.type === 'item-click') {
      let dthData2 = [];
      let sTS = Date.now() - 100 * 3600 * 1000;
      for (let i = 0; i < 100; i++) {
        let cTs = sTS + i * 3600 * 1000;
        let d = new Date(cTs);
        let r = Math.random();
        dthData2.push([d, r, r + 0.5]);
      }
      setDbData(Object.assign(dbdata, {w2: { data: dthData2}} ));
    }
  };

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <DbDashboard dbspec={dbspec} dbdata={dbdata} onDbEvent={handleDbEvent} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;

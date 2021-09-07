import React from 'react';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import CountUp from 'react-countup';
import './Cards.css';

export default function Cards({
  data: { confirmed, recovered, deaths, lastUpdate },
}) {
  if (!confirmed) {
    return <Typography variant="body2">Loading...</Typography>;
  }
  return (
    <div className="card-container">
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={3} >
          <Card className="infected">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active
              </Typography>
              <Typography variant="h5">
                <CountUp
                  start={0}
                  end={confirmed.value}
                  duration={2.5}
                  separator=","
                />
              </Typography>
              <Typography color="textSecondary">
                {new Date(lastUpdate).toDateString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className="recovered">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Recovered
              </Typography>
              <Typography variant="h5">
                <CountUp
                  start={0}
                  end={recovered.value}
                  duration={2.5}
                  separator=","
                />
              </Typography>
              <Typography color="textSecondary">
                {new Date(lastUpdate).toDateString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className="deaths">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Fatalities
              </Typography>
              <Typography variant="h5">
                <CountUp
                  start={0}
                  end={deaths.value}
                  duration={2.5}
                  separator=","
                />
              </Typography>
              <Typography color="textSecondary">
                {new Date(lastUpdate).toDateString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

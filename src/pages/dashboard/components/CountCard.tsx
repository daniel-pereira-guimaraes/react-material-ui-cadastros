import { Grid, Card, CardContent, Typography, Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

type TGetCount = () => Promise<number | string>;

interface ICountCardProps {
  title: string;
  getCount: TGetCount;
}

export const CountCard: React.FC<ICountCardProps> = ({ title, getCount }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState<number | string>('');

  useEffect(() => {
    setIsLoading(true);
    getCount().then((c) => {
      setIsLoading(false);
      setCount(c);
    });
  }, [getCount]);

  return (
    <Grid item xs={12} md={6} lg={4} xl={3}>
      <Card>
        <CardContent>
          <Typography variant="h5" align="center">
            {title}
          </Typography>
          <Box padding={6} display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h1">
              {isLoading ? <CircularProgress /> : count}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};


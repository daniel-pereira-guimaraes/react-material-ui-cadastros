import React from "react";
import { Box } from '@mui/system';
import { Typography, useTheme, IconButton, Icon, useMediaQuery } from '@mui/material';
import { useDrawerContext } from "../contexts";

interface IBasePageLayoutProps {
  children: React.ReactNode;
  title: string;  
}

export const BasePageLayout: React.FC<IBasePageLayoutProps> = ({ children, title }) => {

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1} >

      <Box padding={1} height={theme.spacing(12)} display="flex" alignItems="center" gap={1}>

        {smDown && 
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        }

        <Typography variant="h5" component="h2">
          {title}
        </Typography>

      </Box>

      <Box>
        Barra de ferramentas
      </Box>

      <Box>
        {children}
      </Box>
    </Box>
  );
};
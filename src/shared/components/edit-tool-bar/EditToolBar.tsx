import React from "react";
import { Box, Paper, useTheme, Button, Icon, Divider } from '@mui/material';

export const EditToolBar: React.FC = () => {

  const theme = useTheme();

  return (
    <Box 
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper} 
    >
          
      <Button 
        variant="contained" 
        color="primary" 
        disableElevation
        startIcon={<Icon>save</Icon>}
        onClick={undefined}
      >
        Salvar
      </Button>

      <Button 
        variant="outlined" 
        color="primary" 
        disableElevation
        startIcon={<Icon>save</Icon>}
        onClick={undefined}
      >
        Salvar e voltar
      </Button>

      <Button 
        variant="outlined" 
        color="primary" 
        disableElevation
        startIcon={<Icon>delete</Icon>}
        onClick={undefined}
      >
        Apagar
      </Button>

      <Button 
        variant="outlined" 
        color="primary" 
        disableElevation
        startIcon={<Icon>add</Icon>}
        onClick={undefined}
      >
        Novo
      </Button>

      <Divider variant="middle" orientation="vertical" />

      <Button 
        variant="outlined" 
        color="primary" 
        disableElevation
        startIcon={<Icon>arrow_back</Icon>}
        onClick={undefined}
      >
        Voltar
      </Button>

    </Box>

  );
};
import React from "react";
import { Box, Paper, useTheme, Button, Icon, Divider } from '@mui/material';

interface IEditToolBarProps {
  newButtonText?: string;
  saveButtonVisible?: boolean;
  saveAndBackButtonVisible?: boolean;
  deleteButtonVisible?: boolean;
  newButtonVisible?: boolean;
  backButtonVisible?: boolean;
  saveButtonOnClick?: () => void;
  saveAndBackButtonOnClick?: () => void;
  deleteButtonOnClick?: () => void;
  newButtonOnClick?: () => void;
  backButtonOnClick?: () => void;
}

export const EditToolBar: React.FC<IEditToolBarProps> = ({
  newButtonText = 'Novo',
  saveButtonVisible = true,
  saveAndBackButtonVisible = false,
  deleteButtonVisible = true,
  newButtonVisible = true,
  backButtonVisible = true,
  saveButtonOnClick,
  saveAndBackButtonOnClick,
  deleteButtonOnClick,
  newButtonOnClick,
  backButtonOnClick
}) => {

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
      component={Paper}>
         
      {saveButtonVisible &&
        <Button 
          variant="contained" 
          color="primary" 
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={saveButtonOnClick}>
            Salvar
        </Button>
      }

      {saveAndBackButtonVisible &&
        <Button 
          variant="outlined" 
          color="primary" 
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={saveAndBackButtonOnClick}>
            Salvar e voltar
        </Button>
      }

      {deleteButtonVisible && 
        <Button 
          variant="outlined" 
          color="primary" 
          disableElevation
          startIcon={<Icon>delete</Icon>}
          onClick={deleteButtonOnClick}>
            Apagar
        </Button>
      }

      {newButtonVisible && 
        <Button 
          variant="outlined" 
          color="primary" 
          disableElevation
          startIcon={<Icon>add</Icon>}
          onClick={newButtonOnClick}>
            {newButtonText}
        </Button>
      }

      {backButtonVisible && 
        <Divider variant="middle" orientation="vertical" />
      }

      {backButtonVisible &&
        <Button 
          variant="outlined" 
          color="primary" 
          disableElevation
          startIcon={<Icon>arrow_back</Icon>}
          onClick={backButtonOnClick}>
            Voltar
        </Button>
      }

    </Box>

  );
};
import React from "react";
import { Box, Paper, useTheme, Button, Icon, Divider, Skeleton } from '@mui/material';

interface IEditToolBarProps {
  newButtonText?: string;

  saveButtonVisible?: boolean;
  saveAndBackButtonVisible?: boolean;
  deleteButtonVisible?: boolean;
  newButtonVisible?: boolean;
  backButtonVisible?: boolean;

  saveButtonLoading?: boolean;
  saveAndBackButtonLoading?: boolean;
  deleteButtonLoading?: boolean;
  newButtonLoading?: boolean;
  backButtonLoading?: boolean;
  
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

  saveButtonLoading = false,
  saveAndBackButtonLoading = false,
  deleteButtonLoading = false,
  newButtonLoading = false,
  backButtonLoading = false,
  
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
         
      {saveButtonVisible && !saveButtonLoading &&
        <Button 
          variant="contained" 
          color="primary" 
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={saveButtonOnClick}>
            Salvar
        </Button>
      }
      {saveButtonLoading && 
        <Skeleton width={110} height={60} />
      }

      {saveAndBackButtonVisible && !saveAndBackButtonLoading &&
        <Button 
          variant="outlined" 
          color="primary" 
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={saveAndBackButtonOnClick}>
            Salvar e voltar
        </Button>
      }
      {saveAndBackButtonLoading && 
        <Skeleton width={180} height={60} />
      }

      {deleteButtonVisible && !deleteButtonLoading &&
        <Button 
          variant="outlined" 
          color="primary" 
          disableElevation
          startIcon={<Icon>delete</Icon>}
          onClick={deleteButtonOnClick}>
            Apagar
        </Button>
      }
      {deleteButtonLoading && 
        <Skeleton width={110} height={60} />
      }

      {newButtonVisible && !newButtonLoading &&
        <Button 
          variant="outlined" 
          color="primary" 
          disableElevation
          startIcon={<Icon>add</Icon>}
          onClick={newButtonOnClick}>
            {newButtonText}
        </Button>
      }
      {newButtonLoading && 
        <Skeleton width={110} height={60} />
      }

      {backButtonVisible && !backButtonLoading &&
        <Divider variant="middle" orientation="vertical" />
      }
      {backButtonVisible && !backButtonLoading &&
        <Button 
          variant="outlined" 
          color="primary" 
          disableElevation
          startIcon={<Icon>arrow_back</Icon>}
          onClick={backButtonOnClick}>
            Voltar
        </Button>
      }
      {backButtonLoading && 
        <Skeleton width={110} height={60} />
      }

    </Box>

  );
};
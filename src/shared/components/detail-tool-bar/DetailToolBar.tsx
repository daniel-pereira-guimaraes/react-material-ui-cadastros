import React from "react";
import { Box, Paper, useTheme, Button, Icon, Divider, 
  Skeleton, Typography, useMediaQuery } from '@mui/material';
import { useNavigate } from "react-router-dom";

interface IDetailToolBarProps {
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

export const DetailToolBar: React.FC<IDetailToolBarProps> = ({
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

  const navigate = useNavigate();
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

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
            <Typography 
              variant="button" 
              whiteSpace="nowrap" 
              textOverflow="ellipsis" 
              overflow="hidden">
                Salvar
            </Typography>
        </Button>
      }
      {saveButtonLoading && 
        <Skeleton width={110} height={60} />
      }

      {saveAndBackButtonVisible && !saveAndBackButtonLoading && !lgDown &&
        <Button 
          variant="outlined" 
          color="primary" 
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={saveAndBackButtonOnClick}>
            <Typography 
              variant="button" 
              whiteSpace="nowrap" 
              textOverflow="ellipsis" 
              overflow="hidden">
                Salvar e voltar
            </Typography>
        </Button>
      }
      {saveAndBackButtonLoading && !lgDown &&
        <Skeleton width={180} height={60} />
      }

      {deleteButtonVisible && !deleteButtonLoading && !smDown &&
        <Button 
          variant="outlined" 
          color="primary" 
          disableElevation
          startIcon={<Icon>delete</Icon>}
          onClick={deleteButtonOnClick}>
            <Typography 
              variant="button" 
              whiteSpace="nowrap" 
              textOverflow="ellipsis" 
              overflow="hidden">
                Apagar
            </Typography>
        </Button>
      }
      {deleteButtonLoading && !smDown &&
        <Skeleton width={110} height={60} />
      }

      {newButtonVisible && !newButtonLoading && !mdDown &&
        <Button 
          variant="outlined" 
          color="primary" 
          disableElevation
          startIcon={<Icon>add</Icon>}
          onClick={newButtonOnClick}>
            <Typography 
              variant="button" 
              whiteSpace="nowrap" 
              textOverflow="ellipsis" 
              overflow="hidden">
                {newButtonText}
            </Typography>
        </Button>
      }
      {newButtonLoading && !mdDown &&
        <Skeleton width={110} height={60} />
      }

      { backButtonVisible && 
        (saveButtonVisible || saveAndBackButtonVisible ||  deleteButtonVisible || newButtonVisible) && 
        <Divider variant="middle" orientation="vertical" />
      }

      {backButtonVisible && !backButtonLoading &&
        <Button 
          variant="outlined" 
          color="primary" 
          disableElevation
          startIcon={<Icon>arrow_back</Icon>}
          onClick={backButtonOnClick || (() => { navigate(-1)})}>
            <Typography 
              variant="button" 
              whiteSpace="nowrap" 
              textOverflow="ellipsis" 
              overflow="hidden">
                Voltar
            </Typography>
        </Button>
      }
      {backButtonLoading && 
        <Skeleton width={110} height={60} />
      }

    </Box>

  );
};
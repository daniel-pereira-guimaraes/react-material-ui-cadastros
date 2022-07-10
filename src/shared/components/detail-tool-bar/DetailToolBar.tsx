import React from "react";
import { Box, Paper, useTheme, Button, Icon, Divider, 
  Skeleton, Typography, useMediaQuery } from '@mui/material';
import { useNavigate } from "react-router-dom";

interface IDetailToolBarProps {
  newButtonText?: string;

  saveButtonVisible?: boolean;
  saveAndCloseButtonVisible?: boolean;
  deleteButtonVisible?: boolean;
  newButtonVisible?: boolean;
  closeButtonVisible?: boolean;

  saveButtonLoading?: boolean;
  saveAndCloseButtonLoading?: boolean;
  deleteButtonLoading?: boolean;
  newButtonLoading?: boolean;
  closeButtonLoading?: boolean;
  
  saveButtonOnClick?: () => void;
  saveAndCloseButtonOnClick?: () => void;
  deleteButtonOnClick?: () => void;
  newButtonOnClick?: () => void;
  closeButtonOnClick?: () => void;
}

export const DetailToolBar: React.FC<IDetailToolBarProps> = ({
  newButtonText = 'Novo',
  
  saveButtonVisible = true,
  saveAndCloseButtonVisible = false,
  deleteButtonVisible = true,
  newButtonVisible = true,
  closeButtonVisible = true,

  saveButtonLoading = false,
  saveAndCloseButtonLoading = false,
  deleteButtonLoading = false,
  newButtonLoading = false,
  closeButtonLoading = false,
  
  saveButtonOnClick,
  saveAndCloseButtonOnClick,
  deleteButtonOnClick,
  newButtonOnClick,
  closeButtonOnClick
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

      {saveAndCloseButtonVisible && !saveAndCloseButtonLoading && !lgDown &&
        <Button 
          variant="outlined" 
          color="primary" 
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={saveAndCloseButtonOnClick}>
            <Typography 
              variant="button" 
              whiteSpace="nowrap" 
              textOverflow="ellipsis" 
              overflow="hidden">
                Salvar e fechar
            </Typography>
        </Button>
      }
      {saveAndCloseButtonLoading && !lgDown &&
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

      { closeButtonVisible && 
        (saveButtonVisible || saveAndCloseButtonVisible ||  deleteButtonVisible || newButtonVisible) && 
        <Divider variant="middle" orientation="vertical" />
      }

      {closeButtonVisible && !closeButtonLoading &&
        <Button 
          variant="outlined" 
          color="primary" 
          disableElevation
          startIcon={<Icon>arrow_back</Icon>}
          onClick={closeButtonOnClick || (() => { navigate(-1)})}>
            <Typography 
              variant="button" 
              whiteSpace="nowrap" 
              textOverflow="ellipsis" 
              overflow="hidden">
                Fechar
            </Typography>
        </Button>
      }
      {closeButtonLoading && 
        <Skeleton width={110} height={60} />
      }

    </Box>

  );
};
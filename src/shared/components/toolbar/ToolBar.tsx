import React from "react";
import { Box, Paper, TextField, Button, useTheme, Icon } from "@mui/material";

interface IToolBarProps {
  searchVisible?: boolean;
  searchText?: string;
  searchOnChange?: (text: string) => void;
  newButtonVisible?: boolean;
  newButtonText?: string;
  newButtonOnClick?: () => void;
}

export const ToolBar: React.FC<IToolBarProps> = ({
  searchVisible = false, 
  searchText = '', 
  searchOnChange,
  newButtonVisible = true,
  newButtonText = 'Novo',
  newButtonOnClick
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
      component={Paper} 
    >
      {searchVisible &&
        <TextField 
          size="small"
          placeholder="Pesquisar"
          value={searchText}
          onChange={(e) => searchOnChange?.(e.target.value)}
        />
      }

      <Box flex={1} display="flex" justifyContent="end">
        
        {newButtonVisible &&
          <Button 
            variant="contained" 
            color="primary" 
            disableElevation
            endIcon={<Icon>add</Icon>}
            onClick={newButtonOnClick}
          >
            {newButtonText}
          </Button>
        }

      </Box>

    </Box>
  );
};
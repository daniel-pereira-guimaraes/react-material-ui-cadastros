import { Drawer, useTheme, Avatar, Divider, List, ListItemButton, ListItemIcon, ListItemText, Icon, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { useAppThemeContext, useAuthContext, useDrawerContext } from '../../contexts';
import { useNavigate, useResolvedPath, useMatch } from 'react-router-dom';

interface IMenuLateralProps {
  children: React.ReactNode;
};

interface IListItemLinkProps {
  icon: string;
  label: string;
  path: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ icon, label, path, onClick }) => {

  const navigate = useNavigate();
  const resolvedPath = useResolvedPath(path);
  const match = useMatch({path: resolvedPath.pathname, end: true });

  const handleClick = () => {
    navigate(path);
    onClick && onClick();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
    <ListItemIcon>
      <Icon>{icon}</Icon>
    </ListItemIcon>
    <ListItemText primary={label} />
  </ListItemButton>
  );
};

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { isDrawerOpen, drawerOptions, toggleDrawerOpen } = useDrawerContext();
  const { toggleTheme } = useAppThemeContext();
  const { logout } = useAuthContext();

  const handleItemClick = smDown ? toggleDrawerOpen : undefined;

  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
  
          <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
            <Avatar sx={{height: theme.spacing(12), width: theme.spacing(12)}} src="" />
          </Box>
  
          <Divider />

          <Box flex={1}>
            <List component='nav'>
              {drawerOptions.map((option) => (
                  <ListItemLink 
                    key={option.path}
                    icon={option.icon}
                    label={option.label}
                    path={option.path}
                    onClick={handleItemClick} />
                )
              )};
            </List>
          </Box>

          <Box>
            <List>
              
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>dark_mode</Icon>
                </ListItemIcon>
                <ListItemText primary="Trocar tema" />  
              </ListItemButton>

              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <Icon>logout</Icon>
                </ListItemIcon>
                <ListItemText primary="Sair" />  
              </ListItemButton>

            </List>
          </Box>

        </Box>

      </Drawer>
      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
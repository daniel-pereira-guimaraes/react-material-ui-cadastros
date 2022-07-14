import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AppLogin, MenuLateral } from './shared/components';
import { AppThemeProvider, AuthProvider, DrawerProvider } from './shared/contexts';
//import './shared/forms/YupLocaleBr';

export const App = () => {

  return (
    <AuthProvider>
      <AppThemeProvider>
        <AppLogin>
          <DrawerProvider>
            <BrowserRouter>
              <MenuLateral>
                <AppRoutes />
              </MenuLateral>
            </BrowserRouter>
          </DrawerProvider>
        </AppLogin>
      </AppThemeProvider>
    </AuthProvider>      
  );
};
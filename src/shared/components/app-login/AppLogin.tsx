import { Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useAuthContext } from "../../contexts";
import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required()
});

interface ILoginProps {
  children: React.ReactNode;
}

export const AppLogin: React.FC<ILoginProps> = ({ children }) => {

  // Se estivesse usando unform, este componente ficaria mais simples!

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { isAuthenticated, login } = useAuthContext();

  const handleButtonClick = () => {
    setIsLoading(true);
    loginSchema
      .validate({ email, password }, { abortEarly: false })
      .then(dadosValidados => {
        login(dadosValidados.email, dadosValidados.password)
          .then(() => {
            setIsLoading(false); 
            setEmail('');
            setPassword('');
          })
          .catch(() => setIsLoading(false));
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);
        errors.inner.forEach(error => {
          if (error.path === 'email')
            setEmailError(error.message);
          else if (error.path === 'password')
            setPasswordError(error.message)
         });
      });
  };

  if (isAuthenticated)
    return <>{children}</>

  return (
    <Box width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center">
      <Card>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2} width={250}>
            <Typography variant="h6" align="center">
              Identifique-se
            </Typography>
            <TextField
              fullWidth
              label="E=mail"
              value={email}
              error={!!emailError}
              helperText={emailError}
              disabled={isLoading}
              onChange={e => {
                setEmail(e.target.value);
                setEmailError('')
              }}
            />
            <TextField
              fullWidth
              label="Senha"
              type="password"
              value={password}
              error={!!passwordError}
              helperText={passwordError}
              disabled={isLoading}
              onChange={e => {
                setPassword(e.target.value);
                setPasswordError('')
              }}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box width="100%" display="fex" justifyContent="center">
            <Button 
              variant="contained" 
              disabled={isLoading}
              onClick={handleButtonClick} 
              endIcon={isLoading && <CircularProgress variant="indeterminate" color="inherit" size={20} />}
            >
              Entrar
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );

}
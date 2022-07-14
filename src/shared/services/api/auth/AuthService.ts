import { Api } from "../axios-config";

interface IAuth {
  accessToken: string;
}

const auth = async (email: string, password: string): Promise<IAuth | Error> => {
  try {
    /* Segundo o professor, com backend real deve-se usar o método POST, passando as
       credencias no corpo da requisição, mas aqui usamos GET porque estamos usando
       json-server para simular um backend. 
    */
    const { data } = await Api.get('/auth', { data: { email, password } });
    return data || new Error('Retorno inválido ao fazer login.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string}).message || 'Erro ao fazer login.');

  }
}

export const AuthService = {

};
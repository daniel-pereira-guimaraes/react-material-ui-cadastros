import { AxiosResponse } from "axios";

export const responseInterceptor = (response: AxiosResponse) => {
  // Se necessário, pode ser adicionado algum tratamento padrão à resposta.
  return response;
}
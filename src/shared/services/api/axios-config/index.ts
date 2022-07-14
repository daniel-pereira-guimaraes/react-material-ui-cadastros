import axios from 'axios';
import { Environment } from '../../../environment';
import { errorInterceptor, responseInterceptor } from './interceptors';

const Api = axios.create({
  baseURL: Environment.URL_BASE,
  // Em uma aplicação real, o token de acesso seria enviado no cabeçalho de cada requisição, como abaixo.
  // headers: { // Será que precisa mesmo deste JSON.parse?
    // Authorization: `Bearer ${JSON.parse(localStorage.getItem(Environment.LOCAL_STORAGE__ACCESS_TOKEN) || '')}`

});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
);

export { Api };
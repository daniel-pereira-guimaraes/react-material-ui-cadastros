import { Environment } from "../../../environment";
import { Api } from "../axios-config";

interface IPessoa {
  id: number;
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}

type TPessoas = {
  data: IPessoa[];
  totalCount: number;
}

const getAll = async(page = 1, filter = ''): Promise<TPessoas | Error> => {
  try {
    const urlRelativa = `/pessoas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like${filter}`;
    const { data, headers } = await Api.get(urlRelativa);

    if (data) 
      return { 
        data, 
        totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS)
      };

    return new Error(Environment.NENHUM_REGISTRO);

  } catch(error) {
    console.error(error);
    return new Error((error as {message: string}).message || Environment.ERRO_ACESSO_DADOS);
  }
};

const getById = async(id: number): Promise<IPessoa | Error> => {
  try {
    const { data } = await Api.get(`/pessoas/${id}`);
    if (data) 
      return data;
    return new Error(Environment.NENHUM_REGISTRO);
  } catch(error) {
    console.error(error);
    return new Error((error as {message: string}).message || Environment.ERRO_ACESSO_DADOS);
  }
};

const create = async(dados: Omit<IPessoa, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IPessoa>('/pessoas', dados);
    if (data) 
      return data.id;
    return new Error(Environment.ERRO_ACESSO_DADOS);
  } catch(error) {
    console.error(error);
    return new Error((error as {message: string}).message || Environment.ERRO_ACESSO_DADOS);
  }
};

const updateById = async(dados: IPessoa): Promise<void | Error> => {
  try {
    await Api.put(`/pessoas/${dados.id}`, dados);
  } catch(error) {
    console.error(error);
    return new Error((error as {message: string}).message || Environment.ERRO_ACESSO_DADOS);
  }
};

const deleteById = async(id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/pessoas/${id}`);
  } catch(error) {
    console.error(error);
    return new Error((error as {message: string}).message || Environment.ERRO_ACESSO_DADOS);
  }
};

export const PessoasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById  
}
import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface ICidade {
  id?: number | null;
  nome: string;
  ddd: string;
  codigoIBGE: string;
}

export type TCidades = ICidade[];

type TCidadesResult = {
  data: TCidades;
  totalCount: number;
}

const getAll = async(page = 1, filter = ''): Promise<TCidadesResult | Error> => {
  try {
    //await new Promise(resolve => setTimeout(resolve, 3000));
    const urlRelativa = `/cidades?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
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

const getById = async (id: number): Promise<ICidade | Error> => {
  try {
    //await new Promise(resolve => setTimeout(resolve, 3000));
    const { data } = await Api.get(`/cidades/${id}`);
    if (data) 
      return data;
    return new Error(Environment.NENHUM_REGISTRO);
  } catch(error) {
    console.error(error);
    return new Error((error as {message: string}).message || Environment.ERRO_ACESSO_DADOS);
  }
};

const create = async (dados: Omit<ICidade, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<ICidade>('/cidades', dados);
    if (data && data.id) 
      return data.id;
    return new Error(Environment.ERRO_ACESSO_DADOS);
  } catch(error) {
    console.error(error);
    return new Error((error as {message: string}).message || Environment.ERRO_ACESSO_DADOS);
  }
};

const updateById = async (dados: ICidade): Promise<void | Error> => {
  try {
    await Api.put(`/cidades/${dados.id}`, dados);
  } catch(error) {
    console.error(error);
    return new Error((error as {message: string}).message || Environment.ERRO_ACESSO_DADOS);
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/cidades/${id}`);
  } catch(error) {
    console.error(error);
    return new Error((error as {message: string}).message || Environment.ERRO_ACESSO_DADOS);
  }
};

export const CidadesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById  
}
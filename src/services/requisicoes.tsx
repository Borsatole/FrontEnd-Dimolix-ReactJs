import { api } from "./api";

export async function requisicaoGet(rota: string) {
  try {
    return await api.get(rota);
  } catch (error: any) {
    return error.response;
  }
}

export async function requisicaoPost(rota: string, dados: any) {
  try {
    return await api.post(rota, dados);
  } catch (error: any) {
    return error.response;
  }
}

export async function requisicaoPut(rota: string, dados: any) {
  try {
    return await api.put(rota, dados);
  } catch (error: any) {
    return error.response;
  }
}

export async function requisicaoDelete(rota: string) {
  try {
    return await api.delete(rota);
  } catch (error: any) {
    return error.response;
  }
}

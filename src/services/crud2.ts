import { requisicaoDelete, requisicaoGet, requisicaoPost, requisicaoPut } from "@services/requisicoes";
import Alerta from "@components/comum/alertas";
import { Confirm } from "@components/comum/alertas";


export interface BaseRegistro {
  id?: number | string;
  nome?: string;
  [key: string]: any;
}

interface Read {
  endpoint: string;
  queryFiltro?: string;
  pagina?: number;
  limitePorPagina?: number;

  setRegistros: React.Dispatch<React.SetStateAction<any[]>>;
  setData?: React.Dispatch<React.SetStateAction<any[]>>;
  setTotalResultados?: React.Dispatch<React.SetStateAction<number>>;
  setTotalPaginas?: React.Dispatch<React.SetStateAction<number>>;
  setLoadingSpiner?: React.Dispatch<React.SetStateAction<boolean>>;
  setRelistar?: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

export async function Read({
  endpoint,
  queryFiltro = "",
  pagina,
  limitePorPagina,
  setRegistros,
  setData,
  setTotalResultados,
  setTotalPaginas,
  setLoadingSpiner,
  setRelistar,
  setLoading,
}: Read) {


  setLoadingSpiner?.(true);
  // setLoading?.(true);

  return requisicaoGet(
    `${endpoint}?${queryFiltro}${pagina ? `&pagina=${pagina}` : ""}${limitePorPagina ? `&limite=${limitePorPagina}` : ""}`
  )
    .then((response) => {
      if (response?.data?.success) {
        // console.log("Read response data:", response.data);
        setRegistros(response.data.registros);
        setData?.(response.data);

        if(response.data.paginacao){
          setTotalResultados?.(response.data.paginacao.total);
          setTotalPaginas?.(response.data.paginacao.ultimaPagina);
        }
        
        
      }
    })
    .finally(() => {
      setLoadingSpiner?.(false);
      setRelistar?.(false);
    });
}

interface Create<T extends BaseRegistro> {
    payload: T | FormData;
    endpoint: string;
    antesDeExecutar?: () => void;
    depoisDeExecutar?: () => void;
    registros?: T[];
    setRegistros?: React.Dispatch<React.SetStateAction<T[]>>;
}

export function Create<T extends BaseRegistro>({
  payload,
  antesDeExecutar,
  depoisDeExecutar,
  registros,
  setRegistros,
  endpoint,
}: Create<T>) {

    function atualizarLista(novoRegistro: T) {
    setRegistros?.((prev) => [...(prev ?? []), novoRegistro]);
    }

    if (!payload) return;
    antesDeExecutar?.();

    requisicaoPost(endpoint, payload)
        .then((response) => {
        const msg = response?.data?.message ?? "Erro ao criar a requisição!";

        if (response?.data?.success) {
            // console.log(response?.data);
            
            Alerta("toast", "success", msg);


            {registros && setRegistros && atualizarLista(response?.data?.registro)};
        }
        depoisDeExecutar?.();

        

        })
        .catch((error) => {
        Alerta("toast", "error", `${error.response.data.message}`);
        })
}

export function Update<T extends BaseRegistro>({
  payload,
  antesDeExecutar,
  depoisDeExecutar,
  registros,
  setRegistros,
  endpoint,
}: Create<T>) {

  function atualizarLista(novoRegistro: T) {
    setRegistros?.((prev) =>
      prev?.map((item) =>
        item.id === novoRegistro.id ? novoRegistro : item
      ) ?? []
    );
  }

  if (!payload) return;
  antesDeExecutar?.();

  requisicaoPut(endpoint, payload)
    .then((response) => {
      const msg = response?.data?.message ?? "Erro ao editar a requisição!";

      if (response?.data?.success) {
        Alerta("toast", "success", msg);

        if (registros && setRegistros) {
          atualizarLista(response.data.registro);
        }
      }

      depoisDeExecutar?.();
    })
    .catch((error) => {
      Alerta("toast", "error", `${error.response?.data?.message}`);
    });
}

interface Delete<T extends BaseRegistro> {
  registro?: T;
  registros?: T[];
  setRegistros?: React.Dispatch<React.SetStateAction<T[]>>;
  antesDeExecutar?: () => void,
  depoisDeExecutar?: () => void,
  endpoint: string;
  nomeRegistro?: string
}

export function Delete<T extends BaseRegistro>({
  registro,
  registros,
  setRegistros,
  antesDeExecutar,
  depoisDeExecutar,
  endpoint,
  nomeRegistro = "esse registro",
}: Delete<T>) {

  const executarDelete = async () => {
    antesDeExecutar?.();

    try {
      const response = await requisicaoDelete(endpoint);

      if (response?.data?.success) {
        Alerta("toast", "success", "Registro deletado com sucesso!");

        // Atualizar lista local (opcional)
        if (registros && setRegistros && registro?.id) {
          setRegistros(registros.filter((r) => r.id !== registro.id));
        }

        depoisDeExecutar?.();
      }

    } catch (error) {
      Alerta("toast", "error", "Não foi possível deletar o registro.");
    }
  };

  Confirm({
    text: `Tem certeza que deseja deletar ${nomeRegistro}?`,
    onConfirm: executarDelete,
    onCancel: () => {},
  });
}




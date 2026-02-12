import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { GrupoEstoque, ItemEstoque } from "@src/components/tipos";

interface EstoqueContextType {
  registros: any[];
  setRegistros: Dispatch<SetStateAction<any[]>>;
  relistar: boolean;
  setRelistar: Dispatch<SetStateAction<boolean>>;
  loadingSpiner: boolean;
  setLoadingSpiner: Dispatch<SetStateAction<boolean>>;
  selectedRegistro: any | null;
  setSelectedRegistro: Dispatch<SetStateAction<any | null>>;
  abrirModalNovoRegistro: boolean;
  setAbrirModalNovoRegistro: Dispatch<SetStateAction<boolean>>;
  abrirModalEditarRegistro: boolean;
  setAbrirModalEditarRegistro: Dispatch<SetStateAction<boolean>>;
  abrirModalDetalhesRegistro: boolean;
  setAbrirModalDetalhesRegistro: Dispatch<SetStateAction<boolean>>;

  abrirModalAgendamentos: boolean;
  setAbrirModalAgendamentos: Dispatch<SetStateAction<boolean>>;
}

const EstoqueContext = createContext<EstoqueContextType | undefined>(undefined);

export function EstoqueProvider({ children }: { children: ReactNode }) {
  const [registros, setRegistros] = useState<GrupoEstoque[]>([]);
  const [relistar, setRelistar] = useState(false);
  const [loadingSpiner, setLoadingSpiner] = useState(true);
  const [selectedRegistro, setSelectedRegistro] = useState<ItemEstoque | null>(
    null,
  );
  const [abrirModalNovoRegistro, setAbrirModalNovoRegistro] = useState(false);
  const [abrirModalEditarRegistro, setAbrirModalEditarRegistro] =
    useState(false);
  const [abrirModalDetalhesRegistro, setAbrirModalDetalhesRegistro] =
    useState(false);

  const [abrirModalAgendamentos, setAbrirModalAgendamentos] = useState(false);

  return (
    <EstoqueContext.Provider
      value={{
        registros,
        setRegistros,
        relistar,
        setRelistar,
        loadingSpiner,
        setLoadingSpiner,
        selectedRegistro,
        setSelectedRegistro,
        abrirModalNovoRegistro,
        setAbrirModalNovoRegistro,
        abrirModalEditarRegistro,
        setAbrirModalEditarRegistro,
        abrirModalDetalhesRegistro,
        setAbrirModalDetalhesRegistro,
        abrirModalAgendamentos,
        setAbrirModalAgendamentos,
      }}
    >
      {children}
    </EstoqueContext.Provider>
  );
}

export function useEstoque() {
  const context = useContext(EstoqueContext);
  if (!context)
    throw new Error("useClientes deve ser usado dentro de ClientesProvider");
  return context;
}

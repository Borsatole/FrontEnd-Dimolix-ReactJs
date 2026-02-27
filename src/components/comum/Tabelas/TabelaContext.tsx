import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface TabelaContextType {
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
}

const TabelaContext = createContext<TabelaContextType | undefined>(undefined);

export function TabelaProvider({ children }: { children: ReactNode }) {
  const [registros, setRegistros] = useState<any[]>([]);
  const [relistar, setRelistar] = useState(false);
  const [loadingSpiner, setLoadingSpiner] = useState(true);
  const [selectedRegistro, setSelectedRegistro] = useState<any | null>(null);
  const [abrirModalNovoRegistro, setAbrirModalNovoRegistro] = useState(false);
  const [abrirModalEditarRegistro, setAbrirModalEditarRegistro] =
    useState(false);
  const [abrirModalDetalhesRegistro, setAbrirModalDetalhesRegistro] =
    useState(false);

  return (
    <TabelaContext.Provider
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
      }}
    >
      {children}
    </TabelaContext.Provider>
  );
}

export function UseTabela() {
  const context = useContext(TabelaContext);
  if (!context) throw new Error("Context deve ser usado dentro de Provider");
  return context;
}

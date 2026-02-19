import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface FinanceiroContextType {
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

const FinanceiroContext = createContext<FinanceiroContextType | undefined>(
  undefined,
);

export function FinanceiroProvider({ children }: { children: ReactNode }) {
  const [registros, setRegistros] = useState<any[]>([]);
  const [relistar, setRelistar] = useState(true);
  const [loadingSpiner, setLoadingSpiner] = useState(true);
  const [selectedRegistro, setSelectedRegistro] = useState<any | null>(null);
  const [abrirModalNovoRegistro, setAbrirModalNovoRegistro] = useState(false);
  const [abrirModalEditarRegistro, setAbrirModalEditarRegistro] =
    useState(false);
  const [abrirModalDetalhesRegistro, setAbrirModalDetalhesRegistro] =
    useState(false);

  return (
    <FinanceiroContext.Provider
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
    </FinanceiroContext.Provider>
  );
}

export function useFinanceiro() {
  const context = useContext(FinanceiroContext);
  if (!context) throw new Error("Context deve ser usado dentro de Provider");
  return context;
}

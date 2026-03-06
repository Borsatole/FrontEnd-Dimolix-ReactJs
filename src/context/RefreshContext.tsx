import { createContext, useContext, useState } from "react";

type RefreshFn = () => Promise<void> | void;

interface RefreshContextType {
  refresh?: RefreshFn;
  setRefresh: (fn?: RefreshFn) => void;
}

const RefreshContext = createContext<RefreshContextType>({
  refresh: undefined,
  setRefresh: () => {},
});

export function RefreshProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ fn?: RefreshFn }>({});

  const setRefresh = (fn?: RefreshFn) => {
    setState({ fn }); // objeto wrapper — React não interpreta como lazy init
  };

  return (
    <RefreshContext.Provider value={{ refresh: state.fn, setRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
}

export function useRefresh() {
  return useContext(RefreshContext);
}

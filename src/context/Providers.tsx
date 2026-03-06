import { ReactNode } from "react";

import { ThemeProvider } from "./ThemeContext";
import { AuthProvider } from "./AuthContext";
import { MenuProvider } from "./MenuContext";
import { ClientesProvider } from "./ClientesContext";
import { EstoqueProvider } from "./EstoqueContext";
import { DemandasProvider } from "./DemandasContext";
import { FinanceiroProvider } from "./FinanceiroContext";
import { ContasFixasProvider } from "./ContasFixasContext";
import { TabelaProvider } from "@src/components/comum/Tabelas/TabelaContext";
import { RefreshProvider } from "./RefreshContext";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <RefreshProvider>
      <ThemeProvider>
        <AuthProvider>
          <MenuProvider>
            <ClientesProvider>
              <FinanceiroProvider>
                <EstoqueProvider>
                  <ContasFixasProvider>
                    <TabelaProvider>
                      <DemandasProvider>{children}</DemandasProvider>
                    </TabelaProvider>
                  </ContasFixasProvider>
                </EstoqueProvider>
              </FinanceiroProvider>
            </ClientesProvider>
          </MenuProvider>
        </AuthProvider>
      </ThemeProvider>
    </RefreshProvider>
  );
}

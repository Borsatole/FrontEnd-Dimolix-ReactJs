import { ReactNode } from "react";

import { ThemeProvider } from "./ThemeContext";
import { AuthProvider } from "./AuthContext";
import { MenuProvider } from "./MenuContext";
import { ClientesProvider } from "./ClientesContext";
import { EstoqueProvider } from "./EstoqueContext";
import { DemandasProvider } from "./DemandasContext";
import { FinanceiroProvider } from "./FinanceiroContext";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MenuProvider>
          <ClientesProvider>
            <FinanceiroProvider>
              <EstoqueProvider>
                <DemandasProvider>{children}</DemandasProvider>
              </EstoqueProvider>
            </FinanceiroProvider>
          </ClientesProvider>
        </MenuProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

import { ReactNode } from "react";

import { ThemeProvider } from "./ThemeContext";
import { AuthProvider } from "./AuthContext";
import { MenuProvider } from "./MenuContext";
import { ClientesProvider } from "./ClientesContext";
import { EstoqueProvider } from "./EstoqueContext";
import { DemandasProvider } from "./DemandasContext";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MenuProvider>
          <ClientesProvider>
            <EstoqueProvider>
              <DemandasProvider>{children}</DemandasProvider>
            </EstoqueProvider>
          </ClientesProvider>
        </MenuProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

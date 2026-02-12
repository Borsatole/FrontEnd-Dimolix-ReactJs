import React, { ReactNode } from "react";
import {
  ThemeProvider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { IoMdSad } from "react-icons/io";

// Tipos genéricos para flexibilidade
export interface ColunaConfig<T = any> {
  key: string;
  label: string;
  render?: (item: T, index: number) => ReactNode;
  className?: string;
  headerClassName?: string;
}

export interface AcaoConfig<T = any> {
  icon: ReactNode;
  tooltip: string;
  onClick: (item: T) => void;
  className?: string;
  show?: (item: T) => boolean;
}

interface TabelaDinamicaProps<T = any> {
  dados: T[];
  colunas: ColunaConfig<T>[];
  iconeItem?: (item: T) => ReactNode;
  className?: string;
  acoes?: AcaoConfig<T>[];
  removendoIds?: (string | number)[];
  keyExtractor?: (item: T, index: number) => string | number;
  mensagemVazia?: string;
  customTheme?: any;
  mostrarAcoes?: boolean;
}

// Componente Tooltip interno
function Tooltip({
  children,
  tooltip,
}: {
  children: ReactNode;
  tooltip: string;
}) {
  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
        {tooltip}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );
}

function TabelaDinamica<T = any>({
  dados,
  colunas,
  iconeItem,
  className = "",
  acoes = [],
  removendoIds = [],
  keyExtractor = (item: any, index: number) => item?.id ?? index,
  mensagemVazia = "Nenhum cadastro encontrado",
  mostrarAcoes = true,
}: TabelaDinamicaProps<T>) {
  const modernTheme = {
    table: {
      root: {
        base: "w-full text-left text-sm text-[var(--text-color)]",
        shadow: "",
        wrapper: "relative",
      },
      body: {
        base: "group/body",
        cell: {
          base: "px-6 py-4",
        },
      },
      head: {
        base: "group/head text-xs uppercase tracking-wider",
        cell: {
          base: "text-[var(--text-color)]/70 font-semibold px-6 py-4 bg-transparent border-b-2 border-[var(--base-color)]",
        },
      },
      row: {
        base: "group/row border-b border-[var(--base-color)] hover:bg-[var(--base-color)]/30 transition-colors duration-200",
        striped: "",
      },
    },
  };

  const totalColunas =
    colunas.length +
    (iconeItem ? 1 : 0) +
    (mostrarAcoes && acoes.length > 0 ? 1 : 0);

  return (
    <div className="w-full bg-[var(--base-variant)] rounded-2xl shadow-lg border border-[var(--base-color)] overflow-hidden">
      <div className="overflow-x-auto">
        <ThemeProvider theme={modernTheme}>
          <Table className={`w-full ${className}`}>
            <TableHead>
              <TableRow>
                {iconeItem && (
                  <TableHeadCell className="text-center">Ícone</TableHeadCell>
                )}

                {colunas.map((coluna) => (
                  <TableHeadCell
                    key={coluna.key}
                    className={coluna.headerClassName}
                  >
                    {coluna.label}
                  </TableHeadCell>
                ))}

                {mostrarAcoes && acoes.length > 0 && (
                  <TableHeadCell className="text-center">Ações</TableHeadCell>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {dados.length === 0 && (
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={totalColunas}
                    className="text-center py-12"
                  >
                    <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                      <IoMdSad className="w-16 h-16 mb-4 opacity-50" />

                      {/* <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg> */}
                      <p className="text-sm font-medium">{mensagemVazia}</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {dados.map((item, index) => {
                const key = keyExtractor(item, index);
                const isRemoving = removendoIds.includes(key);

                return (
                  <TableRow
                    key={String(key)}
                    className={`transition-all duration-500 ease-in-out ${
                      isRemoving ? "opacity-0 scale-95" : ""
                    }`}
                  >
                    {iconeItem && (
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--corPrincipal)]/10 text-[var(--corPrincipal)]">
                            {iconeItem(item)}
                          </div>
                        </div>
                      </TableCell>
                    )}

                    {colunas.map((coluna) => (
                      <TableCell
                        key={coluna.key}
                        className={`font-medium ${coluna.className || ""}`}
                      >
                        {coluna.render
                          ? coluna.render(item, index)
                          : String((item as any)[coluna.key] || "")}
                      </TableCell>
                    ))}

                    {mostrarAcoes && acoes.length > 0 && (
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          {acoes.map((acao, acaoIndex) => {
                            if (acao.show && !acao.show(item)) return null;

                            return (
                              <Tooltip key={acaoIndex} tooltip={acao.tooltip}>
                                <button
                                  className={`p-2.5 rounded-lg bg-[var(--base-color)] hover:bg-[var(--corPrincipal)] hover:text-white text-[var(--text-color)] transition-all duration-200 transform hover:scale-110 ${acao.className || ""}`}
                                  onClick={() => acao.onClick(item)}
                                >
                                  {acao.icon}
                                </button>
                              </Tooltip>
                            );
                          })}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default TabelaDinamica;

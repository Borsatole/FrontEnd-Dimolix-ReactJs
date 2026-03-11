import { usePaginacao } from "@src/hooks/UsePaginacao";
import { Button } from "./button";
import { UseTabela } from "./Tabelas/TabelaContext";
import { Divider } from "@mui/material";
import usePagination from "@mui/material/usePagination";

interface PaginacaoProps {
  mostrarTotalResultados?: boolean;
  mostrarSeletorPorPagina?: boolean;
}

function Paginacao({
  mostrarTotalResultados = true,
  mostrarSeletorPorPagina = true,
}) {
  const { paginacao, setPaginacao } = UseTabela();
  const pagina = Number(paginacao?.paginaAtual) || 1;
  const limitePorPagina = Number(paginacao?.porPagina) || 7;
  const totalResultados = Number(paginacao?.total) || 0;
  const totalPaginas = Number(paginacao?.ultimaPagina) || 1;

  const setPagina = (num: number) => {
    setPaginacao((prev: any) => ({
      ...prev,
      paginaAtual: num,
    }));
  };

  const setLimitePorPagina = (num: number) => {
    setPaginacao((prev: any) => ({
      ...prev,
      porPagina: num,
    }));
  };

  if (totalPaginas <= 1) return null;

  return (
    <>
      <div className="flex w-full text-sm flex-wrap justify-end items-center gap-6 mt-6">
        {mostrarTotalResultados && (
          <span>
            {pagina * limitePorPagina} de {totalResultados}
          </span>
        )}

        {mostrarSeletorPorPagina && (
          <select
            value={limitePorPagina}
            name="limitePorPagina"
            onChange={(e) => setLimitePorPagina(Number(e.target.value))}
            className=" text-sm p-2 border border-[var(--base-variant)] bg-[var(--base-variant)]  text-[var(--text-color)]"
          >
            <option value="7">7</option>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        )}
      </div>

      <div className="flex w-full flex-wrap justify-center items-center gap-2">
        <Button onClick={() => setPagina(1)} disabled={pagina <= 1}>
          Primeira
        </Button>

        {gerarPaginas(pagina, totalPaginas).map((num) => (
          <Button
            key={num}
            onClick={() => setPagina(num)}
            className={`px-3 py-2 rounded-md text-sm ${
              num === pagina
                ? "bg-[var(--corPrincipal)] text-white font-semibold"
                : "bg-[var(--corPrincipal)] text-[var(--text-white)] opacity-40"
            }`}
          >
            {num}
          </Button>
        ))}

        <Button
          onClick={() => setPagina(totalPaginas)}
          disabled={pagina >= totalPaginas}
        >
          Última
        </Button>
      </div>
    </>
  );
}

function gerarPaginas(paginaAtual: number, total: number, max = 5): number[] {
  const paginas = [];
  const metade = Math.floor(max / 2);
  let inicio = Math.max(1, paginaAtual - metade);
  let fim = Math.min(total, inicio + max - 1);
  if (fim - inicio + 1 < max) inicio = Math.max(1, fim - max + 1);
  for (let i = inicio; i <= fim; i++) paginas.push(i);
  return paginas;
}

export default Paginacao;

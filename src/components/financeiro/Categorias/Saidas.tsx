import { Button } from "@src/components/comum/button";
import { CaixaExpansora } from "@src/components/comum/CaixaExpansora";
import { BtnAcao } from "@src/components/comum/personalizado";
import { SoftRender } from "@src/components/comum/SoftRender";
import LoadingSpiner from "@src/components/loader/LoadingSpiner";
import { Delete } from "@src/services/crud2";
import { useEffect, useState } from "react";
import EditarRegistro from "./EditarRegistro";
import NovoRegistro from "./NovoRegistro";

function Saidas({ categorias, setRelistar }: any) {
  const [loading, setLoading] = useState(true);

  const [aparecerSuave, setAparecerSuave] = useState(false);
  const [expandir, setExpandir] = useState(false);

  const [registroSelecionado, setRegistroSelecionado] = useState(null);
  const [abrirModalEditar, setAbrirModalEditar] = useState(false);
  const [abrirModalNovo, setAbrirModalNovo] = useState(false);

  useEffect(() => {
    if (categorias.length > 0) {
      setLoading(false);
      setAparecerSuave(true);
      setExpandir(true);
    }
  }, [categorias]);

  function excluirCategoria(categoria: any) {
    Delete({
      endpoint: `/financeiro-categorias/${categoria.id}`,
      registros: categorias,
      nomeRegistro: `a categoria "${categoria.categoria_item}"`,
      antesDeExecutar: () => {
        setLoading(true);
      },
      depoisDeExecutar: () => {
        setLoading(false);
        setRelistar(true);
      },
    });
  }

  return (
    <>
      <SoftRender show={aparecerSuave}>
        <CaixaExpansora
          titulo="Categorias de Saida"
          defaultExpandido={expandir}
          icon="categorias"
        >
          <LoadingSpiner loading={loading}>
            <ul className="flex flex-col gap-2">
              {categorias.map((categoria: any) => (
                <li
                  key={categoria.id}
                  className="bg-[var(--base-color)] rounded-lg p-3 flex items-center justify-between text-lg font-semibold text-[var(--text-color)]"
                >
                  {categoria.categoria_item}
                  <div className="flex gap-2">
                    <BtnAcao
                      tipo="editar"
                      onClick={() => {
                        setRegistroSelecionado(categoria);
                        setAbrirModalEditar(true);
                      }}
                    />
                    <BtnAcao
                      tipo="deletar"
                      onClick={() => {
                        excluirCategoria(categoria);
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </LoadingSpiner>
        </CaixaExpansora>
      </SoftRender>

      {abrirModalEditar && (
        <EditarRegistro
          setAbrirModalEditar={setAbrirModalEditar}
          registro={registroSelecionado}
          setRegistro={setRegistroSelecionado}
          setRelistar={setRelistar}
        />
      )}
    </>
  );
}

export default Saidas;

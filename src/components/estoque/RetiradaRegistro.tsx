import dayjs from "dayjs";
import Modal from "@components/modal/Modal";
import { ItemEstoque } from "@src/components/tipos";
import { Button } from "@components/comum/button";
import { useState } from "react";
import { H2 } from "@components/comum/Textos";
import { Input } from "@components/comum/input";
import { Update } from "@src/services/crud2";
import { useEstoque } from "@src/context/EstoqueContext";
import { SwitchPadrao } from "../comum/SwitchPadrao";

function RetiradaRegistro() {
  const {
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
  } = useEstoque();

  if (!selectedRegistro) return null;

  const fecharModal = () => setSelectedRegistro(null);

  const [dataRetirada, setDataRetirada] = useState<Date | null>(new Date());
  const [lancarFinanceiro, setLancarFinanceiro] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRegistro?.id) return;

    const dataConvertida = dayjs(dataRetirada).format("YYYY-MM-DD");

    setIsLoading(true);
    try {
      const payload = {
        lancar_financeiro: lancarFinanceiro,
        data_retirada: dataConvertida,
        status: "finalizado",
      };

      Update<any>({
        payload,
        antesDeExecutar: () => {
          setIsLoading(true);
        },
        depoisDeExecutar: () => {
          setRelistar(true);
          setSelectedRegistro(null);
          setIsLoading(false);
        },
        endpoint: `/locacoes/${selectedRegistro?.dados_locacao?.locacao_id}`,
      });

      setSelectedRegistro(null);
    } finally {
      setIsLoading(false);
    }
  };

  const dadosLocacao = Array.isArray(selectedRegistro.dados_locacao)
    ? null
    : selectedRegistro.dados_locacao;

  return (
    <Modal IsOpen={true} onClose={fecharModal} className="min-h-[50vh]">
      <div className="p-4">
        {/* Cabeçalho */}
        <H2 className="text-center">Finalizar Locação</H2>

        {/* Card com detalhes */}
        <div className="bg-[var(--base-color)] rounded-xl mt-4 p-4 shadow-md">
          <div className="mb-4">
            <p className="text-xs">Produto</p>
            <p className="text-lg">{selectedRegistro.item}</p>
          </div>

          <div className="mb-4">
            <p className="text-xs">Categoria</p>
            <p className="text-base">{selectedRegistro.categoria}</p>
          </div>

          <div className="mb-4">
            <p className="text-xs">Cliente</p>
            <p className="text-base">{dadosLocacao?.cliente_nome}</p>
          </div>

          <div>
            <p className="text-xs">Valor Total</p>
            <p className="text-base">R$ {dadosLocacao?.preco_total ?? "-"}</p>
          </div>
        </div>

        {/* Campo de data */}
        <div className="mt-6 mb-6">
          <label className="block text-sm mb-1">Data da retirada</label>

          <Input
            id="data-retirada"
            type="date"
            value={dayjs(dataRetirada).format("YYYY-MM-DD")}
            onChange={(e) => setDataRetirada(dayjs(e.target.value).toDate())}
            className="w-full"
          />
          <div className="mt-6 mb-6">
            <label className="block text-sm mb-1">
              Adicionar valor ao financeiro
            </label>
            <SwitchPadrao
              checked={lancarFinanceiro}
              onChange={(checked) => {
                console.log(checked);
                setLancarFinanceiro(checked);
              }}
            />
          </div>
        </div>

        {/* Botão */}
        <Button
          className="w-full"
          onClick={(e) => {
            if (!dataRetirada) return;
            handleSubmit(e);
          }}
        >
          Finalizar Locação
        </Button>
      </div>
    </Modal>
  );
}

export default RetiradaRegistro;

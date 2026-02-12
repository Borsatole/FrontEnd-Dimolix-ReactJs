import React, { useEffect, useState } from "react";
import Modal from "@src/components/modal/Modal";
import { Cliente, Endereco } from "../tipos";
import LoadingSpiner from "@src/components/loader/LoadingSpiner";
import TabelaDinamica, {
  AcaoConfig,
  ColunaConfig,
} from "@src/components/comum/TabelaDinamica";
import { getIcon } from "@src/components/icons";
import { LetraMaiuscula, MaxCaracteres } from "@src/services/funcoes-globais";
import { requisicaoGet } from "@src/services/requisicoes";
import LoadingSkeleton from "@src/components/loader/LoadingSkeleton";
import { BiCheck } from "react-icons/bi";
import { FiltroCadastros } from "@src/components/clientes/FiltroRegistro";
import { Rodape } from "@src/components/comum/tabelas";
import Alerta from "../comum/alertas";

interface ProcurarClientesProps {
  abrirModalProcuraClientes: boolean;
  setabrirModalProcuraClientes: React.Dispatch<React.SetStateAction<boolean>>;
  setCliente_id: React.Dispatch<React.SetStateAction<number | null>>;
  setEnderecos: React.Dispatch<React.SetStateAction<Endereco[] | []>>;
  setDadosCliente: React.Dispatch<React.SetStateAction<Cliente | null>>;
}

function ProcurarClientes({
  abrirModalProcuraClientes,
  setabrirModalProcuraClientes,
  setCliente_id,
  setDadosCliente,
  setEnderecos,
}: ProcurarClientesProps) {
  const [registros, setRegistros] = useState<Cliente[]>([]);
  const [selectedProduto, setSelectedProduto] = useState<Cliente | null>(null);
  const [pagina, setPagina] = useState(1);
  const [relistar, setRelistar] = useState(true);
  const [queryFiltro, setQueryFiltro] = useState("");

  // Parâmetros de paginação
  const [limitePorPagina, setLimitePorPagina] = useState(7);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalResultados, setTotalResultados] = useState(0);

  const [loading, setLoading] = useState(true);
  const [loadingSpiner, setLoadingSpiner] = useState(true);

  useEffect(() => {
    if (selectedProduto) {
      if (!selectedProduto?.enderecos?.length) {
        Alerta(
          "swal",
          "error",
          "Você nao pode adicionar um cliente que não possui endereço cadastrado.",
        );
        return;
      }
      setDadosCliente(selectedProduto);

      setEnderecos(selectedProduto.enderecos);
      setabrirModalProcuraClientes(false);
      setCliente_id(Number(selectedProduto.id));

      // console.log(selectedProduto);
    }
  }, [selectedProduto]);

  // Configuração das colunas da tabela
  const colunas: ColunaConfig<Cliente>[] = [
    {
      key: "nome",
      label: "NOME",
      render: (registro) =>
        LetraMaiuscula(
          MaxCaracteres(registro.nome || registro.razao_social, 30),
        ),
    },
  ];

  // Configuração das ações da tabela
  const acoes: AcaoConfig<Cliente>[] = [
    {
      icon: (
        <div className="cursor-pointer">
          <BiCheck />
        </div>
      ),
      tooltip: "Selecionar",
      onClick: (registro) => setSelectedProduto(registro),
    },
  ];

  // Função para renderizar o ícone de cada linha
  const iconeItem = () => (
    <div className="bg-[var(--base-color)] rounded-lg p-2">
      {getIcon("clientes", 25)}
    </div>
  );

  useEffect(() => {
    setLoadingSpiner(true);
    requisicaoGet(
      `/clientes?${queryFiltro}&pagina=${pagina}&limite=${limitePorPagina}&order_by=id&order_dir=desc`,
    ).then((response) => {
      if (response?.data.success) {
        // console.log(response.data);
        setRegistros(response.data.registros);
        setTotalResultados(response.data.paginacao.total);
        setTotalPaginas(response.data.paginacao.ultimaPagina);
      }
      setLoadingSpiner(false);
      setRelistar(false);
      setLoading(false);
    });
  }, [pagina, limitePorPagina, queryFiltro, relistar]);

  if (loading) return <LoadingSkeleton />;

  return (
    <Modal
      IsOpen={true}
      onClose={() => setabrirModalProcuraClientes(false)}
      className="h-[90vh]"
    >
      <FiltroCadastros onFiltrar={setQueryFiltro} />

      {/* Tabela dinâmica */}
      <LoadingSpiner loading={loadingSpiner}>
        <TabelaDinamica<Cliente>
          dados={registros}
          colunas={colunas}
          acoes={acoes}
          iconeItem={iconeItem}
          keyExtractor={(item) => item.id ?? 0}
          mensagemVazia="Nenhum cadastro encontrado"
          className="text-center divide-y divide-[var(--base-color)] mt-3 rounded-lg"
        />
      </LoadingSpiner>

      {/* Rodapé da tabela */}
      {totalResultados > limitePorPagina && (
        <Rodape
          pagina={pagina}
          limitePorPagina={limitePorPagina}
          registros={registros}
          totalResultados={totalResultados}
          totalPaginas={totalPaginas}
          setPagina={setPagina}
          setLimitePorPagina={setLimitePorPagina}
          mostrarTotalResultados={false}
          mostrarSeletorPorPagina={false}
        />
      )}
    </Modal>
  );
}

export default ProcurarClientes;

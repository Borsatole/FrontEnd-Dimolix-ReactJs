import ContainerSecundario from "@src/components/comum/containerSecundario";
import { TituloPagina } from "@src/components/comum/Textos";
import Tabela from "@src/components/financeiro/ContasReceber/Tabela";

function ContasReceber() {
  return (
    <ContainerSecundario className="flex flex-col gap-4">
      <TituloPagina>Contas Receber</TituloPagina>
      <Tabela />
    </ContainerSecundario>
  );
}

export default ContasReceber;

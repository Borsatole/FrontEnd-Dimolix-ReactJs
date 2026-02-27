import ContainerSecundario from "@src/components/comum/containerSecundario";
import { TituloPagina } from "@src/components/comum/Textos";
import Tabela from "@src/components/financeiro/ContasFixas/Tabela";

function ContasFixas() {
  return (
    <ContainerSecundario className="flex flex-col gap-4">
      <TituloPagina>Contas Fixas</TituloPagina>
      <Tabela />
    </ContainerSecundario>
  );
}

export default ContasFixas;

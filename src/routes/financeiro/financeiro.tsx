import { TituloPagina } from "@src/components/comum/Textos";
import Dashboard from "./Dashboard";
import ContainerSecundario from "@src/components/comum/containerSecundario";

function Financeiro() {
  return (
    <>
      <ContainerSecundario className="flex flex-col gap-4">
        <TituloPagina>Financeiro</TituloPagina>
        <Dashboard />
      </ContainerSecundario>
    </>
  );
}

export default Financeiro;

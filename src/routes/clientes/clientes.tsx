import { TituloPagina } from "@src/components/comum/Textos";
import CardCacambaEstoque from "@src/components/estoque/CardCacambaEstoque";
import Tabela from "@src/components/clientes/Tabela";
import { getIcon, getIconComponent } from "@src/components/icons";
import { TabItem, Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import ContainerSecundario from "@src/components/comum/containerSecundario";

function Estoque() {
  return (
    <>
      <ContainerSecundario>
        {/* <TituloPagina>Clientes</TituloPagina> */}
        <Tabela />
      </ContainerSecundario>
    </>
  );
}

export default Estoque;

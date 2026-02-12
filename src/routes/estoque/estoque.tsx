import ContainerSecundario from "@src/components/comum/containerSecundario";
import { TituloPagina } from "@src/components/comum/Textos";
import CardCacambaEstoque from "@src/components/estoque/CardCacambaEstoque";
import Tabela from "@src/components/estoque/Tabela";
import { getIcon, getIconComponent } from "@src/components/icons";
import { TabItem, Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

function Estoque() {
  return (
    <>
      <ContainerSecundario>
        <TituloPagina>Locações</TituloPagina>

        <Tabela />
      </ContainerSecundario>
    </>
  );
}

export default Estoque;

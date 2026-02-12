import { TituloPagina } from "@src/components/comum/Textos";
import CardCacambaEstoque from "@src/components/estoque/CardCacambaEstoque";
import { getIcon, getIconComponent } from "@src/components/icons";
import { TabItem, Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

function Estoque() {
  return (
    <>
      <TituloPagina>Locações</TituloPagina>

      {/* <Tabs aria-label="Tabs with icons" variant="underline">
        <TabItem active title="Locações" icon={getIconComponent("estoque")}>
          
        </TabItem> */}

      {/* <TabItem disabled title="Categorias">
        Categorias
      </TabItem> */}
      {/* </Tabs> */}
    </>
  );
}

export default Estoque;

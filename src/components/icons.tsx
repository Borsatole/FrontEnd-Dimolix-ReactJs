import React from "react";
import { MdDashboard, MdWorkspacePremium } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";

import { PiWalletFill } from "react-icons/pi";

import { RiLogoutBoxRFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineSave } from "react-icons/md";
import { FaFilter, FaUserFriends } from "react-icons/fa";
import { FaSitemap } from "react-icons/fa";
import { FaReceipt } from "react-icons/fa";
import { BsCalendarDateFill } from "react-icons/bs";
import { FaMapMarkedAlt } from "react-icons/fa";
import { BiSolidBookContent } from "react-icons/bi";

import { FaTruckFront } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa6";
import { SiWhatsapp } from "react-icons/si";
import { FaUserClock } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import { FiSend } from "react-icons/fi";

export const icons: Record<string, JSX.Element> = {
  dashboard: <MdDashboard />,
  demandas: <BsCalendarDateFill />,
  ordemdeservico: <BiSolidBookContent />,
  orcamento: <FaReceipt />,
  clientes: <FaUserFriends />,
  estoque: <FaTruckFront />,
  agendamentos: <FaUserClock />,
  financeiro: <FaMoneyBillTransfer />,

  filter: <FaFilter />,

  permissoes: <FaSitemap />,
  rotasetaxas: <FaMapMarkedAlt />,
  logout: <RiLogoutBoxRFill />,

  premium: <PiWalletFill />,

  whatsapp: <SiWhatsapp />,

  adicionar: <IoMdAdd />,
  enviar: <FiSend />,
  editar: <TbEdit />,
  visualizar: <BiDetail />,
  deletar: <MdDeleteOutline />,
  salvar: <MdOutlineSave />,
};

export const getIcon = (
  nome: string,
  size: number = 24,
  className = "",
): JSX.Element | null => {
  const icon = icons[nome];
  return icon
    ? React.cloneElement(icon, { size, className: `text-current ${className}` })
    : null;
};

export const getIconComponent = (
  nome: string,
): React.FC<React.SVGProps<SVGSVGElement>> | undefined => {
  const icon = icons[nome];
  if (!icon) return undefined;

  // Retorna um componente que renderiza o ícone com props dinâmicas
  return (props) => React.cloneElement(icon, props);
};

export default icons;

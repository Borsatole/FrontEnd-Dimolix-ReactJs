import { Card } from "flowbite-react";
import { getIcon } from "@src/components/icons";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { MaxCaracteres } from "@src/services/funcoes-globais";

interface CardOpcoesProps {
  titulo: string;
  descricao?: string;
  icone: string;
  rota: string;
}

export function CardOpcoes({
  titulo,
  descricao,
  icone,
  rota,
}: CardOpcoesProps) {
  const navigate = useNavigate();
  return (
    <Card className="w-full bg-[var(--base-variant)] mx-auto shadow-lg rounded-2xl border border-[var(--base-color)] hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
      <div className="flex flex-col ">
        {/* Conteúdo que cresce */}
        <div className="flex-grow">
          {/* Ícone */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[var(--corPrincipal)]/10 text-[var(--corPrincipal)] text-5xl">
              {getIcon(icone, 48, "text-[var(--corPrincipal)]")}
            </div>
          </div>

          {/* Título */}
          <h5 className="mb-2 text-xl font-semibold text-center">{titulo}</h5>

          {/* Descrição */}
          {descricao && <p className="mb-6 text-center text-sm">{descricao}</p>}
        </div>

        {/* Botão sempre na base com largura total */}
        <div className="w-full mt-4">
          <Button onClick={() => navigate(rota)} className="w-full">
            Acessar
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default CardOpcoes;

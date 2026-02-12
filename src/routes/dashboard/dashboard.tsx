import { useContext, useEffect, useState } from "react";
import { TituloPagina } from "@components/comum/Textos";
import { requisicaoGet } from "@src/services/requisicoes";
import { Datas } from "@src/services/funcoes-globais";
import dayjs from "dayjs";
import CardOpcoes from "@src/components/comum/cardOpcoes";
import ContainerSecundario from "@src/components/comum/containerSecundario";

export default function Dashboard() {
  const now = dayjs();

  return (
    <>
      <ContainerSecundario>
        <BannerBoasVindas />
        <TituloPagina>Dashboard</TituloPagina>
        <GridDeCards>
          <CardOpcoes
            icone="demandas"
            descricao="Demandas Diarias como entregas e retiradas de equipamentos."
            titulo="Demandas"
            rota="/demandas"
          />
          <CardOpcoes
            icone="ordemdeservico"
            descricao="Demandas Diarias como entregas e retiradas de equipamentos."
            titulo="Ordem de Serviço"
            rota="/"
          />

          <CardOpcoes
            icone="clientes"
            descricao="Gerencie o cadastro de clientes da sua empresa"
            titulo="Clientes"
            rota="/clientes"
          />

          <CardOpcoes
            icone="orcamento"
            descricao="Gerencie o cadastro de clientes da sua empresa"
            titulo="Orçamentos"
            rota="/"
          />

          <CardOpcoes
            icone="estoque"
            descricao="Gerencie suas caçambas em estoque."
            titulo="Estoque"
            rota="/estoque"
          />

          <CardOpcoes
            icone="rotasetaxas"
            descricao="Gerencie taxas de entregas e ruas especiais."
            titulo="Rotas e Taxas"
            rota="/"
          />
        </GridDeCards>
      </ContainerSecundario>
    </>
  );
}

function GridDeCards({ children }: any) {
  return (
    <div
      className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3
        gap-4
        sm:gap-6
      "
    >
      {children}
    </div>
  );
}

function BannerBoasVindas() {
  return (
    <div className="relative w-full overflow-hidden sm:p-8 mb-6 mx-auto shadow-lg rounded-2xl border border-[var(--corPrincipal)] hover:shadow-2xl transition-shadow duration-300 cursor-pointer bg-gradient-to-br from-[var(--corPrincipal)] to-[var(--corPrincipal)]/80">
      {/* Animação de logos flutuantes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-40 invert-50"
            style={{
              left: `${(i * 15) % 100}%`,
              top: `${(i * 20) % 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${8 + (i % 4) * 2}s`,
            }}
          >
            <img
              src="/logo.webp"
              alt=""
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
              style={{
                filter: "brightness(0) invert(1)",
              }}
            />
          </div>
        ))}
      </div>

      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>

      {/* Conteúdo */}
      <div className="relative  p-6 sm:p-8 md:p-20 flex items-center gap-4 sm:gap-6 ">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black shadow-md flex items-center justify-center overflow-hidden flex-shrink-0">
          <img
            src="/logo.webp"
            alt="Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
          />
        </div>

        <div className="text-left text-black">
          <h2 className="text-xl sm:text-2xl font-bold drop-shadow-lg">
            Olá, Seja bem-vindo!
          </h2>
          <p className="text-xs sm:text-sm mt-1 drop-shadow-md">
            Acompanhe as demandas do sistema de forma simples e rápida.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(5deg);
          }
          50% {
            transform: translateY(-40px) translateX(-10px) rotate(-5deg);
          }
          75% {
            transform: translateY(-20px) translateX(15px) rotate(3deg);
          }
        }

        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

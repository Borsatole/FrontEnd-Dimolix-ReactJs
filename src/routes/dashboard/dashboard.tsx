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
        <TituloPagina>Dashboard</TituloPagina>
        <BannerBoasVindas />
        <GridDeCards>
          <CardOpcoes
            icone="demandas"
            descricao="Demandas Diarias como entregas e retiradas de equipamentos."
            titulo="Demandas"
            rota="/demandas"
          />

          <CardOpcoes
            icone="estoque"
            descricao="Gerencie suas locações de forma visual."
            titulo="Locações"
            rota="/estoque"
          />

          <CardOpcoes
            icone="clientes"
            descricao="Gerencie o cadastro de clientes da sua empresa"
            titulo="Clientes"
            rota="/clientes"
          />

          <CardOpcoes
            icone="financeiro"
            descricao="Gerencie o cadastro de clientes da sua empresa"
            titulo="Financeiro"
            rota="/financeiro"
          />

          {/* <CardOpcoes
            icone="rotasetaxas"
            descricao="Gerencie taxas de entregas e ruas especiais."
            titulo="Rotas e Taxas"
            rota="/"
          /> */}
        </GridDeCards>
      </ContainerSecundario>
    </>
  );
}

function GridDeCards({ children }: any) {
  return (
    <div
      className="
        mt-6
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-2
        gap-4
        sm:gap-6
      "
    >
      {children}
    </div>
  );
}

export function BannerBoasVindas() {
  const [tamanhoTela, setTamanhoTela] = useState(window.innerWidth);
  const [numeroDeFlutuantes, setNumeroDeFlutuantes] = useState(15);

  // 🔥 Partículas proporcionais
  useEffect(() => {
    const minWidth = 320;
    const maxWidth = 1920;

    const minParticles = 5;
    const maxParticles = 18;

    const largura = Math.min(Math.max(tamanhoTela, minWidth), maxWidth);

    const proporcao = (largura - minWidth) / (maxWidth - minWidth);

    const quantidade = Math.round(
      minParticles + proporcao * (maxParticles - minParticles),
    );

    setNumeroDeFlutuantes(quantidade);
  }, [tamanhoTela]);

  // 🔥 Resize listener
  useEffect(() => {
    const handleResize = () => setTamanhoTela(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-full relative w-full rounded-2xl border border-[var(--base-color)] bg-[#0f0f0f] shadow-md overflow-hidden">
      {/* Flutuantes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(numeroDeFlutuantes)].map((_, i) => (
          <div
            key={i}
            className="absolute backdrop-blur-sm animate-ping bg-[var(--corPrincipal)]/20"
            style={{
              width: `${40 + (i % 4) * 20}px`,
              height: `${20 + (i % 3) * 15}px`,
              borderRadius: "8px",
              left: `${(i * 12) % 100}%`,
              top: `${(i * 18) % 100}%`,
              transform: `rotate(${i * 15}deg)`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${8 + (i % 3) * 2}s`,
            }}
          />
        ))}
      </div>
      {/* Glow leve */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute w-72 h-72 bg-yellow-400/20 blur-3xl -top-20 -left-20 rounded-full" />
      </div>

      {/* Conteúdo */}
      <div className="relative flex flex-wrap  items-center gap-5 p-6 sm:p-8">
        {/* Logo */}
        <div className="min-w-16 h-16 rounded-full bg-black border border-yellow-400/30 flex items-center justify-center">
          <img src="/logo.webp" className="w-10 h-10" />
        </div>

        {/* Texto */}
        <div>
          <h2 className="text-xl text-left sm:text-2xl font-bold text-[var(--corPrincipal)]">
            Olá, Seja bem-vindo!
          </h2>
          <p className="text-sm text-left text-white">
            Acompanhe as demandas do sistema de forma simples e rápida.
          </p>
        </div>
      </div>

      {/* 🎬 Animação */}
      <style>{`
        @keyframes float {
          0%, 100% {
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

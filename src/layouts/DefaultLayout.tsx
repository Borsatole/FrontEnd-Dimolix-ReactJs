import BarraSuperior from "@src/components/barraSuperior/barraSuperior";
import MenuLateral from "@components/MenuLateral/MenuLateral";
import Container from "@components/comum/container";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { SoftRender } from "@src/components/comum/SoftRender";

export default function DefaultLayout() {
  const [animar, setAnimar] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setAnimar(true);
    const timeout = setTimeout(() => {
      setAnimar(false);
    }, 600);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      <BarraSuperior />

      <Container tipo="principal">
        <MenuLateral />
        <div
          className={`conteudo flex-1 transition-all duration-300 ease-in-out 
            ${animar ? "animacaoEntrada" : ""}`}
        >
          <Outlet />
        </div>
      </Container>
    </>
  );
}

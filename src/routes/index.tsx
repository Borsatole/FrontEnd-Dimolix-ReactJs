import { Suspense, lazy, useContext, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { Spinner } from "flowbite-react";
import Alerta from "@src/components/comum/alertas";
import { AuthContext } from "@src/context/AuthContext";
import DefaultLayout from "@src/layouts/DefaultLayout";

function TelaLoading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center space-y-4">
        <Spinner size="xl" className="fill-[var(--corPrincipal)]" />
        <span
          className="text-[var(--text-color)] text-sm animate-pulse"
          style={{ color: "var(--text-color)" }}
        >
          Carregando...
        </span>
      </div>
    </div>
  );
}

const TelaLogin = lazy(() => import("./telaLogin"));
const Home = lazy(() => import("./dashboard/dashboard"));
const NivelAcesso = lazy(() => import("./acessos/nivel"));
const Estoque = lazy(() => import("./estoque/estoque"));
const Demandas = lazy(() => import("./demandas/demandas"));
const Renove = lazy(() => import("./renove/renove"));
const Clientes = lazy(() => import("./clientes/clientes"));
const Financeiro = lazy(() => import("./financeiro/financeiro"));
const FinanceiroCategorias = lazy(() => import("./financeiro/Categorias"));
const FinanceiroContasFixas = lazy(() => import("./financeiro/ContasFixas"));
const FinanceiroContasReceber = lazy(
  () => import("./financeiro/ContasReceber"),
);
const FinanceiroContasPagar = lazy(() => import("./financeiro/ContasPagar"));

const routes = [
  { path: "/", element: <Home />, protected: true },
  { path: "/login", element: <TelaLogin />, protected: false },
  { path: "/acesso-niveis", element: <NivelAcesso />, protected: true },
  { path: "/estoque", element: <Estoque />, protected: true },
  { path: "/demandas", element: <Demandas />, protected: true },
  { path: "/renove", element: <Renove />, protected: true },
  { path: "/clientes", element: <Clientes />, protected: true },
  { path: "/financeiro", element: <Financeiro />, protected: true },
  {
    path: "/financeiro/categorias",
    element: <FinanceiroCategorias />,
    protected: true,
  },
  {
    path: "/financeiro/contas-fixas",
    element: <FinanceiroContasFixas />,
    protected: true,
  },
  {
    path: "/financeiro/receber",
    element: <FinanceiroContasReceber />,
    protected: true,
  },
  {
    path: "/financeiro/pagar",
    element: <FinanceiroContasPagar />,
    protected: true,
  },
];

function AcessoNegado() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
    Alerta("swal", "error", "Voce nao tem permissao para acessar essa rota!");
  }, [navigate]);

  return null;
}

function RotaNaoEncontrada() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
    Alerta("toast", "error", "Rota nao encontrada!");
  }, [navigate]);

  return null;
}

function rotaPermitida(menu: any[], path: string): boolean {
  // Normaliza a rota (remove barra final, se existir)

  if (path !== "/") {
    const rota = path.replace(/\/$/, "");
  }
  const rota = path;

  // Libera a rota /renove de qualquer forma
  if (rota === "/renove") return true;

  // Se não tiver menu, não libera outras rotas
  if (!menu || menu.length === 0) return false;

  // Busca dentro do menu/submenus
  for (const item of menu) {
    if (item.rota === rota) return true;
    if (item.submenu && rotaPermitida(item.submenu, rota)) return true;
  }

  return false;
}

const Rotas = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔒 Se menu estiver vazio e usuário não estiver na rota /renove, redireciona
  useEffect(() => {
    const menuVazio = !auth?.menu || auth.menu.length === 0;
    const rotaAtual = location.pathname;

    if (menuVazio && rotaAtual !== "/renove" && rotaAtual !== "/login") {
      navigate("/renove", { replace: true });
    }
  }, [auth?.menu, location.pathname, navigate]);

  // Separa rotas protegidas e não protegidas
  const rotasProtegidas = routes.filter((route) => route.protected);
  const rotasPublicas = routes.filter((route) => !route.protected);

  return (
    <Suspense fallback={<TelaLoading />}>
      <Routes>
        {/* Rotas públicas (sem layout) */}
        {rotasPublicas.map(({ path, element }, index) => (
          <Route key={`public-${index}`} path={path} element={element} />
        ))}

        {/* Rotas protegidas (com DefaultLayout) */}
        <Route
          element={
            <ProtectedRoute>
              <DefaultLayout />
            </ProtectedRoute>
          }
        >
          {rotasProtegidas.map(({ path, element }, index) => {
            const isPermitida = rotaPermitida(auth?.menu || [], path);
            return (
              <Route
                key={`protected-${index}`}
                path={path}
                element={isPermitida ? element : <AcessoNegado />}
              />
            );
          })}
        </Route>

        {/* Rota 404 */}
        <Route path="*" element={<RotaNaoEncontrada />} />
      </Routes>
    </Suspense>
  );
};

export default Rotas;

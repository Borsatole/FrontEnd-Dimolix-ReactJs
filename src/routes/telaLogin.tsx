import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Alerta from "@components/comum/alertas";
import { requisicaoPost } from "@services/requisicoes";
import { useMenu } from "@src/context/MenuContext";
import { Button } from "@components/comum/button";
import { Input } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";

// Alert
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { api } from "@src/services/api";

export default function TelaLogin() {
  const { fecharMenu } = useMenu();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function verificaLogin(event: any) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const dadosFormularioLogin = Object.fromEntries(formData.entries());

    try {
      setLoading(true);
      setErrorMessage("");
      const response = await requisicaoPost("/login", dadosFormularioLogin);

      if (response?.data.success && response.data.token) {
        fecharMenu();

        login(response.data);
        navigate("/");
        Alerta("swal", "success", `${response.data.message}`);
      } else {
        setErrorMessage(
          response?.data?.message || "E-mail ou senha inválidos.",
        );
      }
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
      Alerta(
        "swal",
        "error",
        `${error?.response?.data?.message || "Ops! Algo deu errado."}`,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--base-color)] px-4">
      <div className="flex w-full max-w-6xl h-[600px] bg-[var(--base-variant)] rounded-lg shadow-2xl overflow-hidden relative">
        {/* Coluna da imagem */}
        <div
          className="relative flex-1 hidden md:flex bg-cover bg-center"
          style={{
            backgroundImage: "url('/login.jpg')",
          }}
        >
          {/* Recorte curvo */}
          <div
            className="absolute top-0 right-[-120px] w-[240px] h-full bg-[var(--base-variant)]"
            style={{
              borderRadius: "50% 0 0 50% / 50% 0 0 50%",
            }}
          />
        </div>

        {/* Coluna do formulário */}
        <div className="flex flex-1 flex-col justify-center items-start p-10 relative bg-[var(--base-variant)] z-10">
          {/* Ícone */}
          <div className="absolute top-10 right-10 w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center font-bold">
            💡
          </div>

          <div className="max-w-sm w-full mx-auto">
            <h2 className="text-2xl font-bold mb-2 leading-snug">
              Descarte seus resíduos com{" "}
              <span className="text-[var(--corPrincipal)]">Segurança.</span>
            </h2>
            <p className="text-sm  mb-10">
              Faça o controle de resíduos e ajude a diminuir o impacto
              ambiental.
            </p>

            {/* Alerta de erro */}

            {errorMessage && (
              <div className="flex items-center w-full mb-4">
                <Alert
                  color="failure"
                  className="text-left"
                  icon={HiInformationCircle}
                >
                  <span className="font-medium ">Ops!</span> {errorMessage}
                </Alert>
              </div>
            )}

            <form
              onSubmit={verificaLogin}
              id="formLogin"
              className="w-full space-y-6"
            >
              <FormGroup label="E-mail" id="email">
                <Input id="email" name="email" type="email" required />
              </FormGroup>

              <FormGroup label="Senha" id="password">
                <Input id="password" name="password" type="password" required />
                <div className="text-right mt-1">
                  <a
                    href="#"
                    className="text-xs text-gray-400 hover:text-[var(--corPrincipal)]"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
              </FormGroup>

              <Button type="submit" loading={loading} className="w-full ">
                Entrar
              </Button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-8">
              Não tem uma conta?{" "}
              <a
                href="#"
                className="text-[var(--corPrincipal)] font-semibold hover:underline"
              >
                Cadastre-se
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

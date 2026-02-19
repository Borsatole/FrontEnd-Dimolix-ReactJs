import { useState, useEffect } from "react";
import { FooterDivider, Spinner } from "flowbite-react";
import Modal from "@components/modal/Modal";
import { Input, TextArea } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";
import { Button } from "@components/comum/button";
import { Cliente, Endereco } from "@components/tipos";
import { SelectModificado } from "@src/components/comum/select";
import { getIcon } from "../icons";
import {LetraMaiuscula} from "@services/funcoes-globais";
import { Create } from "@src/services/crud2";
import { useClientes } from "@src/context/ClientesContext";



function ModalAdicionarRegistro() {

  const {
      registros, setRegistros,
      setRelistar,
      setLoadingSpiner,
      selectedCliente, setSelectedCliente,
      abrirModalNovoRegistro, setAbrirModalNovoRegistro
    } = useClientes();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInit, setIsLoadingInit] = useState(false);

  // estados do cliente
  const [nome, setNome] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [celular, setCelular] = useState("");
  const [observacao, setObservacao] = useState("");

  // estado do endereço
  const [endereco, setEndereco] = useState<Endereco>({
    cep: "",
    logradouro: "",
    bairro: "",
    cidade: "",
    estado: "",
    numero: "",
    complemento: "",
  });

  // busca de CEP
  async function buscaCep(cep: string) {
    try {
      setIsLoading(true);
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      if (!response.ok) {
        throw new Error("Erro ao buscar o CEP");
      }

      const data = await response.json();
      // console.log(data);

      if (data.erro) {
        // console.log("CEP não encontrado");
        return;
      }

      setEndereco((prev) => ({
        ...prev,
        bairro: data.bairro || "",
        logradouro: data.logradouro || "",
        complemento: data.complemento || "",
        cidade: data.localidade || "",
        estado: data.uf || "",
      }));
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const apenasNumeros = endereco.cep.replace(/\D/g, "");
    if (apenasNumeros.length === 8) {
      buscaCep(apenasNumeros);
    }
  }, [endereco.cep]);

  // coleta dos dados para envio
  const coletarDadosFormulario = (): Cliente => ({
    nome: LetraMaiuscula(nome),
    razao_social: LetraMaiuscula(razaoSocial),
    email: LetraMaiuscula(email),
    telefone,
    celular,
    observacao : LetraMaiuscula(observacao),
    enderecos: [endereco],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = coletarDadosFormulario();

      Create<any>({
        payload: data,
        endpoint: "/clientes",
        // registros,
        // setRegistros,
        antesDeExecutar : () => {
          setLoadingSpiner(true);
        },
        depoisDeExecutar : () => {
          setAbrirModalNovoRegistro(false);
          setLoadingSpiner(false);
          setRelistar(true);
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fecharModal = () => setAbrirModalNovoRegistro(false);

  if (isLoadingInit) {
    return (
      <Modal IsOpen={true} onClose={fecharModal}>
        <div className="fixed inset-0 flex items-center justify-center">
          <Spinner size="xl" className="fill-[var(--corPrincipal)]" />
        </div>
      </Modal>
    );
  }

  return (
    <Modal IsOpen={true} onClose={fecharModal} className="min-h-auto">
  <div className="flex flex-col p-4 border-b border-[var(--base-color)] mb-4">
    <div className="flex items-center gap-4">
      <div className="w-20 h-20 rounded-lg bg-[var(--base-color)] flex items-center justify-center text-[var(--corPrincipal)] shadow-inner">
        {getIcon("clientes", 48, "text-[var(--corPrincipal)]")}
      </div>
      <div>
        <h2 className="text-xl font-semibold text-[var(--text-color)]">
          Cadastro de Cliente
        </h2>
        <p className="text-sm text-[var(--text-color)]/70">
          Insira ou atualize os dados do cliente abaixo
        </p>
      </div>
    </div>
  </div>

  <form
    onSubmit={handleSubmit}
    className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 pb-6"
  >
    {/* ===================== DADOS DO CLIENTE ===================== */}
    <div className="md:col-span-2">
      <h3 className="text-lg font-semibold text-[var(--text-color)] mb-2">
        Dados do Cliente
      </h3>
      <div className="border-t border-[var(--base-color)] mb-4" />
    </div>

    <FormGroup label="Nome" id="nome">
      <Input
        id="nome"
        type="text"
        className="uppercase"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
        disabled={isLoading}
        placeholder="Ex: João da Silva"
      />
    </FormGroup>

    <FormGroup label="Razão Social" id="razao_social">
      <Input
        id="razao_social"
        type="text"
        className="uppercase"
        value={razaoSocial}
        onChange={(e) => setRazaoSocial(e.target.value)}
        disabled={isLoading}
        placeholder="Razão social"
      />
    </FormGroup>

    <FormGroup label="E-mail" id="email">
      <Input
        id="email"
        type="email"
        value={email}
        className="uppercase"
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
        placeholder="cliente@email.com"
      />
    </FormGroup>

    <FormGroup label="Telefone" id="telefone">
      <Input
        id="telefone"
        type="text"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
        disabled={isLoading}
        placeholder="(00) 0000-0000"
      />
    </FormGroup>

    <FormGroup label="Celular" id="celular">
      <Input
        id="celular"
        type="text"
        value={celular}
        onChange={(e) => setCelular(e.target.value)}
        disabled={isLoading}
        placeholder="(00) 00000-0000"
      />
    </FormGroup>

    

    {/* ===================== ENDEREÇO ===================== */}
    <div className="md:col-span-2 mt-6">
      <h3 className="text-lg font-semibold text-[var(--text-color)] mb-2">
        Endereço
      </h3>
      <div className="border-t border-[var(--base-color)] mb-4" />
    </div>

    <FormGroup label="CEP" id="cep">
      <Input
        id="cep"
        className="uppercase"
        type="text"
        value={endereco.cep}
        onChange={(e) => setEndereco({ ...endereco, cep: e.target.value })}
        disabled={isLoading}
        placeholder="Digite o CEP para buscar o endereço"
      />
    </FormGroup>

    <FormGroup label="Bairro" id="bairro">
      <Input
        id="bairro"
        className="uppercase"
        type="text"
        value={endereco.bairro}
        onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })}
        disabled={isLoading}
        placeholder="Bairro"
      />
    </FormGroup>

    <FormGroup label="Logradouro" id="logradouro" className="md:col-span-2">
      <Input
        id="logradouro"
        className="uppercase"
        type="text"
        value={endereco.logradouro}
        onChange={(e) =>
          setEndereco({ ...endereco, logradouro: e.target.value })
        }
        disabled={isLoading}
        placeholder="Logradouro"
      />
    </FormGroup>

    <FormGroup label="Complemento" id="complemento">
      <Input
        id="complemento"
        className="uppercase"
        type="text"
        value={endereco.complemento}
        onChange={(e) =>
          setEndereco({ ...endereco, complemento: e.target.value })
        }
        disabled={isLoading}
        placeholder="Complemento"
      />
    </FormGroup>

    <FormGroup label="Número" id="numero">
      <Input
        id="numero"
        className="uppercase"
        type="text"
        value={endereco.numero}
        onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })}
        disabled={isLoading}
        placeholder="Número"
      />
    </FormGroup>

    <FormGroup label="Cidade" id="cidade">
      <Input
        id="cidade"
        className="uppercase"
        type="text"
        value={endereco.cidade}
        onChange={(e) => setEndereco({ ...endereco, cidade: e.target.value })}
        disabled={isLoading}
        placeholder="Cidade"
      />
    </FormGroup>

    <FormGroup label="Estado" id="estado">
      <SelectModificado
        id="estado"
        disabled={isLoading}
        value={endereco.estado}
        onChange={(e) => setEndereco({ ...endereco, estado: e.target.value })}
        className="uppercase"
      >
        <option value="">SELECIONE O ESTADO</option>
        <option value="AC">ACRE (AC)</option>
        <option value="AL">ALAGOAS (AL)</option>
        <option value="AP">AMAPÁ (AP)</option>
        <option value="AM">AMAZONAS (AM)</option>
        <option value="BA">BAHIA (BA)</option>
        <option value="CE">CEARÁ (CE)</option>
        <option value="DF">DISTRITO FEDERAL (DF)</option>
        <option value="ES">ESPÍRITO SANTO (ES)</option>
        <option value="GO">GOIÁS (GO)</option>
        <option value="MA">MARANHÃO (MA)</option>
        <option value="MT">MATO GROSSO (MT)</option>
        <option value="MS">MATO GROSSO DO SUL (MS)</option>
        <option value="MG">MINAS GERAIS (MG)</option>
        <option value="PA">PARÁ (PA)</option>
        <option value="PB">PARAÍBA (PB)</option>
        <option value="PR">PARANÁ (PR)</option>
        <option value="PE">PERNAMBUCO (PE)</option>
        <option value="PI">PIAUÍ (PI)</option>
        <option value="RJ">RIO DE JANEIRO (RJ)</option>
        <option value="RN">RIO GRANDE DO NORTE (RN)</option>
        <option value="RS">RIO GRANDE DO SUL (RS)</option>
        <option value="RO">RONDÔNIA (RO)</option>
        <option value="RR">RORAIMA (RR)</option>
        <option value="SC">SANTA CATARINA (SC)</option>
        <option value="SP">SÃO PAULO (SP)</option>
        <option value="SE">SERGIPE (SE)</option>
        <option value="TO">TOCANTINS (TO)</option>
      </SelectModificado>
    </FormGroup>

    <FormGroup
      label="Observação"
      id="observacao"
      className="md:col-span-2"
    >
      <TextArea
        id="observacao"
        className="font-bold uppercase text-[var(--text-color)]"
        value={observacao}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
          setObservacao(e.target.value)
        }
        disabled={isLoading}
        placeholder="Observação"
      />
    </FormGroup>

    <div className="md:col-span-2 flex justify-end">
      <Button
        type="submit"
        loading={isLoading}
        disabled={isLoading}
        wsize="w-full md:w-auto mt-4"
      >
        Salvar Cliente
      </Button>
    </div>
  </form>
</Modal>

  );
}

export default ModalAdicionarRegistro;

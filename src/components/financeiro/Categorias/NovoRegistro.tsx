import SelectOption from "@material-tailwind/react/components/Select/SelectOption";
import { Button } from "@src/components/comum/button";
import { FormGroup } from "@src/components/comum/FormGroup";
import { Input, TextArea } from "@src/components/comum/input";
import { SelectModificado } from "@src/components/comum/select";
import { getIcon } from "@src/components/icons";
import Modal from "@src/components/modal/Modal";
import { Create, Update } from "@src/services/crud2";

import React, { useEffect, useState } from "react";
function NovoRegistro({ setAbrirModalNovo, setRelistar }: any) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!nome || !tipo) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const payload = {
      categoria_item: nome,
      tipo,
    };

    Create({
      endpoint: "/financeiro-categorias",
      payload,
      depoisDeExecutar: () => {
        setLoading(false);
        setAbrirModalNovo(false);
        setRelistar(true);
      },
    });
  }

  return (
    <Modal
      IsOpen={true}
      onClose={() => setAbrirModalNovo(false)}
      className="min-h-auto"
    >
      <div className="flex flex-col p-4 border-b border-[var(--base-color)] mb-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-lg bg-[var(--base-color)] flex items-center justify-center text-[var(--corPrincipal)] shadow-inner">
            {getIcon("categorias", 48, "text-[var(--corPrincipal)]")}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[var(--text-color)]">
              {"Nova categoria"}
            </h2>
            <p className="text-sm text-[var(--text-color)]/70">
              Insira os dados da nova categoria abaixo
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className=" gap-4 px-4 pb-6">
        <FormGroup label="Nome" id="nome">
          <Input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            disabled={loading}
            required
          />
        </FormGroup>

        <FormGroup label="Tipo" id="tipo">
          <SelectModificado
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            disabled={loading}
            required
          >
            <option value="">Selecione um tipo</option>
            <option value="entrada">Entrada</option>
            <option value="saida">Saida</option>
          </SelectModificado>
        </FormGroup>

        <div className="md:col-span-2 flex justify-end">
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            wsize="w-full md:w-auto mt-4"
          >
            Salvar Cliente
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default NovoRegistro;

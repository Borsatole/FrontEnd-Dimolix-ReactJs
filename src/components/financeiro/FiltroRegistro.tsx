import { useState } from "react";
import { FormGroup } from "@components/comum/FormGroup";
import { Input } from "@components/comum/input";
import { SelectModificado } from "@components/comum/select";
import { Datas } from "@src/services/funcoes-globais";
import { FaFilter, FaEraser, FaChevronDown, FaChevronUp } from "react-icons/fa";

interface FiltroProps {
  onFiltrar: (queryString: string) => void;
}

export function FiltroCadastros({ onFiltrar }: FiltroProps) {
  const { primeiroDia, ultimoDia } = Datas();
  const [expandido, setExpandido] = useState(true);

  const [filtros, setFiltros] = useState({
    id: "",
    nome: "",
    email: "",
    telefone: "",
    celular: "",
    
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const handleFiltrar = () => {
    const params = new URLSearchParams();
    Object.entries(filtros).forEach(([key, value]) => {
      if (value.trim() !== "") params.append(key, value);
    });
    onFiltrar(params.toString());
  };

  const handleLimpar = () => {
    setFiltros({ 
      id: "", 
      nome: "", 
      email: "",
      telefone: "",
      celular: "",
    });
    onFiltrar("");
  };

  const contarFiltrosAtivos = () => {
    return Object.values(filtros).filter(value => value.trim() !== "").length;
  };

  const filtrosAtivos = contarFiltrosAtivos();

  return (
    <div className="bg-[var(--base-variant)] rounded-2xl shadow-lg border border-[var(--base-color)] overflow-hidden mb-6 transition-all duration-300">
      {/* Header do Filtro */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-[var(--base-color)]/30 transition-colors duration-200"
        onClick={() => setExpandido(!expandido)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--corPrincipal)]/10 text-[var(--corPrincipal)]">
            <FaFilter className="text-lg" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-color)]">Filtros</h3>
            {filtrosAtivos > 0 && (
              <span className="text-xs text-[var(--text-color)]/60">
                {filtrosAtivos} filtro{filtrosAtivos > 1 ? 's' : ''} ativo{filtrosAtivos > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {filtrosAtivos > 0 && (
            <span className="px-3 py-1 bg-[var(--corPrincipal)] text-white text-xs font-medium rounded-full">
              {filtrosAtivos}
            </span>
          )}
          <button 
            type="button"
            className="p-2 rounded-lg hover:bg-[var(--base-color)] transition-colors duration-200"
          >
            {expandido ? (
              <FaChevronUp className="text-[var(--text-color)]/70" />
            ) : (
              <FaChevronDown className="text-[var(--text-color)]/70" />
            )}
          </button>
        </div>
      </div>

      {/* Conteúdo do Filtro */}
      <div 
        className={`transition-all duration-300 ease-in-out ${
          expandido ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <form className="p-6 pt-2" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <FormGroup id="nome" label="NOME">
              <Input 
                type="text" 
                id="nome" 
                name="nome" 
                value={filtros.nome} 
                onChange={handleChange}
                className="w-full"
              />
            </FormGroup>

            <FormGroup id="email" label="EMAIL">
              <Input 
                type="text" 
                id="email" 
                name="email" 
                value={filtros.email} 
                onChange={handleChange}
                className="w-full"
              />
            </FormGroup>

            <FormGroup id="telefone" label="TELEFONE">
              <Input 
                type="text" 
                id="telefone" 
                name="telefone" 
                value={filtros.telefone} 
                onChange={handleChange}
                className="w-full"
              />
            </FormGroup>

            <FormGroup id="celular" label="CELULAR">
              <Input 
                type="text" 
                id="celular" 
                name="celular" 
                value={filtros.celular} 
                onChange={handleChange}
                className="w-full"
              />
            </FormGroup>

          </div>

          {/* Botões de Ação */}
          <div className="mt-6 pt-4 border-t border-[var(--base-color)] flex gap-3 justify-end">
            <button 
              type="button"
              onClick={handleLimpar} 
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--base-color)] hover:bg-[var(--base-color)]/70 text-[var(--text-color)] font-medium transition-all duration-200 transform hover:scale-105"
            >
              <FaEraser className="text-sm" />
              Limpar
            </button>
            
            <button 
              type="submit"
              onClick={handleFiltrar} 
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--corPrincipal)] hover:brightness-110 text-white font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <FaFilter className="text-sm" />
              Aplicar Filtros
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
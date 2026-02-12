import React, { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { FormGroup } from "../comum/FormGroup";
import { Input } from "../comum/input";
import { Button } from "../comum/button";
import dayjs from "dayjs";
import { Update } from "@src/services/crud2";

function Regendar({
  setAbrirModalReagendamento,
  selectedRegistro,
  setAtualizarAgendamentos,
}: any) {
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [horario, setHorario] = useState("08:00");
  const [loading, setLoading] = useState(false);

  const handleChangeInicio = (value: string) => {
    setDataInicio(value);

    if (dayjs(value).isValid()) {
      const novaDataFim = dayjs(value).add(7, "day").format("YYYY-MM-DD");
      setDataFim(novaDataFim);
    }
  };

  function regendar(e: React.FormEvent) {
    e.preventDefault();

    if (!dayjs(dataInicio).isValid() || !dayjs(dataFim).isValid()) {
      console.warn("Datas inválidas");
      return;
    }

    const dataAgendamento = dayjs(`${dataInicio} ${horario}`).format(
      "YYYY-MM-DD HH:mm:ss",
    );

    const payload = {
      data_agendamento: dataAgendamento,
      data_inicio: dataInicio,
      data_fim: dataFim,
    };

    Update<any>({
      payload,
      endpoint: `/agendamentos/${selectedRegistro?.id}`,
      antesDeExecutar: () => {
        setLoading(true);
      },
      depoisDeExecutar: () => {
        setAtualizarAgendamentos(true);
        setLoading(false);
        setAbrirModalReagendamento(false);
      },
    });

    console.log(payload);
  }

  // carrega dados iniciais do registro
  useEffect(() => {
    if (!selectedRegistro) return;

    const inicio = dayjs(selectedRegistro.data_inicio);
    const fim = dayjs(selectedRegistro.data_fim);
    const horario = dayjs(selectedRegistro.data_agendamento).format("HH:mm:ss");

    setDataInicio(inicio.isValid() ? inicio.format("YYYY-MM-DD") : "");
    setDataFim(fim.isValid() ? fim.format("YYYY-MM-DD") : "");
    setHorario(horario);
  }, [selectedRegistro]);

  return (
    <Modal
      IsOpen={true}
      onClose={() => setAbrirModalReagendamento(false)}
      className="max-w-[60vh] min-h-auto"
    >
      <form className="w-full flex flex-col justify-center" onSubmit={regendar}>
        <h2 className="text-2xl font-bold mb-4">
          {`Reagendar locação de ${selectedRegistro?.cliente.nome}`}
        </h2>

        <FormGroup label="Data início" id="data_inicio">
          <Input
            type="date"
            id="data_inicio"
            value={dataInicio || ""}
            required
            onChange={(e) => handleChangeInicio(e.target.value)}
          />
        </FormGroup>

        <FormGroup label="Data fim" id="data_fim">
          <Input
            type="date"
            id="data_fim"
            value={dataFim || ""}
            required
            onChange={(e) => setDataFim(e.target.value)}
          />
        </FormGroup>

        <FormGroup label="Horario" id="horario">
          <Input
            type="time"
            id="horario"
            value={horario}
            required
            onChange={(e) => setHorario(e.target.value)}
          />
        </FormGroup>

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
          loading={loading}
        >
          Salvar
        </Button>
      </form>
    </Modal>
  );
}

export default Regendar;

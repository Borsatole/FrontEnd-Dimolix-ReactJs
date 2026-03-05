import React from "react";

interface CalendarDaysProps {
  daySelecionado: number | null;
  setDay: (day: number) => void;
}

function CalendarDays({ daySelecionado = 1, setDay }: CalendarDaysProps) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-4 sm:grid-cols-11 gap-1 p-3 border-2 border-[var(--base-color)] rounded-xl bg-[var(--base-variant)]">
      {days.map((day) => (
        <BtnDay
          key={day}
          day={day}
          selecionado={Number(daySelecionado) === Number(day)}
          onClick={() => setDay(day)}
        />
      ))}
    </div>
  );
}

export default CalendarDays;

interface BtnDayProps {
  day: number;
  selecionado: boolean;
  onClick: () => void;
}

export function BtnDay({ day, selecionado, onClick }: BtnDayProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        cursor-pointer
        w-10 h-10 flex items-center justify-center
        text-sm font-medium
        rounded-full
        border transition-all duration-200
        ${
          selecionado
            ? "bg-[var(--corPrincipal)] text-white border-[var(--corPrincipal)] shadow-md scale-105"
            : "bg-[var(--base-color)] border-[var(--base-variant)] hover:border-[var(--corPrincipal)] hover:bg-[var(--base-variant)]"
        }
      `}
    >
      {day}
    </button>
  );
}

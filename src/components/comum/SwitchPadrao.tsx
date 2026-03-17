import { ToggleSwitch } from "flowbite-react";

interface SwitchProps {
  color?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function SwitchPadrao({
  color = "bg-[var(--corPrincipal)]",
  checked,
  onChange,
}: SwitchProps) {
  const customTheme = {
    root: {
      base: "group flex rounded-full focus:outline-none",
      active: {
        on: "cursor-pointer",
        off: "cursor-not-allowed opacity-50",
      },
      label: "",
      input: "sr-only",
    },
    toggle: {
      base: `
        relative rounded-full
        ring-0 focus:ring-0 group-focus:ring-0
        after:absolute after:rounded-full
        after: bg-[var(--base-variant)]
        after:border-0
        after:transition-all
      `,
      checked: {
        on: `after:translate-x-full bg-[var(--corPrincipal)]`,
        off: "after:translate-x-0 bg-[var(--base-color)]",
      },
      sizes: {
        md: "h-6 w-11 after:left-0.5 after:top-0.5 after:h-5 after:w-5",
      },
    },
  };

  return (
    <ToggleSwitch
      checked={checked}
      onChange={onChange}
      theme={customTheme}
      sizing="md"
    />
  );
}

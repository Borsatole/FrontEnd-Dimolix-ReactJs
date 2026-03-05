import * as React from "react";

type OptionType = string | Record<string, any>;

interface SelectModificadoProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: OptionType[];
  placeholder?: string;
  labelKey?: string;
  valueKey?: string;
  label?: string;
  error?: string;
}

export const SelectAtualizado = React.forwardRef<
  HTMLSelectElement,
  SelectModificadoProps
>(
  (
    {
      options = [],
      placeholder = "Selecione uma opção",
      labelKey = "nome",
      valueKey = "id",
      className,
      label,
      error,
      disabled,
      ...rest
    },
    ref,
  ) => {
    return (
      <>
        <style>{`
          .select-wrapper {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 6px;
            font-family: 'DM Sans', 'Segoe UI', sans-serif;
          }

          .select-label {
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: var(--cortexto, #6b7280);
            padding-left: 2px;
          }

          .select-field-wrapper {
            position: relative;
            display: flex;
            align-items: center;
          }

          .select-styled {
            appearance: none;
            -webkit-appearance: none;
            width: 100%;
            padding: 10px 40px 10px 14px;
            font-size: 0.9rem;
            font-weight: 450;
            font-family: inherit;
            background-color: var(--base-color, #ffffff);
            border: 1.5px solid var(--base-variant, #e5e7eb);
            border-radius: 10px;
            cursor: pointer;
            outline: none;
            transition:
              border-color 0.18s ease,
              box-shadow 0.18s ease,
              background-color 0.18s ease;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
          }

          .select-styled:hover:not(:disabled) {
            border-color: var(--corPrincipal, #6366f1);
            background-color: var(--base-color, #fafafa);
          }

          .select-styled:focus {
            border-color: var(--corPrincipal, #6366f1);
            box-shadow:
              0 0 0 3px color-mix(in srgb, var(--corPrincipal, #6366f1) 15%, transparent),
              0 1px 2px rgba(0, 0, 0, 0.04);
          }

          .select-styled:disabled {
            opacity: 0.45;
            cursor: not-allowed;
            background-color: var(--base-variant, #f3f4f6);
          }

          .select-styled.has-error {
            border-color: #ef4444;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12);
          }

          .select-styled.has-error:focus {
            border-color: #ef4444;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.18);
          }

          .select-chevron {
            pointer-events: none;
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            width: 18px;
            height: 18px;
            color: var(--cortexto, #9ca3af);
            transition: color 0.18s ease, transform 0.18s ease;
          }

          .select-field-wrapper:focus-within .select-chevron {
            color: var(--corPrincipal, #6366f1);
            transform: translateY(-50%) rotate(180deg);
          }

          .select-error-msg {
            font-size: 0.75rem;
            color: #ef4444;
            padding-left: 2px;
            display: flex;
            align-items: center;
            gap: 4px;
          }
        `}</style>

        <div className={`select-wrapper ${className ?? ""}`}>
          {label && <span className="select-label">{label}</span>}

          <div className="select-field-wrapper">
            <select
              ref={ref}
              disabled={disabled}
              className={`select-styled${error ? " has-error" : ""}`}
              {...rest}
            >
              <option value="" disabled>
                {placeholder}
              </option>

              {options.map((option, index) => {
                if (typeof option === "string") {
                  return (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  );
                }
                return (
                  <option
                    key={option[valueKey] ?? index}
                    value={option[valueKey]}
                  >
                    {option[labelKey]}
                  </option>
                );
              })}
            </select>

            {/* Chevron icon */}
            <svg
              className="select-chevron"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 8l5 5 5-5" />
            </svg>
          </div>

          {error && (
            <span className="select-error-msg">
              <svg
                width="13"
                height="13"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </span>
          )}
        </div>
      </>
    );
  },
);

SelectAtualizado.displayName = "SelectModificado";

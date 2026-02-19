import { useEffect } from "react";
import ReactDOM from "react-dom";

function Modal({ IsOpen, onClose, children, ...rest }: any) {
  useEffect(() => {
    if (IsOpen) {
      document.body.style.overflow = "hidden"; // trava scroll
    } else {
      document.body.style.overflow = ""; // libera scroll
    }

    return () => {
      document.body.style.overflow = ""; // garante liberar ao desmontar
    };
  }, [IsOpen]);

  if (!IsOpen) return null;

  return ReactDOM.createPortal(
    <div
      {...rest}
      className="fixed inset-0 z-[30] bg-[var(--fundo-modal)]/90 flex items-center justify-center animate-fadeIn"
      onClick={onClose} // Clique fora fecha o modal
    >
      <div
        {...rest}
        className={`relative p-3 rounded w-[95%] lg:w-[55%] min-h-[60vh] max-h-[90vh] overflow-y-auto pt-10 animate-slideUp ${rest.className}`}
        style={{ backgroundColor: "var(--base-variant)" }}
        onClick={(e) => e.stopPropagation()} // Impede fechar clicando dentro
      >
        {/* Botão Close */}
        <button
          className="absolute top-4 right-4 text-[--var-text-color] hover:text-[--var-text-color] cursor-pointer"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {children}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>,
    document.body,
  );
}

export default Modal;

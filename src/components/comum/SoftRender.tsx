import { useEffect, useState } from "react";

interface AparecerProps {
  show: boolean;
  children: React.ReactNode;
}

export function SoftRender({ show, children }: AparecerProps) {
  const [renderizar, setRenderizar] = useState(false);

  useEffect(() => {
    if (show) {
      setRenderizar(true);
    }
  }, [show]);

  if (!renderizar) return;

  return (
    <>
      <style>
        {`
          @keyframes bounceInSoft {
            0% {
              opacity: 0;
              transform: scale(0.95) translateY(12px);
            }
            60% {
              opacity: 1;
              transform: scale(1.01) translateY(-3px);
            }
            100% {
              transform: scale(1) translateY(0);
            }
          }

          .animate-bounce-soft {
            animation: bounceInSoft 0.200s cubic-bezier(0.22, 1, 0.36, 1);
          }
        `}
      </style>

      <div className="animate-bounce-soft">{children}</div>
    </>
  );
}

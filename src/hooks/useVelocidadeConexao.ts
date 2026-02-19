import { useState } from "react";

export function useVelocidadeReal() {
  const [mbps, setMbps] = useState<number | null>(null);
  const [medindo, setMedindo] = useState(false);

  const medir = async () => {
    setMedindo(true);

    try {
      const url = `https://upload.wikimedia.org/wikipedia/commons/3/3f/Bikesgray.jpg?cache=${Date.now()}`;

      const inicio = performance.now();
      const res = await fetch(url, { cache: "no-store" });
      const buffer = await res.arrayBuffer();
      const fim = performance.now();

      const duracaoSegundos = (fim - inicio) / 1000;
      const bits = buffer.byteLength * 8;
      const resultado = bits / duracaoSegundos / 1_000_000;

      setMbps(parseFloat(resultado.toFixed(2)));
    } catch {
      setMbps(null);
    } finally {
      setMedindo(false);
    }
  };

  return { mbps, medindo, medir };
}

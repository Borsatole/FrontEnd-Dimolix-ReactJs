import React from "react";
import { Button } from "../button";
import { getIcon } from "@src/components/icons";

function Novoregistrobtn({ onClick, icone }: any) {
  return (
    <div className="flex justify-between">
      <Button onClick={onClick} className="mb-3">
        <p className="flex items-center gap-2">
          {getIcon(`${icone}`, 20)}
          <span>Novo registro</span>
        </p>
      </Button>
    </div>
  );
}

export default Novoregistrobtn;

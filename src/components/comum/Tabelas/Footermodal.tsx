import React from "react";
import { Button } from "../button";

function Footermodal({ loading, cancel }: any) {
  return (
    <>
      <div className="flex justify-end gap-4 p-4">
        <Button type="submit" className="w-full mt-4" loading={loading}>
          Salvar
        </Button>
      </div>
    </>
  );
}

export default Footermodal;

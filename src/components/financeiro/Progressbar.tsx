import React from "react";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

interface ProgressbarProps {
  progress: number;
  color: "green" | "red";
  label?: string;
}

const Style = styled(LinearProgress)<{ barcolor: string }>(
  ({ theme, barcolor }) => ({
    height: 20,
    borderRadius: 5,

    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.mode === "dark"
          ? "var(--base-variant)"
          : "var(--base-variant)",
    },

    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: barcolor,
    },
  }),
);

export default function Progressbar({ progress, color }: ProgressbarProps) {
  const percent = Math.min(progress * 100, 100);

  const barcolor = color === "green" ? "#15803d" : "#dc2626";

  return (
    <div className="flex flex-col gap-1 mt-2 mb-2">
      <Style variant="determinate" value={percent} barcolor={barcolor} />
    </div>
  );
}

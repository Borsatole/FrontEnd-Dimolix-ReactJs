import { Label } from "./label";

interface FormGroupProps {
  label?: string;
  id?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export function FormGroup({ label, id, children, ...rest }: FormGroupProps) {
  return (
    <div className="mb-2" {...rest}>
      <Label htmlFor={id || ""}>{label || ""}</Label>
      <div className="mt-2">{children || ""}</div>
    </div>
  );
}

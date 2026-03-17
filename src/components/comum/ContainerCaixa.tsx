export default function ContainerCaixa({ children, ...rest }: any) {
  return (
    <div
      className={`${rest.className} bg-[var(--base-variant)] rounded-2xl shadow-lg border border-[var(--base-color)] overflow-hidden mb-6 transition-all duration-300 p-3`}
    >
      {children}
    </div>
  );
}

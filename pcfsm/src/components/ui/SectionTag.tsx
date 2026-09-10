type Props = {
  index: string;
  label: string;
  className?: string;
};

/** Small vertical/mono editorial label, e.g. "01 / ABOUT PCFSM" */
export default function SectionTag({ index, label, className = "" }: Props) {
  return (
    <div className={`flex items-center gap-3 text-[11px] tracking-[0.28em] uppercase text-smoke ${className}`}>
      <span className="text-fire tabular">{index}</span>
      <span className="h-px w-8 bg-line" aria-hidden />
      <span>{label}</span>
    </div>
  );
}

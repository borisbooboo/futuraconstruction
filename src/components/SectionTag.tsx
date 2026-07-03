export function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-[0.2em] mb-3">
      <span className="h-px w-8 bg-accent" />
      {children}
    </div>
  );
}

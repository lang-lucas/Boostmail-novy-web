type StepCardProps = {
  step: number;
  title: string;
  description: string;
};

export function StepCard({ step, title, description }: StepCardProps) {
  return (
    <div className="group rounded-xl border border-border bg-surface-card p-7 transition-all duration-300 hover:border-border-hover hover:bg-surface-card-hover">
      <div className="mb-5 text-xs font-medium tracking-widest text-accent">
        0{step}
      </div>
      <h3 className="mb-2 text-lg font-medium tracking-tight text-white">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-text-muted">{description}</p>
    </div>
  );
}

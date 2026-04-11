type StepCardProps = {
  step: number;
  title: string;
  description: string;
};

export function StepCard({ step, title, description }: StepCardProps) {
  return (
    <div className="rounded-2xl border border-surface-card bg-surface-card p-8 transition-colors hover:border-brand/30">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-sm font-medium text-brand">
        {step}
      </div>
      <h3 className="mb-2 font-heading text-xl text-text-primary">{title}</h3>
      <p className="text-sm leading-relaxed text-text-secondary">
        {description}
      </p>
    </div>
  );
}

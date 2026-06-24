import type { MissingField } from "@/types";

type Props = {
	completionPercent: number;
	missingFields: MissingField[];
};

export function ProfileAttentionBanner({
	completionPercent,
	missingFields,
}: Props) {
	if (completionPercent === 100) return null;

	const radius = 34;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (completionPercent / 100) * circumference;

	return (
		<div className="flex items-start justify-between gap-6 rounded-2xl border border-border bg-surface p-6 shadow-card">
			<div className="flex flex-col gap-2">
				<p className="text-sm font-semibold text-text-primary">
					Profile needs attention
				</p>
				<p className="text-sm text-text-secondary">
					Fill in the required fields to complete your profile
				</p>
				<div className="mt-1 flex flex-wrap gap-2">
					{missingFields.map((field) => (
						<span
							key={field}
							className="rounded-sm bg-warning px-2 py-0.5 text-xs font-medium text-warning-foreground">
							{field.replace(/_/g, " ")}
						</span>
					))}
				</div>
			</div>
			<div className="relative size-22 shrink-0">
				<svg
					width="88"
					height="88"
					viewBox="0 0 88 88"
					className="-rotate-90">
					<circle
						cx="44"
						cy="44"
						r={radius}
						fill="none"
						stroke="var(--color-border)"
						strokeWidth="8"
					/>
					<circle
						cx="44"
						cy="44"
						r={radius}
						fill="none"
						stroke="var(--color-accent)"
						strokeWidth="8"
						strokeDasharray={circumference}
						strokeDashoffset={offset}
						strokeLinecap="round"
					/>
				</svg>
				<span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-text-primary">
					{completionPercent}%
				</span>
			</div>
		</div>
	);
}

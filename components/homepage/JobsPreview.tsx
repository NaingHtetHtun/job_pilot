const jobRows = [
	["Vercel", "94%", "$160k - $200k", "LinkedIn", "bg-success"],
	["Stripe", "88%", "$180k - $240k", "URL", "bg-info-medium"],
	["Linear", "96%", "$150k - $190k", "LinkedIn", "bg-success"],
	["Notion", "72%", "$130k - $170k", "LinkedIn", "bg-warning"],
	["OpenAI", "91%", "$200k - $280k", "LinkedIn", "bg-success"],
	["Figma", "85%", "$170k - $220k", "URL", "bg-info-medium"],
];

export function JobsPreview() {
	return (
		<div className="w-full max-w-115 rounded-2xl border border-border bg-surface p-5 shadow-card">
			<div className="grid grid-cols-[1.2fr_1fr_1.1fr_0.8fr] gap-3 border-b border-border pb-3 text-xs font-semibold tracking-wide text-text-secondary uppercase">
				<span>Company</span>
				<span>Match Score</span>
				<span>Salary Est.</span>
				<span>Source</span>
			</div>
			<div>
				{jobRows.map(([company, score, salary, source, color]) => (
					<div
						key={company}
						className="grid grid-cols-[1.2fr_1fr_1.1fr_0.8fr] items-center gap-3 border-b border-border py-4 last:border-b-0">
						<div className="flex items-center gap-3">
							<span className="flex size-7 items-center justify-center rounded-lg bg-surface-secondary text-xs font-semibold text-text-muted">
								◼
							</span>
							<span className="text-sm font-semibold text-text-primary">
								{company}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<span
								className={`h-1.5 w-9 rounded-full ${color}`}
							/>
							<span className="text-xs font-semibold text-text-primary">
								{score}
							</span>
						</div>
						<span className="text-sm font-medium text-text-secondary">
							{salary}
						</span>
						<span className="justify-self-start rounded-md bg-surface-secondary px-2 py-1 text-xs font-semibold text-info-foreground">
							{source}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

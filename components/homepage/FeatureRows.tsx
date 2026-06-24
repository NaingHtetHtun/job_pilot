type FeatureRow = {
	title: string;
	description: string;
	accent: string;
};

type Props = {
	rows: FeatureRow[];
};

export function FeatureRows({ rows }: Props) {
	return (
		<div>
			{rows.map((row) => (
				<div
					key={row.title}
					className={`border-t border-border px-8 py-7 sm:px-14 ${row.accent} border-l-2`}>
					<h3 className="text-lg leading-6 font-semibold text-text-primary">
						{row.title}
					</h3>
					<p className="mt-3 max-w-120 text-base leading-7 font-medium text-text-secondary">
						{row.description}
					</p>
				</div>
			))}
		</div>
	);
}

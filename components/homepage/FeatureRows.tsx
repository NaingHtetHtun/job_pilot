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
					<h3 className="text-lg font-semibold leading-6 text-text-primary">
						{row.title}
					</h3>
					<p className="mt-3 max-w-120 text-base font-medium leading-7 text-text-secondary">
						{row.description}
					</p>
				</div>
			))}
		</div>
	);
}

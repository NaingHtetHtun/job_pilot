import Image from "next/image";
import { FeatureRows } from "./FeatureRows";

const confidenceRows = [
	{
		title: "Understand your match score",
		description:
			"See how your profile lines up with each role before you apply. Get a clear breakdown of what fits and what's missing.",
		accent: "border-transparent",
	},
	{
		title: "AI-Powered Job Matching",
		description:
			"Stop guessing which jobs are worth applying to. JobPilot scores every role against your actual skills so you focus on the ones that matter.",
		accent: "border-success",
	},
	{
		title: "Focus on the right roles",
		description:
			"Filter out low fit jobs and stay on the ones that actually matter. Spend less time sorting and more time applying.",
		accent: "border-transparent",
	},
];

export function Features() {
	return (
		<section className="landing-grid border-b border-border">
			<div className="flex items-center justify-center bg-surface-tertiary px-6 py-14 sm:px-10 lg:border-r">
				<div className="landing-card-shadow overflow-hidden rounded-xl bg-overlay">
					<Image
						src="/images/agnet-log.png"
						alt="Agent log preview"
						width={2144}
						height={1656}
						className="h-auto w-full max-w-107.5"
					/>
				</div>
			</div>
			<div>
				<div className="px-8 py-14 sm:px-14 lg:py-16">
					<h2 className="max-w-110 text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.04em] text-text-slate">
						Apply With More Confidence, Every Time
					</h2>
				</div>
				<FeatureRows rows={confidenceRows} />
			</div>
		</section>
	);
}

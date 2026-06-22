import { FeatureRows } from "./FeatureRows";
import { JobsPreview } from "./JobsPreview";

const featureRows = [
	{
		title: "Find jobs that actually fit",
		description:
			"Search by title and location or paste a job link. Get matched roles you can quickly scan.",
		accent: "border-accent",
	},
	{
		title: "Know the Company Before You Apply",
		description:
			"Stop guessing what a company is about. JobPilot browses their site and gives you everything you need to apply with confidence.",
		accent: "border-transparent",
	},
	{
		title: "Keep track of every application",
		description:
			"Keep a clear view of every job you've found, tailored. Your activity and progress all stay in one simple place.",
		accent: "border-transparent",
	},
];

export function HowItWorks() {
	return (
		<section className="landing-grid border-b border-border">
			<div className="border-b border-border lg:border-b-0 lg:border-r">
				<div className="px-8 py-14 sm:px-14 lg:py-16">
					<h2 className="max-w-95 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-text-slate">
						Manage Your Job Search With Ease
					</h2>
				</div>
				<FeatureRows rows={featureRows} />
			</div>
			<div className="flex items-center justify-center bg-surface-tertiary px-6 py-14 sm:px-10">
				<JobsPreview />
			</div>
		</section>
	);
}

import Link from "next/link";

export function CTASection() {
	return (
		<section className="landing-hero-glow border-b border-border px-6 py-20 text-center sm:px-10 lg:py-24">
			<h2 className="mx-auto max-w-190 text-[clamp(2.25rem,5vw,4rem)] leading-none font-semibold tracking-[-0.045em] text-text-slate">
				Your next job search can feel a
				<br className="hidden sm:block" /> lot less overwhelming
			</h2>
			<p className="mx-auto mt-6 max-w-155 text-base leading-7 font-medium text-text-secondary">
				Set up your profile, upload your resume, and start finding
				matches in minutes.
			</p>
			<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
				<Link href="/login" className="landing-button-primary">
					Get Started <span aria-hidden="true">▶</span>
				</Link>
				<Link href="/find-jobs" className="landing-button-secondary">
					Find Your First Match
				</Link>
			</div>
		</section>
	);
}

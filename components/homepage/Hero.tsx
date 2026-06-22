import Image from "next/image";
import Link from "next/link";

export function Hero() {
	return (
		<section className="border-b border-border">
			<div className="landing-hero-glow border-b border-border px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-16">
				<h1 className="mx-auto max-w-180 text-[clamp(2.5rem,6vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-text-slate">
					Job hunting is hard.
					<br />
					Your tools shouldn&apos;t be.
				</h1>
				<p className="mx-auto mt-6 max-w-145 text-base font-medium leading-7 text-text-secondary">
					Stop applying blind. JobPilot finds the jobs, researches the
					companies, and gives you everything you need to stand out.
				</p>
				<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
					<Link href="/login" className="landing-button-primary">
						Get Started <span aria-hidden="true">▶</span>
					</Link>
					<Link
						href="/find-jobs"
						className="landing-button-secondary">
						Find Your First Match
					</Link>
				</div>
			</div>
			<div className="bg-surface-tertiary px-5 py-12 sm:px-10 lg:px-14">
				<div className="landing-browser-shadow mx-auto max-w-230 overflow-hidden rounded-[26px] border border-border bg-surface">
					<div className="flex h-10 items-center justify-between border-b border-border px-5">
						<div className="flex gap-2">
							<span className="h-2 w-2 rounded-full bg-border-light" />
							<span className="h-2 w-2 rounded-full bg-border-light" />
							<span className="h-2 w-2 rounded-full bg-border-light" />
						</div>
						<div className="flex h-6 w-[38%] items-center justify-center rounded-md bg-surface-secondary text-xs font-medium text-text-muted">
							jobpilot.ai/dashboard
						</div>
						<div className="w-16" />
					</div>
					<Image
						src="/images/dashboard-demo.png"
						alt="JobPilot dashboard preview"
						width={4788}
						height={2416}
						className="h-auto w-full"
						priority
					/>
				</div>
			</div>
		</section>
	);
}

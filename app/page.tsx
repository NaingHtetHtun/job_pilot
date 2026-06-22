import Image from "next/image";
import Link from "next/link";

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

const jobRows = [
	["Vercel", "94%", "$160k - $200k", "LinkedIn", "bg-success"],
	["Stripe", "88%", "$180k - $240k", "URL", "bg-info-medium"],
	["Linear", "96%", "$150k - $190k", "LinkedIn", "bg-success"],
	["Notion", "72%", "$130k - $170k", "LinkedIn", "bg-warning"],
	["OpenAI", "91%", "$200k - $280k", "LinkedIn", "bg-success"],
	["Figma", "85%", "$170k - $220k", "URL", "bg-info-medium"],
];

export default function Home() {
	return (
		<main className="min-h-screen bg-surface text-text-primary">
			<Navbar />
			<div className="mx-auto max-w-[1080px] border-x border-border bg-surface">
				<Hero />
				<FeatureSection />
				<ConfidenceSection />
				<SuccessStory />
				<BottomCta />
				<Footer />
			</div>
		</main>
	);
}

function Navbar() {
	return (
		<header className="border-b border-border bg-surface">
			<div className="mx-auto flex h-16 max-w-[1080px] items-center justify-between px-5 sm:px-8">
				<Link href="/" className="flex items-center gap-2.5">
					<Image
						src="/logo.png"
						alt="JobPilot"
						width={118}
						height={40}
						className="h-8 w-auto"
						priority
					/>
				</Link>
				<nav className="hidden items-center gap-10 text-sm font-medium text-text-dark md:flex">
					<Link href="/dashboard" className="hover:text-text-primary">
						Dashboard
					</Link>
					<Link href="/find-jobs" className="hover:text-text-primary">
						Find Jobs
					</Link>
					<Link href="/profile" className="hover:text-text-primary">
						Profile
					</Link>
				</nav>
				<Link
					href="/login"
					className="min-h-9 rounded-md bg-overlay px-5 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90">
					Start for free
				</Link>
			</div>
		</header>
	);
}

function Hero() {
	return (
		<section className="border-b border-border">
			<div className="landing-hero-glow border-b border-border px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-16">
				<h1 className="mx-auto max-w-[720px] text-[clamp(2.5rem,6vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-text-slate">
					Job hunting is hard.
					<br />
					Your tools shouldn&apos;t be.
				</h1>
				<p className="mx-auto mt-6 max-w-[580px] text-base font-medium leading-7 text-text-secondary">
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
				<div className="landing-browser-shadow mx-auto max-w-[920px] overflow-hidden rounded-[26px] border border-border bg-surface">
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

function FeatureSection() {
	return (
		<section className="landing-grid border-b border-border">
			<div className="border-b border-border lg:border-b-0 lg:border-r">
				<div className="px-8 py-14 sm:px-14 lg:py-16">
					<h2 className="max-w-[380px] text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-text-slate">
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

function ConfidenceSection() {
	return (
		<section className="landing-grid border-b border-border">
			<div className="flex items-center justify-center bg-surface-tertiary px-6 py-14 sm:px-10 lg:border-r">
				<div className="landing-card-shadow overflow-hidden rounded-xl bg-overlay">
					<Image
						src="/images/agnet-log.png"
						alt="Agent log preview"
						width={2144}
						height={1656}
						className="h-auto w-full max-w-[430px]"
					/>
				</div>
			</div>
			<div>
				<div className="px-8 py-14 sm:px-14 lg:py-16">
					<h2 className="max-w-[440px] text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-text-slate">
						Apply With More Confidence, Every Time
					</h2>
				</div>
				<FeatureRows rows={confidenceRows} />
			</div>
		</section>
	);
}

function FeatureRows({
	rows,
}: {
	rows: { title: string; description: string; accent: string }[];
}) {
	return (
		<div>
			{rows.map((row) => (
				<div
					key={row.title}
					className={`border-t border-border px-8 py-7 sm:px-14 ${row.accent} border-l-2`}>
					<h3 className="text-lg font-semibold leading-6 text-text-primary">
						{row.title}
					</h3>
					<p className="mt-3 max-w-[480px] text-base font-medium leading-7 text-text-secondary">
						{row.description}
					</p>
				</div>
			))}
		</div>
	);
}

function JobsPreview() {
	return (
		<div className="w-full max-w-[460px] rounded-2xl border border-border bg-surface p-5 shadow-card">
			<div className="grid grid-cols-[1.2fr_1fr_1.1fr_0.8fr] gap-3 border-b border-border pb-3 text-xs font-semibold uppercase tracking-wide text-text-secondary">
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
							<span className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-secondary text-xs font-semibold text-text-muted">
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

function SuccessStory() {
	return (
		<section className="border-b border-border px-6 py-20 text-center sm:px-12 lg:py-24">
			<p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
				Success Stories
			</p>
			<blockquote className="mx-auto mt-7 max-w-[760px] text-[clamp(1.65rem,3vw,2.35rem)] font-medium leading-[1.22] tracking-[-0.035em] text-text-slate-medium">
				“I used to spend my evenings copy-pasting resumes. Now I open my
				dashboard to see interviews waiting. It feels like cheating. Had
				3 offers on the table simultaneously.”
			</blockquote>
			<div className="mt-8 flex items-center justify-center gap-3">
				<Image
					src="/images/user-icon.png"
					alt="Tom Wilson"
					width={48}
					height={48}
					className="h-12 w-12 rounded-full"
				/>
				<div className="text-left">
					<p className="text-sm font-semibold text-text-primary">
						Tom Wilson
					</p>
					<p className="text-xs font-medium text-text-secondary">
						Junior Developer
					</p>
				</div>
			</div>
		</section>
	);
}

function BottomCta() {
	return (
		<section className="landing-hero-glow border-b border-border px-6 py-20 text-center sm:px-10 lg:py-24">
			<h2 className="mx-auto max-w-[760px] text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1] tracking-[-0.045em] text-text-slate">
				Your next job search can feel a
				<br className="hidden sm:block" /> lot less overwhelming
			</h2>
			<p className="mx-auto mt-6 max-w-[620px] text-base font-medium leading-7 text-text-secondary">
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

function Footer() {
	return (
		<footer className="flex flex-col items-center justify-between gap-8 px-8 py-14 sm:flex-row">
			<Link href="/" className="flex items-center gap-2.5">
				<Image
					src="/logo.png"
					alt="JobPilot"
					width={118}
					height={40}
					className="h-8 w-auto"
				/>
			</Link>
			<nav className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-text-secondary">
				<Link href="/dashboard" className="hover:text-text-primary">
					Dashboard
				</Link>
				<Link
					href="/privacy-policy"
					className="hover:text-text-primary">
					Privacy Policy
				</Link>
				<Link href="/terms" className="hover:text-text-primary">
					Terms &amp; Condition
				</Link>
			</nav>
		</footer>
	);
}

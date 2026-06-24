import Image from "next/image";

export function SuccessStory() {
	return (
		<section className="border-b border-border px-6 py-20 text-center sm:px-12 lg:py-24">
			<p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">
				Success Stories
			</p>
			<blockquote className="mx-auto mt-7 max-w-190 text-[clamp(1.65rem,3vw,2.35rem)] leading-[1.22] font-medium tracking-[-0.035em] text-text-slate-medium">
				&ldquo;I used to spend my evenings copy-pasting resumes. Now I
				open my dashboard to see interviews waiting. It feels like
				cheating. Had 3 offers on the table simultaneously.&rdquo;
			</blockquote>
			<div className="mt-8 flex items-center justify-center gap-3">
				<Image
					src="/images/user-icon.png"
					alt="Tom Wilson"
					width={48}
					height={48}
					className="size-12 rounded-full"
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

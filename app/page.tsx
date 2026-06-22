import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/homepage/Hero";
import { HowItWorks } from "@/components/homepage/HowItWorks";
import { Features } from "@/components/homepage/Features";
import { SuccessStory } from "@/components/homepage/SuccessStory";
import { CTASection } from "@/components/homepage/CTASection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
	return (
		<main className="min-h-screen bg-surface text-text-primary">
			<Navbar />
			<div className="mx-auto max-w-270 **:not-[]:border-x border-border bg-surface">
				<Hero />
				<HowItWorks />
				<Features />
				<SuccessStory />
				<CTASection />
				<Footer />
			</div>
		</main>
	);
}

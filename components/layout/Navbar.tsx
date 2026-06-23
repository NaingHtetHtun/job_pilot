import Image from "next/image";
import Link from "next/link";
import { signOut } from "@/actions/auth";

type NavbarProps = {
  isAuthenticated?: boolean;
};

export function Navbar({ isAuthenticated }: NavbarProps) {
	return (
		<header className="border-b border-border bg-surface">
			<div className="mx-auto flex h-16 max-w-270 items-center justify-between px-5 sm:px-8">
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
				{isAuthenticated ? (
					<form action={signOut}>
						<button
							type="submit"
							className="min-h-9 rounded-md bg-overlay px-5 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
						>
							Log out
						</button>
					</form>
				) : (
					<Link
						href="/login"
						className="min-h-9 rounded-md bg-overlay px-5 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
					>
						Start for free
					</Link>
				)}
			</div>
		</header>
	);
}

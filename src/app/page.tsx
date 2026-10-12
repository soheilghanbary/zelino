import { SiteHeader } from '@/components/site-header'
import {
	LandingCta,
	LandingFeatures,
	LandingFooter,
	LandingHero,
} from '@/features/landing'

export default function Home() {
	return (
		<div className="relative isolate flex min-h-svh flex-col">
			<div
				aria-hidden="true"
				className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
			/>
			<div
				aria-hidden="true"
				className="mask-[radial-gradient(ellipse_70%_60%_at_50%_0%,#000_20%,transparent_100%)] pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[32px_32px] opacity-60 dark:opacity-30"
			/>

			<SiteHeader />

			<main className="flex flex-1 flex-col gap-20 pb-20 md:gap-28">
				<LandingHero />
				<LandingFeatures />
				<LandingCta />
			</main>

			<LandingFooter />
		</div>
	)
}

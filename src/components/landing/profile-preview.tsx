import { GlobeIcon, LockIcon, MailIcon } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/assets/icons'
import { appConfig } from '@/config'

const skills = ['TypeScript', 'Next.js', 'PostgreSQL', 'Design systems']

const links = [GithubIcon, LinkedinIcon, GlobeIcon, MailIcon]

/**
 * A static mock of a public profile, used as the hero visual. It is purely
 * decorative — the real page lives at /[username] — so it stays aria-hidden
 * and every link affordance is a span rather than a focusable element.
 */
export function ProfilePreview() {
	return (
		<div aria-hidden="true" className="relative mx-auto w-full max-w-sm">
			<div className="bg-card/50 absolute inset-0 -z-10 translate-x-3 translate-y-3 rotate-[1.5deg] rounded-2xl border" />
			<div className="absolute -inset-8 -z-20 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--primary)_9%,transparent),transparent_70%)] blur-2xl" />

			<div className="bg-card shadow-foreground/[0.06] overflow-hidden rounded-2xl border shadow-xl lg:-rotate-[1.25deg] lg:transition-transform lg:duration-700 lg:ease-out lg:hover:rotate-0">
				<div className="bg-muted/30 flex items-center gap-2 border-b px-3 py-2">
					<span className="flex gap-1">
						<span className="bg-border size-1.5 rounded-full" />
						<span className="bg-border size-1.5 rounded-full" />
						<span className="bg-border size-1.5 rounded-full" />
					</span>
					<span className="bg-background/70 text-muted-foreground flex min-w-0 flex-1 items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[0.6rem]">
						<LockIcon className="size-2.5 shrink-0" />
						<span className="truncate">
							{appConfig.siteDomain}/{appConfig.showcaseUsername}
						</span>
					</span>
				</div>

				<div className="p-5">
					<div className="flex items-start gap-3">
						<span className="bg-foreground font-heading text-background flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
							SG
						</span>
						<div className="min-w-0">
							<div className="flex flex-wrap items-center gap-1.5">
								<p className="font-heading truncate font-semibold tracking-tight">
									Soheil Ghanbary
								</p>
								<span className="rounded-full border border-emerald-600/20 bg-emerald-600/10 px-1.5 py-0.5 text-[0.6rem] font-medium text-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-300">
									Open to work
								</span>
							</div>
							<p className="text-muted-foreground text-xs">
								Full-stack engineer
							</p>
							<p className="text-muted-foreground mt-2 text-xs/5">
								Building calm tools for people who ship.
							</p>
						</div>
					</div>

					<div className="mt-4 flex flex-wrap gap-1.5">
						{skills.map((skill) => (
							<span
								className="bg-background text-foreground/80 rounded-full border px-2 py-0.5 text-[0.65rem]"
								key={skill}
							>
								{skill}
							</span>
						))}
					</div>

					<div className="mt-5 border-t pt-4">
						<p className="text-muted-foreground font-mono text-[0.55rem] tracking-[0.16em] uppercase">
							Experience
						</p>
						<div className="mt-3 flex items-baseline justify-between gap-3 text-xs">
							<span className="truncate font-medium">Zelino — Founder</span>
							<span className="text-muted-foreground shrink-0 font-mono text-[0.6rem]">
								2024 — Now
							</span>
						</div>
						<p className="text-muted-foreground mt-1 text-xs/5">
							One link for your whole career.
						</p>
					</div>

					<div className="mt-5 flex items-center gap-1.5">
						{links.map((Icon, index) => (
							<span
								className="bg-background text-muted-foreground flex size-7 items-center justify-center rounded-full border"
								key={`${Icon.name}-${index}`}
							>
								<Icon className="size-3.5" />
							</span>
						))}
						<span className="text-muted-foreground ms-auto font-mono text-[0.6rem]">
							{appConfig.siteDomain}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

import { ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react'
import Link from 'next/link'
import { GithubIcon } from '@/assets/icons'
import { Logo } from '@/assets/logo'
import { CrystalShowcase } from '@/components/landing/crystal-showcase'
import { ProfilePreview } from '@/components/landing/profile-preview'
import { Button } from '@/components/ui/button'
import { CursorDrivenParticleTypography } from '@/components/ui/cursor-driven-particle-typography'
import { appConfig } from '@/config'

const steps = [
	{
		body: 'Sign in with Google or email. Your link is reserved instantly.',
		label: 'Sign in',
	},
	{
		body: 'Add a summary, your roles, and the skills you actually use.',
		label: 'Fill it in',
	},
	{
		body: 'Copy the URL and put it anywhere a résumé used to go.',
		label: 'Share',
	},
]

export default function Home() {
	return (
		<main className="relative isolate overflow-hidden">
			{/* Hero */}
			<section className="mx-auto grid w-full max-w-6xl items-center gap-16 px-4 pt-14 pb-20 md:px-6 md:pt-20 md:pb-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
				<div className="flex flex-col items-start gap-6">
					<span
						className="bg-background/60 text-muted-foreground motion-safe:animate-rise-in inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-sm"
						style={{ animationDelay: '60ms' }}
					>
						<span className="relative flex size-1.5">
							<span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
							<span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
						</span>
						Free & open source
					</span>

					<h1
						className="font-heading motion-safe:animate-rise-in text-4xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl"
						style={{ animationDelay: '140ms' }}
					>
						A career page that
						<br className="hidden sm:block" /> isn&rsquo;t a template.
					</h1>

					<p
						className="text-muted-foreground motion-safe:animate-rise-in max-w-md text-base/7 text-pretty md:text-lg/8"
						style={{ animationDelay: '240ms' }}
					>
						Turn the work you already have into one quiet, legible page. No
						themes, no page builder — just a structured profile that reads like
						you.
					</p>

					<div
						className="motion-safe:animate-rise-in flex flex-col items-start gap-4"
						style={{ animationDelay: '340ms' }}
					>
						<div className="flex flex-wrap items-center gap-2">
							<Button
								className="h-11 gap-2 rounded-full px-5 text-sm"
								nativeButton={false}
								render={<Link href="/login" />}
							>
								Claim your link <ArrowRightIcon data-icon="inline-end" />
							</Button>
							<Button
								className="h-11 gap-1.5 rounded-full px-4 text-sm"
								nativeButton={false}
								render={<Link href={`/${appConfig.showcaseUsername}`} />}
								variant="ghost"
							>
								See a live profile
								<ArrowUpRightIcon
									data-icon="inline-end"
									className="opacity-60"
								/>
							</Button>
						</div>

						<p className="text-muted-foreground flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.12em] uppercase">
							<Logo aria-hidden className="size-3.5 opacity-50" />
							{appConfig.siteDomain}/you
						</p>
					</div>
				</div>

				<div
					className="motion-safe:animate-settle-in"
					style={{ animationDelay: '260ms' }}
				>
					<ProfilePreview />
				</div>
			</section>

			{/* How */}
			<section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-20">
				<div className="grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
					<div
						className="motion-safe:animate-rise-in flex flex-col gap-3"
						style={{ animationDelay: '120ms' }}
					>
						<p className="text-muted-foreground font-mono text-[0.7rem] tracking-[0.12em] uppercase">
							Three steps
						</p>
						<h2 className="font-heading text-2xl font-semibold tracking-tight text-balance">
							Ten minutes, once.
						</h2>
					</div>

					<ol className="flex flex-col">
						{steps.map((step, index) => (
							<li
								className="motion-safe:animate-rise-in grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4 gap-y-1 border-t py-6 first:border-t-0 first:pt-0 sm:grid-cols-[2.5rem_10rem_minmax(0,1fr)] sm:items-baseline sm:gap-y-0"
								key={step.label}
								style={{ animationDelay: `${180 + index * 90}ms` }}
							>
								<span className="text-muted-foreground font-mono text-xs">
									{String(index + 1).padStart(2, '0')}
								</span>
								<span className="font-heading text-sm font-semibold">
									{step.label}
								</span>
								<p className="text-muted-foreground col-start-2 text-sm/6 text-pretty sm:col-start-3">
									{step.body}
								</p>
							</li>
						))}
					</ol>
				</div>
			</section>

			{/* Closing */}
			<section className="mx-auto w-full max-w-6xl">
				<div className="relative isolate overflow-hidden">
					<div className="grid items-center gap-4 lg:grid-cols-[minmax(0,1fr)_36rem] lg:px-6">
						<div
							className="motion-safe:animate-settle-in relative h-100 w-full overflow-hidden"
							style={{ animationDelay: '80ms' }}
						>
							<CrystalShowcase />
						</div>
						<div className="flex flex-col items-center text-center lg:items-start lg:text-left">
							<Logo
								aria-hidden
								className="motion-safe:animate-rise-in size-6 opacity-70"
								style={{ animationDelay: '160ms' }}
							/>
							<h2
								className="font-heading motion-safe:animate-rise-in mt-4 text-3xl font-extrabold tracking-tight text-balance md:text-4xl"
								style={{ animationDelay: '240ms' }}
							>
								Ready when you are.
							</h2>
							<p
								className="text-muted-foreground motion-safe:animate-rise-in mt-3 max-w-sm text-sm/6 text-pretty"
								style={{ animationDelay: '320ms' }}
							>
								Your page takes a few minutes to set up and no time at all to
								keep.
							</p>
							<div
								className="motion-safe:animate-rise-in mt-8 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
								style={{ animationDelay: '400ms' }}
							>
								<Button
									className="h-10 gap-2 rounded-full px-5"
									nativeButton={false}
									render={<Link href="/login" />}
								>
									Create your page <ArrowRightIcon data-icon="inline-end" />
								</Button>
								<Button
									className="text-muted-foreground h-10 gap-1.5 rounded-full px-4"
									nativeButton={false}
									render={
										<a
											href={appConfig.repoUrl}
											rel="noreferrer noopener"
											target="_blank"
										/>
									}
									variant="ghost"
								>
									<GithubIcon />
									View source
								</Button>
							</div>
						</div>
					</div>
				</div>
				<div className="flex h-60 w-full items-center justify-center">
					<CursorDrivenParticleTypography text="ZELINO" />
				</div>
			</section>
		</main>
	)
}

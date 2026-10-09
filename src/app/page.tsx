import { ArrowRightIcon, GalleryVerticalEndIcon } from 'lucide-react'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'

const GITHUB_REPO_URL = 'https://github.com/soheilghanbary/stack'

const FEATURE_TAGS = ['Skills', 'Experience', 'Open source', 'Contact']

const HEADLINE = ['One link for your', 'whole career.']
const SUBHEADLINE =
	'Skills, roles, and links in one place. Build a profile that reads like you, not like a template.'

export default function Home() {
	return (
		<div className="relative isolate flex min-h-svh flex-col">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_25%,color-mix(in_oklch,var(--primary)_14%,transparent),transparent_70%)]"
			/>
			<div
				aria-hidden="true"
				className="mask-[radial-gradient(ellipse_65%_65%_at_50%_40%,#000_25%,transparent_100%)] pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[32px_32px] opacity-60 dark:opacity-30"
			/>

			<SiteHeader />

			<main className="flex flex-1 items-center justify-center">
				<section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8 px-6 py-24 text-center">
					<span className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3.5 py-1.5 font-medium text-muted-foreground text-xs backdrop-blur-sm motion-safe:animate-zoom-in">
						<GalleryVerticalEndIcon className="size-3.5 text-primary" />
						Your career, structured
					</span>

					<h1 className="text-balance font-black text-4xl tracking-tighter md:text-6xl">
						<span className="block motion-safe:animate-delay-100 motion-safe:animate-fade-in-up">
							{HEADLINE[0]}
						</span>
						<span className="block text-muted-foreground motion-safe:animate-delay-200 motion-safe:animate-fade-in-up">
							{HEADLINE[1]}
						</span>
					</h1>

					<p className="max-w-xl text-pretty text-base text-muted-foreground motion-safe:animate-delay-300 motion-safe:animate-fade-in-up md:text-lg">
						{SUBHEADLINE}
					</p>

					<div className="flex w-full flex-col items-stretch gap-3 motion-safe:animate-delay-400 motion-safe:animate-fade-in-up sm:w-auto sm:flex-row">
						<Button
							nativeButton={false}
							render={<Link href="/login" />}
							size="lg"
							className="h-11 px-6 text-base"
						>
							Create your page
							<ArrowRightIcon data-icon="inline-end" />
						</Button>
						<Button
							nativeButton={false}
							render={<Link href={GITHUB_REPO_URL} />}
							variant="outline"
							size="lg"
							className="h-11 px-6 text-base"
						>
							View on GitHub
						</Button>
					</div>

					<ul className="mt-2 flex flex-wrap items-center justify-center gap-2 motion-safe:animate-delay-500 motion-safe:animate-fade-in-up">
						{FEATURE_TAGS.map((tag) => (
							<li
								key={tag}
								className="rounded-full border bg-background/60 px-3 py-1 font-medium text-muted-foreground text-xs backdrop-blur-sm"
							>
								{tag}
							</li>
						))}
					</ul>
				</section>
			</main>
		</div>
	)
}

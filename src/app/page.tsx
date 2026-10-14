import { ArrowRightIcon, GalleryVerticalEndIcon } from 'lucide-react'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { appConfig } from '@/config'

export default function Home() {
	return (
		<div className="relative isolate flex min-h-svh flex-col">
			<SiteHeader />

			<main className="flex flex-1 items-center justify-center px-4 py-24 md:px-6">
				<section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
					<span className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3.5 py-1.5 font-medium text-muted-foreground text-xs backdrop-blur-sm motion-safe:animate-blurred-fade-in">
						<GalleryVerticalEndIcon
							aria-hidden
							className="size-3.5 text-primary"
						/>
						One link for your whole career
					</span>

					<h1 className="text-balance font-extrabold font-heading text-4xl tracking-tight motion-safe:animate-blurred-fade-in motion-safe:animate-delay-100 md:text-6xl">
						Your career, in one <span className="text-primary">link.</span>
					</h1>

					<p className="max-w-lg text-pretty text-base text-muted-foreground motion-safe:animate-blurred-fade-in motion-safe:animate-delay-200 md:text-lg">
						Skills, roles, and links in one place. Build a profile that reads
						like you, not like a template.
					</p>

					<div className="flex w-full flex-col items-stretch gap-3 motion-safe:animate-blurred-fade-in motion-safe:animate-delay-250 sm:w-auto sm:flex-row">
						<Button
							nativeButton={false}
							render={<Link href="/login" />}
							size="lg"
						>
							Create your page
							<ArrowRightIcon data-icon="inline-end" />
						</Button>
						<Button
							nativeButton={false}
							render={<Link href={`/${appConfig.showcaseUsername}`} />}
							size="lg"
							variant="outline"
						>
							See a live profile
						</Button>
					</div>
				</section>
			</main>
		</div>
	)
}

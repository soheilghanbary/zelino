import { ArrowRightIcon, GalleryVerticalEndIcon } from 'lucide-react'
import Link from 'next/link'
import HalftoneReveal from '@/components/HalftoneReveal'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'

export default function Home() {
	return (
		<div className="relative isolate flex min-h-svh flex-col">
			<SiteHeader />
			<main className="flex flex-1 items-center p-6">
				<section className="mx-auto grid w-full max-w-5xl items-center gap-8 lg:grid-cols-2 lg:gap-16">
					<div className="relative h-90 w-full overflow-hidden rounded-2xl border border-border/60 shadow-foreground/5 shadow-sm dark:shadow-black">
						<HalftoneReveal
							src="https://images.unsplash.com/photo-1693252258249-5ef8b8b1a0ed?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
							mode="duotone"
							shape="dot"
							cellSize={5}
							angle={45}
							dotScale={1}
							revealRadius={160}
							softness={0.6}
							linger={1.2}
						/>
					</div>

					<div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
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
						<Button
							nativeButton={false}
							render={<Link href="/login" />}
							size="lg"
						>
							Create your page
							<ArrowRightIcon data-icon="inline-end" />
						</Button>
					</div>
				</section>
			</main>
		</div>
	)
}

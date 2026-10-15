import { ArrowRightIcon, GalleryVerticalEndIcon } from 'lucide-react'
import Link from 'next/link'
import HalftoneReveal from '@/components/HalftoneReveal'
import { SiteHeader } from '@/components/site-header'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { appConfig } from '@/config'

const EXAMPLE_SKILLS = ['TypeScript', 'React', 'Design systems']

export default function Home() {
	return (
		<div className="relative isolate flex min-h-svh flex-col">
			<SiteHeader />

			<main className="flex flex-1 items-center px-4 py-16 md:px-6 md:py-24">
				<section className="mx-auto grid w-full max-w-5xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
					<div className="relative h-120 w-full overflow-hidden rounded-2xl border border-border/60 shadow-foreground/5 shadow-xl dark:shadow-black">
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
						<div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-background/75 via-background/25 to-transparent p-5">
							<div className="pointer-events-auto flex items-center gap-3 rounded-xl border border-white/20 bg-background/30 p-3 backdrop-blur-xl backdrop-saturate-150 supports-backdrop-filter:bg-background/20 dark:border-white/10 dark:bg-background/25">
								<Avatar className="size-11 rounded-full">
									<AvatarImage src={'https://github.com/soheilghanbary.png'} />
								</Avatar>
								<div className="min-w-0">
									<p className="truncate font-medium text-foreground">
										Soheil Ghanbary
									</p>
									<p className="truncate text-muted-foreground text-sm">
										Full Stack Engineer
									</p>
									<div className="mt-1.5 flex flex-wrap gap-1.5">
										{EXAMPLE_SKILLS.map((skill) => (
											<Badge
												key={skill}
												variant="secondary"
												className="px-2 py-0 text-xs"
											>
												{skill}
											</Badge>
										))}
									</div>
								</div>
							</div>
						</div>
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
					</div>
				</section>
			</main>
		</div>
	)
}

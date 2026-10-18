import { ArrowRightIcon, GalleryVerticalEndIcon } from 'lucide-react'
import Link from 'next/link'
import CrystalizedBall from '@/components/CrystalizedBall'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'

export default function Home() {
	return (
		<div className="relative isolate flex min-h-svh flex-col">
			<main className="flex flex-1 items-center p-6">
				<section className="mx-auto grid w-full max-w-6xl items-center gap-0 p-3 lg:grid-cols-2">
					<div className="relative h-80 w-full overflow-hidden rounded-xl lg:h-110">
						{/* <HalftoneReveal
							src="https://images.unsplash.com/photo-1693252258249-5ef8b8b1a0ed?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
							mode="duotone"
							shape="dot"
							cellSize={5}
							angle={45}
							dotScale={1}
							revealRadius={160}
							softness={0.6}
							linger={1.2}
						/> */}
						<CrystalizedBall
							preset="solar"
							color="#1F75EC"
							size={0.7}
							crackle={0.7}
							fill={0.55}
							interactive
							hoverStrength={0.7}
							strands={6}
							flares={1}
							glow={1.1}
							sparks={0.5}
							particleCount={15000}
							motion="orbit"
							particleShape="square"
							depth={0.6}
							sway={0.7}
							twinkle={0.5}
							haze={0.8}
							dustSpeed={1}
							speed={1}
							intro
							paused={false}
						/>
					</div>

					<div className="mb-2 flex flex-col items-center gap-4 text-center lg:mb-0 lg:items-start lg:text-left">
						<span className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-4 py-2 font-medium text-muted-foreground text-xs backdrop-blur-sm motion-safe:animate-blurred-fade-in">
							<GalleryVerticalEndIcon
								aria-hidden
								className="size-3.5 text-primary"
							/>
							Make your work speak
						</span>
						<h1 className="text-balance font-extrabold font-heading text-4xl tracking-tight motion-safe:animate-blurred-fade-in motion-safe:animate-delay-100 md:text-6xl">
							Define Your Career
						</h1>
						<p className="max-w-lg text-pretty text-base text-muted-foreground motion-safe:animate-blurred-fade-in motion-safe:animate-delay-200 md:text-lg">
							Skills, roles, and links in one place. Build a profile that reads
							like you, not like a template.
						</p>
						<Button
							nativeButton={false}
							render={<Link href="/login" />}
							size="lg"
							className={
								'motion-safe:animate-blurred-fade-in motion-safe:animate-delay-300'
							}
						>
							Create your page <ArrowRightIcon data-icon="inline-end" />
						</Button>
					</div>
				</section>
			</main>
			<SiteFooter />
		</div>
	)
}

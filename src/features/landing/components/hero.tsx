import { ArrowRightIcon, GalleryVerticalEndIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { appConfig } from '@/config'
import { HERO } from '../data'
import { HeroPreview } from './preview'

export function LandingHero() {
	return (
		<section className="mx-auto w-full max-w-5xl px-4 pt-12 pb-16 md:px-6 md:pt-20 md:pb-24">
			<div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
				<div className="flex flex-col items-start gap-6">
					<span className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3.5 py-1.5 font-medium text-muted-foreground text-xs backdrop-blur-sm motion-safe:animate-zoom-in">
						<GalleryVerticalEndIcon
							aria-hidden
							className="size-3.5 text-primary"
						/>
						{HERO.eyebrow}
					</span>

					<h1 className="text-balance font-extrabold font-heading text-4xl tracking-tight md:text-6xl">
						<span className="block motion-safe:animate-delay-100 motion-safe:animate-fade-in-up">
							{HERO.headline[0]}
						</span>
						<span className="block text-muted-foreground motion-safe:animate-delay-150 motion-safe:animate-fade-in-up">
							{HERO.headline[1]}
						</span>
					</h1>

					<p className="max-w-lg text-pretty text-base text-muted-foreground motion-safe:animate-delay-200 motion-safe:animate-fade-in-up md:text-lg">
						{HERO.subheadline}
					</p>

					<div className="flex w-full flex-col items-stretch gap-3 motion-safe:animate-delay-250 motion-safe:animate-fade-in-up sm:w-auto sm:flex-row">
						<Button
							nativeButton={false}
							render={<Link href="/login" />}
							size="lg"
						>
							{HERO.primaryCta}
							<ArrowRightIcon data-icon="inline-end" />
						</Button>
						<Button
							nativeButton={false}
							render={<Link href={`/${appConfig.showcaseUsername}`} />}
							size="lg"
							variant="outline"
						>
							{HERO.secondaryCta}
						</Button>
					</div>
				</div>

				<div className="flex justify-center motion-safe:animate-delay-300 motion-safe:animate-fade-in-up lg:justify-end">
					<HeroPreview />
				</div>
			</div>
		</section>
	)
}

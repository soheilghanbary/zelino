import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CTA } from '../data'

export function LandingCta() {
	return (
		<section className="mx-auto w-full max-w-5xl px-4 md:px-6">
			<div className="flex flex-col items-start gap-5 rounded-2xl border bg-card/60 p-8 md:items-center md:p-14 md:text-center">
				<h2 className="text-balance font-bold font-heading text-2xl tracking-tight md:text-3xl">
					{CTA.title}
				</h2>
				<p className="max-w-md text-pretty text-base/7 text-muted-foreground">
					{CTA.description}
				</p>
				<Button nativeButton={false} render={<Link href="/login" />} size="lg">
					{CTA.action}
					<ArrowRightIcon data-icon="inline-end" />
				</Button>
			</div>
		</section>
	)
}

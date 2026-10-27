import { cn } from 'cn'
import Link from 'next/link'
import { Suspense } from 'react'
import { Logo } from '@/assets/logo'
import { AuthMenu } from './auth-menu'
import { ModeToggle } from './mode-toggle'
import { SiteHeaderShell } from './site-header-shell'
import { Button } from './ui/button'
import { Spinner } from './ui/spinner'

type Props = {
	className?: string
}

export function SiteHeader({ className }: Props) {
	return (
		<SiteHeaderShell>
			<div
				className={cn(
					'mx-auto flex h-14 w-full max-w-6xl items-center',
					'gap-3 px-4 md:h-16 md:px-6',
					// The glass pill: translucent, saturated and blurred so the page
					// scrolls under it without the nav turning into a grey smear.
					'border-border/60 pointer-events-auto rounded-full border',
					'bg-background/60 shadow-lg shadow-black/5 backdrop-blur-xl',
					'supports-backdrop-filter:bg-background/55 supports-backdrop-filter:backdrop-saturate-150',
					className
				)}
			>
				<Link
					href="/"
					className={cn(
						'group -ms-1.5 flex shrink-0 items-center gap-2',
						'rounded-lg px-1.5 py-1 outline-none',
						'focus-visible:ring-ring/50 focus-visible:ring-[3px]'
					)}
				>
					<Logo aria-hidden="true" className="size-5" />
					<span className="font-heading text-base font-bold tracking-tight uppercase">
						Zelino
					</span>
				</Link>

				<div className="ms-auto flex items-center gap-1">
					<ModeToggle />
					<Suspense
						fallback={
							<Button size="icon" variant="ghost" disabled>
								<Spinner />
							</Button>
						}
					>
						<AuthMenu />
					</Suspense>
				</div>
			</div>
		</SiteHeaderShell>
	)
}

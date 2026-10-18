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
					'mx-auto flex h-14 w-full max-w-5xl items-center',
					'gap-3 px-4 md:h-16 md:px-6',
					className
				)}
			>
				<Link
					href="/"
					className={cn(
						'group -ms-1.5 flex shrink-0 items-center gap-2',
						'rounded-lg px-1.5 py-1 outline-none',
						'focus-visible:ring-[3px] focus-visible:ring-ring/50'
					)}
				>
					<Logo aria-hidden="true" className="size-5" />
					<span className="font-bold font-heading text-base uppercase tracking-tight">
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

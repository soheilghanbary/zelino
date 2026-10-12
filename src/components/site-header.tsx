'use client'
import { cn } from 'cn'
import Link from 'next/link'
import { AuthMenu } from './auth-menu'
import { ModeToggle } from './mode-toggle'

type Props = {
	/** Width of the pill, so wide pages can match their own content column. */
	className?: string
}

export function SiteHeader({ className }: Props) {
	return (
		<header className="p-4">
			<div
				className={cn(
					'mx-auto flex w-full max-w-5xl items-center gap-2 rounded-full border border-border/60 bg-background/75 p-1 backdrop-blur-xl',
					className
				)}
			>
				<Link
					href="/"
					className="group ml-3 flex shrink-0 items-center gap-2 rounded-full font-bold text-primary dark:text-primary-foreground"
				>
					Zelino
				</Link>
				<div className="ms-auto flex items-center gap-1">
					<ModeToggle />
					<AuthMenu />
				</div>
			</div>
		</header>
	)
}

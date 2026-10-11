'use client'
import { GalleryVerticalEndIcon } from 'lucide-react'
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
				className={
					'mx-auto flex w-full max-w-5xl items-center gap-2 rounded-full border border-border/60 bg-background/75 p-1 backdrop-blur-xl'
				}
			>
				<Link
					href="/"
					className="group ml-1 flex shrink-0 items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
				>
					<span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
						<GalleryVerticalEndIcon className="size-4" />
					</span>
					<span className="font-heading font-semibold text-sm tracking-tight">
						Zelino
					</span>
				</Link>
				<div className="ms-auto flex items-center gap-1">
					<ModeToggle />
					<AuthMenu />
				</div>
			</div>
		</header>
	)
}

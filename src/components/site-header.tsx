import { cn } from 'cn'
import { GalleryVerticalEndIcon } from 'lucide-react'
import Link from 'next/link'
import { AuthMenu } from './auth-menu'
import { ModeToggle } from './mode-toggle'

type Props = {
	/** Width of the inner bar, so it can line up with the page's own column. */
	className?: string
}

export function SiteHeader({ className }: Props) {
	return (
		<header className="sticky top-0 z-50 border-border/60 border-b bg-background/70 backdrop-blur-xl">
			<div
				className={cn(
					'mx-auto flex h-14 w-full max-w-5xl items-center gap-3 px-4 md:h-16 md:px-6',
					className
				)}
			>
				<Link
					className="group -ms-1.5 flex shrink-0 items-center gap-2 rounded-lg px-1.5 py-1 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
					href="/"
				>
					<span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
						<GalleryVerticalEndIcon aria-hidden className="size-4" />
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

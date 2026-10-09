'use client'
import { GalleryVerticalEndIcon } from 'lucide-react'
import Link from 'next/link'
import { AuthMenu } from './auth-menu'
import { ModeToggle } from './mode-toggle'

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
			<div className="mx-auto flex h-14 w-full max-w-xl items-center gap-4 px-4 md:px-6">
				<Link href="/" className="flex shrink-0 items-center gap-2 font-medium">
					<GalleryVerticalEndIcon className="size-4" />
					<span className="font-medium uppercase">Zelino</span>
				</Link>
				<div className="ms-auto flex items-center gap-1">
					<ModeToggle />
					<AuthMenu />
				</div>
			</div>
		</header>
	)
}

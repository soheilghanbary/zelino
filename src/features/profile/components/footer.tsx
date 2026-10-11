import { GalleryVerticalEndIcon } from 'lucide-react'
import Link from 'next/link'

type Props = {
	name: string
}

export function ProfileFooter({ name }: Props) {
	return (
		<footer className="flex flex-wrap items-center justify-between gap-3 border-t pt-6 text-muted-foreground text-xs">
			<p>
				© {new Date().getUTCFullYear()} {name}
			</p>
			<Link
				className="inline-flex items-center gap-1.5 rounded-md transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
				href="/"
			>
				<GalleryVerticalEndIcon aria-hidden className="size-3.5" />
				Built with Zelino
			</Link>
		</footer>
	)
}

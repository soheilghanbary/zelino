import { GalleryVerticalEndIcon } from 'lucide-react'
import Link from 'next/link'

type Props = {
	name: string
}

export function ProfileFooter({ name }: Props) {
	return (
		<footer className="mt-12 flex flex-col items-center gap-2 border-t pt-6 text-center text-muted-foreground text-xs sm:flex-row sm:items-center sm:justify-between sm:text-left">
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

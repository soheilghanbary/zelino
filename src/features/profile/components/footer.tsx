import { GalleryVerticalEndIcon } from 'lucide-react'
import Link from 'next/link'

type Props = {
	name: string
}

export function ProfileFooter({ name }: Props) {
	return (
		<footer className="text-muted-foreground mt-12 flex flex-col items-center gap-2 border-t pt-6 text-center text-xs sm:flex-row sm:items-center sm:justify-between sm:text-left">
			<p>
				© {new Date().getUTCFullYear()} {name}
			</p>
			<Link
				className="hover:text-foreground focus-visible:ring-ring/50 inline-flex items-center gap-1.5 rounded-md transition-colors focus-visible:ring-[3px] focus-visible:outline-none"
				href="/"
			>
				<GalleryVerticalEndIcon aria-hidden className="size-3.5" />
				Built with Zelino
			</Link>
		</footer>
	)
}

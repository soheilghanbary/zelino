import { GalleryVerticalEndIcon } from 'lucide-react'
import Link from 'next/link'
import { GithubIcon } from '@/assets/icons'
import { appConfig } from '@/config'

const LINK_FOCUS =
	'inline-flex items-center gap-1.5 rounded-md text-muted-foreground text-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50'

// Read once at module load. Calling `new Date()` during render makes the page
// unstable, which disqualifies it from static prerendering.
const YEAR = new Date().getUTCFullYear()

export function LandingFooter() {
	return (
		<footer className="mx-auto w-full max-w-5xl px-4 pb-10 md:px-6">
			<div className="flex flex-wrap items-center justify-between gap-4 border-t pt-6">
				<div className="flex items-center gap-2">
					<GalleryVerticalEndIcon aria-hidden className="size-4 text-primary" />
					<span className="font-heading font-semibold text-sm tracking-tight">
						{appConfig.name}
					</span>
					<span className="text-muted-foreground text-xs">© {YEAR}</span>
				</div>

				<nav aria-label="Footer" className="flex items-center gap-4">
					<Link className={LINK_FOCUS} href="/login">
						Sign in
					</Link>
					<Link className={LINK_FOCUS} href={`/${appConfig.showcaseUsername}`}>
						Example profile
					</Link>
					<a
						className={LINK_FOCUS}
						href={appConfig.repoUrl}
						rel="noreferrer noopener"
						target="_blank"
					>
						<GithubIcon aria-hidden className="size-3.5" />
						GitHub
					</a>
				</nav>
			</div>
		</footer>
	)
}

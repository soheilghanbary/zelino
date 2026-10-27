import type { ReactNode } from 'react'

type Props = {
	children: ReactNode
	count?: number
	delay?: number
	id: string
	title: string
}

/**
 * One labelled block of the profile. The `id` is the anchor the sidebar nav
 * links to, and `scroll-mt` keeps the target clear of the sticky header.
 */
export function ProfileSection({ children, delay = 0, id, title }: Props) {
	return (
		<section
			className="motion-safe:animate-fade-in-up scroll-mt-(--header-offset) pt-4 first:pt-0"
			id={id}
			style={{ animationDelay: `${delay}ms` }}
		>
			<div className="mb-6">
				<h2 className="font-heading text-foreground text-sm font-bold tracking-[0.12em] uppercase">
					{title}
				</h2>
			</div>
			<div className="min-w-0 ps-2">{children}</div>
		</section>
	)
}

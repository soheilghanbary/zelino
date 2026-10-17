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
			className="scroll-mt-16 pt-4 first:pt-0 motion-safe:animate-fade-in-up md:scroll-mt-20"
			id={id}
			style={{ animationDelay: `${delay}ms` }}
		>
			<div className="mb-6">
				<h2 className="font-bold font-heading text-foreground text-sm uppercase tracking-[0.12em]">
					{title}
				</h2>
			</div>
			<div className="min-w-0 ps-2">{children}</div>
		</section>
	)
}

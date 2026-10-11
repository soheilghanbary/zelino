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
export function ProfileSection({
	children,
	count,
	delay = 0,
	id,
	title,
}: Props) {
	return (
		<section
			className="scroll-mt-4 pt-4 first:pt-0 motion-safe:animate-fade-in-up md:scroll-mt-6"
			id={id}
			style={{ animationDelay: `${delay}ms` }}
		>
			<div className="flex items-center gap-2">
				<h2 className="font-heading font-medium text-muted-foreground text-xs uppercase tracking-[0.16em]">
					{title}
				</h2>
				{count !== undefined && (
					<span className="rounded-4xl bg-muted px-1.5 py-0.5 font-medium text-muted-foreground text-xs tabular-nums">
						{count}
					</span>
				)}
			</div>
			<div className="mt-6">{children}</div>
		</section>
	)
}

'use client'

import { cn } from 'cn'
import { BriefcaseBusinessIcon, SparklesIcon, UserIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { ProfileSectionMeta as Section } from '../lib'

const ICONS = {
	about: UserIcon,
	experience: BriefcaseBusinessIcon,
	skills: SparklesIcon,
} satisfies Record<Section['id'], typeof UserIcon>

type Props = {
	sections: Section[]
}

/**
 * Anchor navigation for the long-form column. Scrolling is handled natively
 * (the sections carry `scroll-mt` and the root is smooth-scrolled), so this
 * only has to keep track of which section the reader is currently in.
 */
export function ProfileSectionNav({ sections }: Props) {
	const [active, setActive] = useState(sections[0]?.id)

	// Primitive key: the section list is server data and never changes shape
	// for a given profile, but a new array identity on every render would
	// otherwise tear down and rebuild the observer each time.
	const key = sections.map((section) => section.id).join(' ')

	useEffect(() => {
		const targets = sections
			.map(({ id }) => document.getElementById(id))
			.filter((element): element is HTMLElement => element !== null)

		if (targets.length === 0) return

		const visible = new Set<string>()

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						visible.add(entry.target.id)
					} else {
						visible.delete(entry.target.id)
					}
				}

				// Document order wins when two sections straddle the band, so
				// the highlight never jumps backwards while scrolling up.
				const next = sections.find(({ id }) => visible.has(id))
				if (next) setActive(next.id)
			},
			// A thin band across the upper third of the viewport: a section is
			// "current" while it sits near where the reader is looking.
			{ rootMargin: '-20% 0px -65% 0px' }
		)

		for (const target of targets) observer.observe(target)

		return () => observer.disconnect()
		// eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on `key`
	}, [key])

	if (sections.length < 2) return null

	return (
		<nav aria-label="Profile sections" className="flex flex-col gap-0.5">
			{sections.map((section) => {
				const Icon = ICONS[section.id]
				const isActive = active === section.id

				return (
					<a
						aria-current={isActive ? 'true' : undefined}
						className={cn(
							'group relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-colors',
							isActive
								? 'bg-muted font-medium text-foreground'
								: 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
						)}
						href={`#${section.id}`}
						key={section.id}
					>
						<span
							aria-hidden
							className={cn(
								'absolute inset-s-0 inset-y-2 w-0.5 rounded-full bg-primary transition-opacity',
								isActive ? 'opacity-100' : 'opacity-0'
							)}
						/>
						<Icon
							aria-hidden
							className={cn(
								'size-4 shrink-0 transition-colors',
								isActive ? 'text-primary' : 'text-muted-foreground'
							)}
						/>
						{section.label}
						{section.count !== undefined && (
							<span className="ms-auto text-muted-foreground text-xs tabular-nums">
								{section.count}
							</span>
						)}
					</a>
				)
			})}
		</nav>
	)
}

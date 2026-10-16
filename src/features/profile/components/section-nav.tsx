'use client'

import { cn } from 'cn'
import {
	BriefcaseBusinessIcon,
	ImageIcon,
	LinkIcon,
	SparklesIcon,
	UserIcon,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import type { ProfileSectionMeta as Section } from '../lib'

const ICONS = {
	about: UserIcon,
	experience: BriefcaseBusinessIcon,
	skills: SparklesIcon,
	portfolio: ImageIcon,
	social: LinkIcon,
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
		<nav aria-label="Profile sections" className="flex flex-col gap-1">
			{sections.map((section) => {
				const Icon = ICONS[section.id]
				const isActive = active === section.id

				return (
					<a
						aria-current={isActive ? 'true' : undefined}
						className={cn(
							'group relative flex items-center gap-2.5 rounded-lg px-3 py-2 transition-colors',
							isActive
								? 'bg-primary/10 text-primary'
								: 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
						)}
						href={`#${section.id}`}
						key={section.id}
					>
						<Icon
							aria-hidden
							className={cn(
								'size-4 shrink-0 transition-colors',
								isActive ? 'text-primary' : 'text-muted-foreground'
							)}
						/>
						{section.label}
					</a>
				)
			})}
		</nav>
	)
}

import type { Profile } from './schemas'

/**
 * Derived views of a profile row. The page, the sidebar and the in-page nav
 * all need to agree on how a name reads, which sections exist and how a bare
 * domain becomes a URL — so those rules live here instead of being repeated
 * across the components.
 */

export type ProfileSectionMeta = {
	id: 'about' | 'experience' | 'skills' | 'portfolio'
	label: string
	count?: number
}

export type ProfileLink = {
	icon:
		| 'github'
		| 'linkedin'
		| 'dribbble'
		| 'instagram'
		| 'x'
		| 'telegram'
		| 'globe'
	name: string
	href: string
}

const DESCRIPTION_MAX = 180
const PRESENT_PATTERN = /\b(present|current|now|ongoing)\b/i

export function profileName(profile: Profile): string {
	return profile.fullName || profile.username
}

export function profileInitials(profile: Profile): string {
	return profileName(profile).trim().slice(0, 2).toUpperCase()
}

/** `period` is free text, so "is this the current role" stays best-effort. */
export function isCurrentPeriod(period: string): boolean {
	return PRESENT_PATTERN.test(period)
}

export function toExternalUrl(url: string): string | null {
	const value = url.trim()
	if (!value) return null
	return /^https?:\/\//i.test(value) ? value : `https://${value}`
}

export function profileDescription(profile: Profile): string {
	const text =
		profile.summary.trim() ||
		profile.tagline.trim() ||
		profile.title.trim() ||
		`Portfolio of ${profileName(profile)}`
	return text.length > DESCRIPTION_MAX
		? `${text.slice(0, DESCRIPTION_MAX - 1).trimEnd()}…`
		: text
}

export function getProfileSections(profile: Profile): ProfileSectionMeta[] {
	const sections: ProfileSectionMeta[] = []

	if (profile.summary.trim()) sections.push({ id: 'about', label: 'About' })

	if (profile.experiences.length > 0) {
		sections.push({
			count: profile.experiences.length,
			id: 'experience',
			label: 'Experience',
		})
	}

	if (profile.skills.length > 0) {
		sections.push({
			count: profile.skills.length,
			id: 'skills',
			label: 'Skills',
		})
	}

	if (profile.portfolios.length > 0) {
		sections.push({
			count: profile.portfolios.length,
			id: 'portfolio',
			label: 'Portfolio',
		})
	}

	return sections
}

export function getProfileLinks(profile: Profile): ProfileLink[] {
	const sources: { href: string; icon: ProfileLink['icon']; name: string }[] = [
		{ href: profile.portfolio, icon: 'globe', name: 'Website' },
	]

	return sources.flatMap(({ href, icon, name }) => {
		const url = toExternalUrl(href)
		return url ? [{ href: url, icon, name }] : []
	})
}

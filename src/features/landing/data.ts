import type { LucideIcon } from 'lucide-react'
import {
	BriefcaseBusinessIcon,
	DatabaseIcon,
	SparklesIcon,
	UserIcon,
	ZapIcon,
} from 'lucide-react'

/**
 * Every string the landing page renders lives here so the copy can be reviewed
 * in one place instead of hunted down through JSX.
 */

export const HERO = {
	eyebrow: 'Your career, structured',
	headline: ['One link for your', 'whole career.'],
	subheadline:
		'Skills, roles, and links in one place. Build a profile that reads like you, not like a template.',
	primaryCta: 'Create your page',
	secondaryCta: 'See a live profile',
} as const

export type ValueProp = {
	icon: LucideIcon
	title: string
	description: string
}

export const VALUE_PROPS: ValueProp[] = [
	{
		description:
			'Your details live as typed fields, not a theme. Nothing to fill in that has nothing to do with you.',
		icon: UserIcon,
		title: 'Structured, not templated',
	},
	{
		description:
			'Your profile is stored in your own database. Export it or move it whenever you want.',
		icon: DatabaseIcon,
		title: 'Yours to own',
	},
	{
		description:
			'Server components and partial prerendering keep the public page instant to open and cheap to serve.',
		icon: SparklesIcon,
		title: 'Fast by default',
	},
]

export type Feature = {
	icon: LucideIcon
	title: string
	description: string
}

export const FEATURES: Feature[] = [
	{
		description:
			'Name, title, tagline, and a summary paragraph that introduces you in your own words.',
		icon: UserIcon,
		title: 'About',
	},
	{
		description:
			'Roles with companies and periods, laid out as a timeline so the shape of your career is obvious.',
		icon: BriefcaseBusinessIcon,
		title: 'Experience',
	},
	{
		description:
			'Your stack as scannable tags — the first thing a recruiter actually looks for.',
		icon: ZapIcon,
		title: 'Skills',
	},
	{
		description:
			'Flip one switch and visitors see you are open to work, without you editing a word of copy.',
		icon: SparklesIcon,
		title: 'Open to work',
	},
]

export const CTA = {
	title: 'Your career deserves one link',
	description:
		'Claim your username, fill in what matters, and share a page that does the talking for you.',
	action: 'Create your page',
} as const

/** The mock profile inside the hero preview — deliberately fictional. */
export const PREVIEW = {
	name: 'Ava Lindqvist',
	role: 'Product Engineer',
	location: 'Stockholm, Sweden',
	tagline: 'Interfaces, systems, and the space between.',
	skills: ['TypeScript', 'React', 'Postgres', 'Design systems', 'Go'],
	experience: [
		{ role: 'Staff Engineer', company: 'Northwind', period: '2023 — Now' },
		{ role: 'Senior Engineer', company: 'Lumen Labs', period: '2020 — 2023' },
	],
} as const

import { z } from 'zod'

export const PERIOD_MAX = 40
export const DESCRIPTION_MAX = 600

/**
 * Shapes of the `user.skills` and `user.experiences` jsonb columns. The editor
 * (career) and the public page (profile) both read them, so the contract lives
 * here rather than in either feature.
 */

export const skillSchema = z.object({
	id: z.string().min(1),
	text: z.string().trim().min(1, 'Skill name is required'),
})

export const experienceSchema = z.object({
	id: z.string().min(1),
	role: z
		.string()
		.trim()
		.min(2, 'Enter a role')
		.max(80, 'Keep the role under 80 characters'),
	company: z
		.string()
		.trim()
		.min(2, 'Enter a company')
		.max(80, 'Keep the company under 80 characters'),
	period: z
		.string()
		.trim()
		.min(2, 'Enter a period')
		.max(PERIOD_MAX, `Keep the period under ${PERIOD_MAX} characters`),
	description: z
		.string()
		.trim()
		.max(
			DESCRIPTION_MAX,
			`Keep the description under ${DESCRIPTION_MAX} characters`
		),
})

export const portfolioSchema = z.object({
	id: z.string().min(1),
	title: z
		.string()
		.trim()
		.min(1, 'Title is required')
		.max(120, 'Keep the title under 120 characters'),
	image: z.string().trim().default(''),
	description: z
		.string()
		.trim()
		.max(
			DESCRIPTION_MAX,
			`Keep the description under ${DESCRIPTION_MAX} characters`
		)
		.default(''),
	link: z
		.string()
		.trim()
		.max(200, 'Keep the link under 200 characters')
		.default(''),
})

export const socialLinkSchema = z.object({
	id: z.string().min(1),
	title: z
		.string()
		.trim()
		.min(1, 'Title is required')
		.max(80, 'Keep the title under 80 characters'),
	link: z
		.string()
		.trim()
		.max(200, 'Keep the link under 200 characters')
		.default(''),
})

export type SocialLink = z.infer<typeof socialLinkSchema>
export type SocialLinksValues = SocialLink[]

export type Skill = z.infer<typeof skillSchema>
export type Experience = z.infer<typeof experienceSchema>
export type Portfolio = z.infer<typeof portfolioSchema>
export type ExperiencesValues = Experience[]
export type PortfoliosValues = Portfolio[]
export function parseSkills(value: unknown): Skill[] {
	const parsed = z.array(skillSchema).safeParse(value)
	return parsed.success ? parsed.data : []
}

export function parseExperiences(value: unknown): ExperiencesValues {
	const parsed = z.array(experienceSchema).safeParse(value)
	return parsed.success ? parsed.data : []
}

export function parsePortfolios(value: unknown): PortfoliosValues {
	const parsed = z.array(portfolioSchema).safeParse(value)
	return parsed.success ? parsed.data : []
}

export function parseSocialLinks(value: unknown): SocialLinksValues {
	const parsed = z.array(socialLinkSchema).safeParse(value)
	return parsed.success ? parsed.data : []
}

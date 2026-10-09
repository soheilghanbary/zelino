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

export type Skill = z.infer<typeof skillSchema>
export type Experience = z.infer<typeof experienceSchema>
export type ExperiencesValues = Experience[]

export function parseSkills(value: unknown): Skill[] {
	const parsed = z.array(skillSchema).safeParse(value)
	return parsed.success ? parsed.data : []
}

export function parseExperiences(value: unknown): ExperiencesValues {
	const parsed = z.array(experienceSchema).safeParse(value)
	return parsed.success ? parsed.data : []
}

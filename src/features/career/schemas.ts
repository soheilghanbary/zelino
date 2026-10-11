import { z } from 'zod'
import { experienceSchema, skillSchema } from '@/lib/db/parse'

export type {
	Experience,
	ExperiencesValues,
	Skill,
} from '@/lib/db/parse'
export {
	DESCRIPTION_MAX,
	experienceSchema,
	PERIOD_MAX,
	skillSchema,
} from '@/lib/db/parse'

const urlField = (label: string) =>
	z
		.string()
		.trim()
		.max(200, `Keep the ${label} URL under 200 characters`)
		.refine((value) => {
			if (!value) return true
			try {
				const url = new URL(
					/^https?:\/\//i.test(value) ? value : `https://${value}`
				)
				return url.hostname.includes('.')
			} catch {
				return false
			}
		}, `Enter a valid ${label} URL`)

const phoneField = z
	.string()
	.trim()
	.max(30, 'Keep your phone under 30 characters')
	.refine(
		(value) => !value || /^\+?[\d\s().-]{5,30}$/.test(value),
		'Enter a valid phone number'
	)

export const aboutSchema = z.object({
	image: z.string().trim().optional().or(z.literal('')),
	fullName: z
		.string()
		.trim()
		.min(2, 'Enter your full name')
		.max(80, 'Keep your name under 80 characters'),
	title: z
		.string()
		.trim()
		.min(2, 'Enter your job title')
		.max(80, 'Keep your title under 80 characters'),
	tagline: z.string().trim().max(140, 'Keep your tagline under 140 characters'),
	summary: z.string().trim().max(600, 'Keep your summary under 600 characters'),
	location: z.string().trim().max(80, 'Keep your location under 80 characters'),
	phone: phoneField,
	githubUrl: urlField('GitHub'),
	linkedinUrl: urlField('LinkedIn'),
	openToWork: z.boolean(),
})

export type AboutValues = z.infer<typeof aboutSchema>
export type AboutInput = z.input<typeof aboutSchema>

export const imageSchema = z.object({
	image: z.string(),
})

export type ImageValues = z.infer<typeof imageSchema>

export const SKILLS_MAX = 24

export const skillsSchema = z.object({
	skills: z.array(skillSchema),
})

export type SkillsValues = z.infer<typeof skillsSchema>

export const EXPERIENCES_MAX = 12

export const experienceInputSchema = experienceSchema.omit({ id: true })

export const addExperienceSchema = z.object({
	experience: experienceInputSchema,
})

export const removeExperienceSchema = z.object({
	id: z.string().min(1),
})

export const updateExperienceSchema = z.object({
	id: z.string().min(1),
	experience: experienceInputSchema,
})

/**
 * Deletion is irreversible, so the client has to retype the account's own
 * username. The value is verified server-side against the row, not trusted.
 */
export const deleteAccountSchema = z.object({
	confirm: z.string().trim().min(1, 'Type your username to confirm'),
})

export type DeleteAccountInput = z.infer<typeof deleteAccountSchema>
export type ExperienceInput = z.infer<typeof experienceInputSchema>

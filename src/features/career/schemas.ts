import { z } from 'zod'

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
})

export type AboutValues = z.infer<typeof aboutSchema>
export type AboutInput = z.input<typeof aboutSchema>

export const SKILL_NAME_MAX = 40
export const SKILLS_MAX = 24

export const skillsSchema = z.object({
	skills: z.array(
		z.object({
			id: z.string().min(1),
			text: z.string().trim().min(1, 'Skill name is required'),
		})
	),
})

export type SkillsValues = z.infer<typeof skillsSchema>

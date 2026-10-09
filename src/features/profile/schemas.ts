import { z } from 'zod'
import type { ExperiencesValues, Skill } from '@/lib/db/parse'

export const profileSchema = z.object({
	username: z.string().trim().min(1),
})

export type Profile = {
	username: string
	image: string | null
	email: string | null
	fullName: string
	title: string
	tagline: string
	summary: string
	location: string
	phone: string
	githubUrl: string
	linkedinUrl: string
	portfolio: string
	skills: Skill[]
	experiences: ExperiencesValues
}

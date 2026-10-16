import { z } from 'zod'
import type {
	ExperiencesValues,
	PortfoliosValues,
	Skill,
	Social,
} from '@/lib/db/parse'

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
	portfolio: string
	openToWork: boolean
	skills: Skill[]
	experiences: ExperiencesValues
	portfolios: PortfoliosValues
	social: Social
}

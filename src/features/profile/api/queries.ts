import { os } from '@orpc/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import {
	parseExperiences,
	parsePortfolios,
	parseSkills,
	parseSocialLinks,
} from '@/lib/db/parse'
import { user } from '@/lib/db/schema'
import { type Profile, profileSchema } from '../schemas'

export const getProfile = os
	.input(profileSchema)
	.handler(async ({ input }): Promise<Profile | null> => {
		const [data] = await db
			.select({
				username: user.username,
				name: user.name,
				image: user.image,
				email: user.email,
				fullName: user.fullName,
				title: user.title,
				tagline: user.tagline,
				summary: user.summary,
				location: user.location,
				phone: user.phone,
				portfolio: user.portfolio,
				openToWork: user.openToWork,
				skills: user.skills,
				experiences: user.experiences,
				portfolios: user.portfolios,
				socialLinks: user.socialLinks,
			})
			.from(user)
			.where(eq(user.username, input.username))
			.limit(1)

		if (!data) return null

		return {
			username: data.username,
			image: data.image,
			email: data.email,
			fullName: data.fullName || data.name,
			title: data.title,
			tagline: data.tagline,
			summary: data.summary,
			location: data.location,
			phone: data.phone,
			portfolio: data.portfolio,
			openToWork: data.openToWork,
			skills: parseSkills(data.skills),
			experiences: parseExperiences(data.experiences),
			portfolios: parsePortfolios(data.portfolios),
			socialLinks: parseSocialLinks(data.socialLinks),
		}
	})

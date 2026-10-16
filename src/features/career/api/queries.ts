import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import {
	parseExperiences,
	parsePortfolios,
	parseSocialLinks,
} from '@/lib/db/parse'
import { user } from '@/lib/db/schema'
import { authed } from '@/lib/orpc/context'

export const getUserAbout = authed.handler(async ({ context }) => {
	const [data] = await db
		.select({
			image: user.image,
			fullName: user.fullName,
			title: user.title,
			tagline: user.tagline,
			summary: user.summary,
			location: user.location,
			phone: user.phone,
			openToWork: user.openToWork,
		})
		.from(user)
		.where(eq(user.id, context.userId))
	return data
})

export const getSkills = authed.handler(async ({ context }) => {
	const [data] = await db
		.select({ skills: user.skills })
		.from(user)
		.where(eq(user.id, context.userId))
	return data
})

export const getUserName = authed.handler(async ({ context }) => {
	const [data] = await db
		.select({ username: user.username })
		.from(user)
		.where(eq(user.id, context.userId))
	return data
})

export const getExperiences = authed.handler(async ({ context }) => {
	const [data] = await db
		.select({ experiences: user.experiences })
		.from(user)
		.where(eq(user.id, context.userId))
	return { experiences: parseExperiences(data?.experiences) }
})

export const getPortfolios = authed.handler(async ({ context }) => {
	const [data] = await db
		.select({ portfolios: user.portfolios })
		.from(user)
		.where(eq(user.id, context.userId))
	return { portfolios: parsePortfolios(data?.portfolios) }
})

export const getSocialLinks = authed.handler(async ({ context }) => {
	const [data] = await db
		.select({ socialLinks: user.socialLinks })
		.from(user)
		.where(eq(user.id, context.userId))
	return { socialLinks: parseSocialLinks(data?.socialLinks) }
})

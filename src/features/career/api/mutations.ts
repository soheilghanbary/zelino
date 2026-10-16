import { ORPCError } from '@orpc/server'
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'
import { z } from 'zod'
import { db } from '@/lib/db'
import { parseExperiences, parsePortfolios } from '@/lib/db/parse'
import { user } from '@/lib/db/schema'
import { authed } from '@/lib/orpc/context'
import {
	aboutSchema,
	addExperienceSchema,
	addPortfolioSchema,
	deleteAccountSchema,
	EXPERIENCES_MAX,
	imageSchema,
	PORTFOLIOS_MAX,
	removeExperienceSchema,
	removePortfolioSchema,
	skillsSchema,
	socialSchema,
	updateExperienceSchema,
	updatePortfolioSchema,
} from '../schemas'

async function readExperiences(userId: string) {
	const [row] = await db
		.select({ experiences: user.experiences })
		.from(user)
		.where(eq(user.id, userId))
	return parseExperiences(row?.experiences)
}

async function readPortfolios(userId: string) {
	const [row] = await db
		.select({ portfolios: user.portfolios })
		.from(user)
		.where(eq(user.id, userId))
	return parsePortfolios(row?.portfolios)
}

export const updateAbout = authed
	.input(aboutSchema)
	.handler(async ({ input, context }) => {
		await db.update(user).set(input).where(eq(user.id, context.userId))
		return { msg: 'User About updated successfully' }
	})

export const updateSkills = authed
	.input(skillsSchema)
	.handler(async ({ input, context }) => {
		await db.update(user).set(input).where(eq(user.id, context.userId))
		return { msg: 'Skills updated successfully' }
	})

export const updateUsername = authed
	.input(z.object({ username: z.string() }))
	.handler(async ({ input, context }) => {
		// Check username uniqueness
		const [row] = await db
			.select({ username: user.username })
			.from(user)
			.where(eq(user.username, input.username))
		if (row)
			throw new ORPCError('CONFLICT', {
				message: 'This username is already taken',
			})
		await db.update(user).set(input).where(eq(user.id, context.userId))
		return { msg: 'Username updated successfully' }
	})

export const updateImage = authed
	.input(imageSchema)
	.handler(async ({ input, context }) => {
		await db
			.update(user)
			.set({ image: input.image })
			.where(eq(user.id, context.userId))
		return { msg: 'Profile photo updated successfully', image: input.image }
	})

export const addExperience = authed
	.input(addExperienceSchema)
	.handler(async ({ input, context }) => {
		const experiences = await readExperiences(context.userId)
		if (experiences.length >= EXPERIENCES_MAX) {
			throw new ORPCError('CONFLICT', {
				message: `You can list up to ${EXPERIENCES_MAX} experiences`,
			})
		}
		const experience = { ...input.experience, id: nanoid(8) }
		await db
			.update(user)
			.set({ experiences: [...experiences, experience] })
			.where(eq(user.id, context.userId))
		return { msg: 'Experience added', experience }
	})

export const removeExperience = authed
	.input(removeExperienceSchema)
	.handler(async ({ input, context }) => {
		const experiences = await readExperiences(context.userId)
		const next = experiences.filter((item) => item.id !== input.id)
		if (next.length === experiences.length)
			return { msg: 'Experience not found' }
		await db
			.update(user)
			.set({ experiences: next })
			.where(eq(user.id, context.userId))
		return { msg: 'Experience removed' }
	})

export const updateExperience = authed
	.input(updateExperienceSchema)
	.handler(async ({ input, context }) => {
		const experiences = await readExperiences(context.userId)
		const index = experiences.findIndex((item) => item.id === input.id)
		if (index === -1)
			throw new ORPCError('NOT_FOUND', { message: 'Experience not found' })
		const next = [...experiences]
		next[index] = { ...input.experience, id: input.id }
		await db
			.update(user)
			.set({ experiences: next })
			.where(eq(user.id, context.userId))
		return { msg: 'Experience updated', experience: next[index] }
	})

export const addPortfolio = authed
	.input(addPortfolioSchema)
	.handler(async ({ input, context }) => {
		const portfolios = await readPortfolios(context.userId)
		if (portfolios.length >= PORTFOLIOS_MAX) {
			throw new ORPCError('CONFLICT', {
				message: `You can list up to ${PORTFOLIOS_MAX} portfolio items`,
			})
		}
		const portfolio = { ...input.portfolio, id: nanoid(8) }
		await db
			.update(user)
			.set({ portfolios: [...portfolios, portfolio] })
			.where(eq(user.id, context.userId))
		return { msg: 'Portfolio item added', portfolio }
	})

export const removePortfolio = authed
	.input(removePortfolioSchema)
	.handler(async ({ input, context }) => {
		const portfolios = await readPortfolios(context.userId)
		const next = portfolios.filter((item) => item.id !== input.id)
		if (next.length === portfolios.length)
			return { msg: 'Portfolio item not found' }
		await db
			.update(user)
			.set({ portfolios: next })
			.where(eq(user.id, context.userId))
		return { msg: 'Portfolio item removed' }
	})

export const updatePortfolio = authed
	.input(updatePortfolioSchema)
	.handler(async ({ input, context }) => {
		const portfolios = await readPortfolios(context.userId)
		const index = portfolios.findIndex((item) => item.id === input.id)
		if (index === -1)
			throw new ORPCError('NOT_FOUND', { message: 'Portfolio item not found' })
		const next = [...portfolios]
		next[index] = { ...input.portfolio, id: input.id }
		await db
			.update(user)
			.set({ portfolios: next })
			.where(eq(user.id, context.userId))
		return { msg: 'Portfolio item updated', portfolio: next[index] }
	})

export const updateSocial = authed
	.input(socialSchema)
	.handler(async ({ input, context }) => {
		await db
			.update(user)
			.set({ social: input })
			.where(eq(user.id, context.userId))
		return { msg: 'Social details updated successfully' }
	})

export const deleteAccount = authed
	.input(deleteAccountSchema)
	.handler(async ({ input, context }) => {
		const [row] = await db
			.select({ id: user.id, username: user.username })
			.from(user)
			.where(eq(user.id, context.userId))

		if (!row) throw new ORPCError('NOT_FOUND', { message: 'Account not found' })

		// Compared against the row we just read. The confirmation is a guard
		// against accidents, not an authorisation check — `context.userId`
		// already decides whose account this is.
		if (input.confirm.toLowerCase() !== row.username.toLowerCase()) {
			throw new ORPCError('BAD_REQUEST', {
				message: 'That does not match your username',
			})
		}

		// `session` and `account` both cascade from this row, so the session
		// cookie is dead the moment this returns.
		const deleted = await db
			.delete(user)
			.where(eq(user.id, row.id))
			.returning({ id: user.id })

		if (deleted.length === 0)
			throw new ORPCError('NOT_FOUND', { message: 'Account not found' })

		return { msg: 'Account deleted' }
	})

import { ORPCError } from '@orpc/server'
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'
import { z } from 'zod'
import { db } from '@/lib/db'
import { parseExperiences } from '@/lib/db/parse'
import { user } from '@/lib/db/schema'
import { authed } from '@/lib/orpc/context'
import {
	aboutSchema,
	addExperienceSchema,
	EXPERIENCES_MAX,
	imageSchema,
	removeExperienceSchema,
	skillsSchema,
	updateExperienceSchema,
} from '../schemas'

async function readExperiences(userId: string) {
	const [row] = await db
		.select({ experiences: user.experiences })
		.from(user)
		.where(eq(user.id, userId))
	return parseExperiences(row?.experiences)
}

export const updateAbout = authed
	.input(aboutSchema)
	.handler(async ({ input, context }) => {
		await db.update(user).set(input).where(eq(user.id, context.userId))
		return { msg: 'ok' }
	})

export const updateSkills = authed
	.input(skillsSchema)
	.handler(async ({ input, context }) => {
		await db.update(user).set(input).where(eq(user.id, context.userId))
		return { msg: 'ok' }
	})

export const updateUsername = authed
	.input(z.object({ username: z.string() }))
	.handler(async ({ input, context }) => {
		// Check username uniqueness
		const [row] = await db
			.select({ username: user.username })
			.from(user)
			.where(eq(user.username, input.username))
		if (row) return { msg: 'Username already taken' }
		await db.update(user).set(input).where(eq(user.id, context.userId))
		return { msg: 'ok' }
	})

export const updateImage = authed
	.input(imageSchema)
	.handler(async ({ input, context }) => {
		await db
			.update(user)
			.set({ image: input.image })
			.where(eq(user.id, context.userId))
		return { msg: 'Photo updated', image: input.image }
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

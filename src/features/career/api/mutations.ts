import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/lib/db'
import { user } from '@/lib/db/schema'
import { authed } from '@/lib/orpc/context'
import { aboutSchema, skillsSchema } from '../schemas'

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

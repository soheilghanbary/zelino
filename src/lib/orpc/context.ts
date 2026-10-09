import { ORPCError, os } from '@orpc/server'
import { getSession } from '../../lib/auth/session'

export const authMiddleware = os.middleware(async ({ next }) => {
	const session = await getSession()
	if (!session) throw new ORPCError('UNAUTHORIZED')
	return next({
		context: {
			userId: session.session.userId,
		},
	})
})

export const authed = os.use(authMiddleware)

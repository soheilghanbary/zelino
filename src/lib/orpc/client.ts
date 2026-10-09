import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import type { RouterClient } from '@orpc/server'
import { createRouterUtils } from '@orpc/tanstack-query'
import type { router } from '@/lib/orpc/router'

declare global {
	var $client: RouterClient<typeof router> | undefined
}

const link = new RPCLink({
	url: '/api/rpc',
	origin: process.env.NEXT_PUBLIC_URL,
	headers: async () => {
		if (typeof window !== 'undefined') {
			return {}
		}

		const { headers } = await import('next/headers')
		return await headers()
	},
})

export const api: RouterClient<typeof router> = createORPCClient(link)
export const client = createRouterUtils(api)

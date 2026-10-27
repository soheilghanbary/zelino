'use client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { client } from '@/lib/orpc/client'

export const MessageCSR = () => {
	const { data } = useSuspenseQuery(client.hello.queryOptions())
	return (
		<div className="w-full">
			<span className="text-sm font-medium">Client Response</span>
			<pre className="bg-muted mt-1 rounded-md p-2 font-mono text-xs shadow-sm">
				{JSON.stringify(data)}
			</pre>
		</div>
	)
}

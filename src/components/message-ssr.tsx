import { call } from '@orpc/server'
import { helloRouter } from '@/lib/orpc/router'

export const MessageSSR = async () => {
	const data = await call(helloRouter)
	return (
		<div className="w-full">
			<span className="text-sm font-medium">Server Response</span>
			<pre className="bg-muted mt-1 rounded-md p-2 font-mono text-xs shadow-sm">
				{JSON.stringify(data)}
			</pre>
		</div>
	)
}

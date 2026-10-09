import { call } from '@orpc/server'
import { helloRouter } from '@/lib/orpc/router'

export const MessageSSR = async () => {
	const data = await call(helloRouter)
	return (
		<div className="w-full">
			<span className="font-medium text-sm">Server Response</span>
			<pre className="mt-1 rounded-md bg-muted p-2 font-mono text-xs shadow-sm">
				{JSON.stringify(data)}
			</pre>
		</div>
	)
}

import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app'
import { edgeStoreRouter } from '@/lib/edgestore/server'

const handler = createEdgeStoreNextHandler({
	router: edgeStoreRouter,
})

export { handler as GET, handler as POST }

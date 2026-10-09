import { initEdgeStore } from '@edgestore/server'
import { z } from 'zod'
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_BYTES } from './config'

const es = initEdgeStore.create()

export const edgeStoreRouter = es.router({
	publicFiles: es
		.fileBucket({
			maxSize: MAX_IMAGE_BYTES,
			accept: ACCEPTED_IMAGE_TYPES,
		})
		.input(z.object({ userId: z.string().min(1) }))
		.path(({ input }) => [{ userId: input.userId }]),
})

export type EdgeStoreRouter = typeof edgeStoreRouter

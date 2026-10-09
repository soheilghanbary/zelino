import { os } from '@orpc/server'

export const helloRouter = os.handler(async () => {
	return { message: 'Hello World!' }
})

export const router = {
	hello: helloRouter,
}

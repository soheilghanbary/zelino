import { os } from '@orpc/server'
import {
	updateAbout,
	updateSkills,
	updateUsername,
} from '@/features/career/api/mutations'

export const helloRouter = os.handler(async () => {
	return { message: 'Hello World!' }
})

export const router = {
	hello: helloRouter,
	career: {
		updateAbout,
		updateSkills,
		updateUsername,
	},
}

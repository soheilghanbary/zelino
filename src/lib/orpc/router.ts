import { os } from '@orpc/server'
import {
	addExperience,
	removeExperience,
	updateAbout,
	updateExperience,
	updateImage,
	updateSkills,
	updateUsername,
} from '@/features/career/api/mutations'
import { getUserName } from '@/features/career/api/queries'
import { getProfile } from '@/features/profile/api/queries'

export const helloRouter = os.handler(async () => {
	return { message: 'Hello World!' }
})

export const router = {
	hello: helloRouter,
	career: {
		addExperience,
		getUserName,
		removeExperience,
		updateAbout,
		updateExperience,
		updateImage,
		updateSkills,
		updateUsername,
	},
	profile: {
		getProfile,
	},
}

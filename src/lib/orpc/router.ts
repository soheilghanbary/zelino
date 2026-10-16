import { os } from '@orpc/server'
import {
	addExperience,
	addPortfolio,
	deleteAccount,
	removeExperience,
	removePortfolio,
	updateAbout,
	updateExperience,
	updateImage,
	updatePortfolio,
	updateSkills,
	updateSocial,
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
		addPortfolio,
		deleteAccount,
		getUserName,
		removeExperience,
		removePortfolio,
		updateAbout,
		updateExperience,
		updateImage,
		updatePortfolio,
		updateSkills,
		updateSocial,
		updateUsername,
	},
	profile: {
		getProfile,
	},
}

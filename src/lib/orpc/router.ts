import { os } from '@orpc/server'
import {
	addExperience,
	addPortfolio,
	addSocialLink,
	deleteAccount,
	removeExperience,
	removePortfolio,
	removeSocialLink,
	updateAbout,
	updateExperience,
	updateImage,
	updatePortfolio,
	updateSkills,
	updateSocialLink,
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
		addSocialLink,
		deleteAccount,
		getUserName,
		removeExperience,
		removePortfolio,
		removeSocialLink,
		updateAbout,
		updateExperience,
		updateImage,
		updatePortfolio,
		updateSkills,
		updateSocialLink,
		updateUsername,
	},
	profile: {
		getProfile,
	},
}

'use client'

import { useState } from 'react'
import { signIn } from '@/lib/auth/client'
import { getAuthErrorMessage, type SocialProvider } from '../lib'

export function useSocialSignIn(options?: { callbackURL?: string }) {
	const callbackURL = options?.callbackURL ?? '/'
	const [pendingProvider, setPendingProvider] = useState<SocialProvider | null>(
		null
	)
	const [socialError, setSocialError] = useState<string | null>(null)

	const signInWithProvider = async (provider: SocialProvider) => {
		if (pendingProvider) return

		setPendingProvider(provider)
		setSocialError(null)

		const { error } = await signIn.social({ provider, callbackURL })

		if (error) {
			setSocialError(getAuthErrorMessage(error))
			setPendingProvider(null)
		}
	}

	return {
		signInWithProvider,
		pendingProvider,
		socialError,
		clearSocialError: () => setSocialError(null),
	}
}

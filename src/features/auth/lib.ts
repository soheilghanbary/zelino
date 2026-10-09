export const AUTH_ERROR_MESSAGES = {
	INVALID_EMAIL_OR_PASSWORD: 'Incorrect email or password.',
	USER_NOT_FOUND: 'Incorrect email or password.',
	INVALID_PASSWORD: 'Incorrect email or password.',
	USER_BANNED: 'This account has been suspended.',
	TOO_MANY_REQUESTS: 'Too many attempts. Please wait a moment and try again.',
	SOCIAL_ACCOUNT_ALREADY_LINKED:
		'That account is already linked to another user.',
	PROVIDER_NOT_FOUND: 'Sign in with Google is not configured on this server.',
	UNKNOWN_ERROR: 'Something went wrong. Please try again.',
} as const

export type AuthErrorCode = keyof typeof AUTH_ERROR_MESSAGES

export function getAuthErrorMessage(
	error: { code?: string; message?: string } | null | undefined,
	fallback: string = AUTH_ERROR_MESSAGES.UNKNOWN_ERROR
) {
	if (!error) return null
	if (error.code && error.code in AUTH_ERROR_MESSAGES) {
		return AUTH_ERROR_MESSAGES[error.code as AuthErrorCode]
	}
	return error.message ?? fallback
}

export const SOCIAL_PROVIDERS = ['google'] as const

export type SocialProvider = (typeof SOCIAL_PROVIDERS)[number]

export const SOCIAL_PROVIDER_LABELS: Record<SocialProvider, string> = {
	google: 'Google',
}

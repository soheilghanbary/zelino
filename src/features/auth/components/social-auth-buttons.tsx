'use client'

import { cn } from 'cn'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useSocialSignIn } from '../hooks/use-social-sign-in'
import { SOCIAL_PROVIDER_LABELS, type SocialProvider } from '../lib'
import { GoogleIcon } from './google-icon'

type SocialAuthButtonsProps = {
	callbackURL?: string
	disabled?: boolean
	className?: string
}

export function SocialAuthButtons({
	callbackURL,
	disabled,
	className,
}: SocialAuthButtonsProps) {
	const { signInWithProvider, pendingProvider, socialError } = useSocialSignIn({
		callbackURL,
	})

	const isPending = pendingProvider !== null

	return (
		<div className={cn('flex flex-col gap-2', className)}>
			<Button
				type="button"
				variant="outline"
				onClick={() => signInWithProvider('google')}
				disabled={disabled ?? isPending}
				aria-busy={pendingProvider === 'google'}
			>
				{pendingProvider === 'google' ? (
					<Spinner />
				) : (
					<GoogleIcon className="size-4" />
				)}
				{pendingProvider === 'google'
					? 'Redirecting to Google…'
					: `Continue with ${SOCIAL_PROVIDER_LABELS.google}`}
			</Button>
			{socialError && (
				<p role="alert" className="text-center text-destructive text-sm">
					{socialError}
				</p>
			)}
		</div>
	)
}

export type { SocialAuthButtonsProps, SocialProvider }

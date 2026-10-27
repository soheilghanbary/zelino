'use client'

import { cn } from 'cn'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useSocialSignIn } from '../hooks/use-social-sign-in'
import type { SocialProvider } from '../lib'
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
		<div className={cn('flex flex-col gap-3', className)}>
			<Button
				type="button"
				variant="outline"
				size="lg"
				disabled={disabled ?? isPending}
				onClick={() => signInWithProvider('google')}
				aria-busy={pendingProvider === 'google'}
				className="h-10 w-full gap-2.5"
			>
				{pendingProvider === 'google' ? (
					<Spinner />
				) : (
					<GoogleIcon className="size-4" />
				)}
				Continue with Google
			</Button>
			{socialError && (
				<p role="alert" className="text-destructive text-center text-sm">
					{socialError}
				</p>
			)}
		</div>
	)
}

export type { SocialAuthButtonsProps, SocialProvider }

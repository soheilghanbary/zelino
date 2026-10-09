'use client'
import { Button } from '@/components/ui/button'
import { signIn } from '@/lib/auth/client'

export const OAuthButton = () => {
	return (
		<Button
			variant={'secondary'}
			onClick={() => signIn.social({ provider: 'google' })}
		>
			Sign In
		</Button>
	)
}

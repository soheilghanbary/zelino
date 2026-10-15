'use client'

import { cn } from 'cn'
import { FieldGroup } from '@/components/ui/field'
import { SocialAuthButtons } from './social-auth-buttons'

type LoginFormProps = {
	callbackURL?: string
	className?: string
}

export function LoginForm({ callbackURL, className }: LoginFormProps) {
	return (
		<div className={cn('flex flex-col gap-6', className)}>
			<FieldGroup>
				<div className="flex flex-col items-center gap-1 text-center">
					<h1 className="font-bold text-2xl">Sign in to your account</h1>
				</div>
				<SocialAuthButtons callbackURL={callbackURL} />
			</FieldGroup>
		</div>
	)
}

'use client'

import { cn } from 'cn'
import { Logo } from '@/assets/logo'
import { FieldGroup } from '@/components/ui/field'
import { SocialAuthButtons } from './social-auth-buttons'

type LoginFormProps = {
	callbackURL?: string
	className?: string
}

export function LoginForm({ callbackURL, className }: LoginFormProps) {
	return (
		<div
			className={cn(
				'bg-card/60 mx-auto flex w-full max-w-sm flex-col gap-8 rounded-2xl border p-8 shadow-sm backdrop-blur',
				className
			)}
		>
			<div className="flex flex-col items-center gap-4 text-center">
				<div className="bg-background flex size-11 items-center justify-center rounded-xl border shadow-xs">
					<Logo className="text-foreground size-5" aria-hidden="true" />
				</div>
				<div className="space-y-1.5">
					<h1 className="font-heading text-2xl font-semibold tracking-tight">
						Welcome to Zelino
					</h1>
					<p className="text-muted-foreground text-sm text-balance">
						Sign in to manage your career page.
					</p>
				</div>
			</div>

			<FieldGroup>
				<SocialAuthButtons callbackURL={callbackURL} />
			</FieldGroup>

			<p className="text-muted-foreground text-center text-xs leading-relaxed">
				By continuing, you agree to our Terms of Service and Privacy Policy.
			</p>
		</div>
	)
}

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
				'mx-auto flex w-full max-w-sm flex-col gap-8 rounded-2xl border bg-card/60 p-8 shadow-sm backdrop-blur',
				className
			)}
		>
			<div className="flex flex-col items-center gap-4 text-center">
				<div className="flex size-11 items-center justify-center rounded-xl border bg-background shadow-xs">
					<Logo className="size-5 text-foreground" aria-hidden="true" />
				</div>
				<div className="space-y-1.5">
					<h1 className="font-heading font-semibold text-2xl tracking-tight">
						Welcome to Zelino
					</h1>
					<p className="text-balance text-muted-foreground text-sm">
						Sign in to manage your career page.
					</p>
				</div>
			</div>

			<FieldGroup>
				<SocialAuthButtons callbackURL={callbackURL} />
			</FieldGroup>

			<p className="text-center text-muted-foreground text-xs leading-relaxed">
				By continuing, you agree to our Terms of Service and Privacy Policy.
			</p>
		</div>
	)
}

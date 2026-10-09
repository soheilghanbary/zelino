'use client'

import { cn } from 'cn'
import { CircleAlertIcon, EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from '@/components/ui/field'
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from '@/components/ui/input-group'
import { Spinner } from '@/components/ui/spinner'
import { useLoginForm } from '../hooks/use-login-form'
import { SocialAuthButtons } from './social-auth-buttons'

type LoginFormProps = {
	callbackURL?: string
	className?: string
}

export function LoginForm({ callbackURL, className }: LoginFormProps) {
	const { form, onSubmit, formError, isPending } = useLoginForm({ callbackURL })
	const [showPassword, setShowPassword] = useState(false)

	return (
		<form className={cn('flex flex-col gap-6', className)} onSubmit={onSubmit}>
			<FieldGroup>
				<div className="flex flex-col items-center gap-1 text-center">
					<h1 className="font-bold text-2xl">Sign in to your account</h1>
					<p className="text-balance text-muted-foreground text-sm">
						Enter your email below to sign in to your account
					</p>
				</div>

				{formError && (
					<div
						role="alert"
						className="flex items-start gap-2 rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-destructive text-sm"
					>
						<CircleAlertIcon className="mt-0.5 size-4 shrink-0" />
						<span>{formError}</span>
					</div>
				)}

				<Controller
					control={form.control}
					name="email"
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor={field.name}>Email</FieldLabel>
							<InputGroup>
								<InputGroupInput
									{...field}
									id={field.name}
									type="email"
									autoComplete="email"
									placeholder="m@example.com"
									aria-invalid={fieldState.invalid}
									disabled={isPending}
								/>
							</InputGroup>
							<FieldError errors={[fieldState.error]} />
						</Field>
					)}
				/>

				<Controller
					control={form.control}
					name="password"
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<div className="flex items-center">
								<FieldLabel htmlFor={field.name}>Password</FieldLabel>
								<a
									href="/forgot-password"
									className="ms-auto text-sm underline-offset-4 hover:underline"
								>
									Forgot your password?
								</a>
							</div>
							<InputGroup>
								<InputGroupInput
									{...field}
									id={field.name}
									type={showPassword ? 'text' : 'password'}
									autoComplete="current-password"
									aria-invalid={fieldState.invalid}
									disabled={isPending}
								/>
								<InputGroupAddon align="inline-end">
									<InputGroupButton
										size="icon-sm"
										onClick={() => setShowPassword((prev) => !prev)}
										disabled={isPending}
										aria-label={
											showPassword ? 'Hide password' : 'Show password'
										}
										aria-pressed={showPassword}
									>
										{showPassword ? (
											<EyeOffIcon className="size-4" />
										) : (
											<EyeIcon className="size-4" />
										)}
									</InputGroupButton>
								</InputGroupAddon>
							</InputGroup>
							<FieldError errors={[fieldState.error]} />
						</Field>
					)}
				/>

				<Field>
					<Button type="submit" disabled={isPending} aria-busy={isPending}>
						{isPending && <Spinner />}
						{isPending ? 'Signing in…' : 'Sign in'}
					</Button>
				</Field>

				<FieldSeparator>Or continue with</FieldSeparator>

				<SocialAuthButtons callbackURL={callbackURL} disabled={isPending} />
			</FieldGroup>
		</form>
	)
}

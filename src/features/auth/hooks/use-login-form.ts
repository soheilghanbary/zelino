'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from '@/lib/auth/client'
import { getAuthErrorMessage } from '../lib'
import { type LoginValues, loginSchema } from '../schemas'

export function useLoginForm(options?: { callbackURL?: string }) {
	const callbackURL = options?.callbackURL ?? '/'
	const [formError, setFormError] = useState<string | null>(null)

	const form = useForm<LoginValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: '', password: '' },
		mode: 'onSubmit',
	})

	const onSubmit = form.handleSubmit(async (values) => {
		setFormError(null)

		const { error } = await signIn.email({
			email: values.email,
			password: values.password,
			callbackURL,
		})

		if (error) {
			setFormError(getAuthErrorMessage(error))
			return
		}

		window.location.assign(callbackURL)
	})

	return {
		form,
		onSubmit,
		formError,
		isPending: form.formState.isSubmitting,
		clearFormError: () => setFormError(null),
	}
}

'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { toast } from '@/components/ui/toast'
import { client } from '@/lib/orpc/client'
import { type SocialValues, socialSchema } from '../schemas'

function sanitizeUsername(value: string): string {
	const trimmed = value.trim()
	let candidate = trimmed

	try {
		const url = new URL(
			/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
		)
		if (url.hostname.includes('.')) {
			const segments = url.pathname.split('/').filter(Boolean)
			if (segments.length > 0) candidate = segments[segments.length - 1]
		}
	} catch {
		// Fall through to the raw value when it is not URL-like.
	}

	return candidate.replace(/^@/, '')
}
export function SocialForm(props: SocialValues) {
	const router = useRouter()
	const {
		control,
		handleSubmit,
		formState: { errors, isDirty },
		reset,
	} = useForm({
		resolver: zodResolver(socialSchema),
		mode: 'onBlur',
		defaultValues: {
			github: props.github ?? '',
			linkedin: props.linkedin ?? '',
			dribbble: props.dribbble ?? '',
			instagram: props.instagram ?? '',
			x: props.x ?? '',
			telegram: props.telegram ?? '',
			portfolio: props.portfolio ?? '',
		},
	})

	const { mutate, isPending } = useMutation(
		client.career.updateSocial.mutationOptions({
			onSuccess(res) {
				toast.add({
					title: 'Saved',
					type: 'success',
					description: res.msg,
				})
			},
		})
	)

	const isSaving = isPending

	const onSubmit = handleSubmit(async (data) => {
		await mutate(data)
		reset(data)
		router.refresh()
	})

	const field = (
		name: keyof SocialValues,
		label: string,
		placeholder: string
	) => (
		<Controller
			control={control}
			name={name}
			render={({ field: f, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel htmlFor={f.name}>{label}</FieldLabel>
					<Input
						{...f}
						id={f.name}
						placeholder={placeholder}
						aria-invalid={fieldState.invalid}
						disabled={isSaving}
						onChange={(event) =>
							f.onChange(sanitizeUsername(event.target.value))
						}
					/>
					<FieldError errors={[fieldState.error]} />
				</Field>
			)}
		/>
	)

	return (
		<form onSubmit={onSubmit}>
			<FieldSet disabled={isSaving}>
				<p className="text-muted-foreground text-sm/6">
					Enter just your username or handle for each platform. Full profile
					URLs are converted automatically.
				</p>
				<FieldGroup className="grid grid-cols-2 gap-4">
					{field('github', 'GitHub', 'username')}
					{field('linkedin', 'LinkedIn', 'username')}
					{field('dribbble', 'Dribbble', 'username')}
					{field('instagram', 'Instagram', 'username')}
					{field('x', 'X / Twitter', 'username')}
					{field('telegram', 'Telegram', 'username')}
					<Controller
						control={control}
						name="portfolio"
						render={({ field: f, fieldState }) => (
							<Field className="col-span-2" data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={f.name}>Portfolio URL</FieldLabel>
								<Input
									{...f}
									id={f.name}
									type="url"
									placeholder="example.com"
									aria-invalid={fieldState.invalid}
									disabled={isSaving}
								/>
								<FieldError errors={[fieldState.error]} />
							</Field>
						)}
					/>

					<Button
						type="submit"
						disabled={isSaving || !isDirty}
						aria-busy={isSaving}
						className={'col-span-2'}
					>
						{isSaving && <Spinner />}
						Save
					</Button>

					{errors.root && (
						<p role="alert" className="text-destructive text-sm">
							{errors.root.message}
						</p>
					)}
				</FieldGroup>
			</FieldSet>
		</form>
	)
}

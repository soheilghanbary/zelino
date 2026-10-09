'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
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
import { Textarea } from '@/components/ui/textarea'
import { client } from '@/lib/orpc/client'
import {
	DESCRIPTION_MAX,
	type Experience,
	type ExperienceInput,
	experienceInputSchema,
} from '../schemas'

const EMPTY_VALUES: ExperienceInput = {
	role: '',
	company: '',
	period: '',
	description: '',
}

type Props = {
	experience?: Experience
	onSuccess: () => void
}

export function ExperienceForm({ experience, onSuccess }: Props) {
	const router = useRouter()
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(experienceInputSchema),
		mode: 'onChange',
		defaultValues: experience
			? {
					role: experience.role,
					company: experience.company,
					period: experience.period,
					description: experience.description,
				}
			: EMPTY_VALUES,
	})

	const { mutateAsync: add, isPending: isAdding } = useMutation(
		client.career.addExperience.mutationOptions()
	)

	const { mutateAsync: update, isPending: isUpdating } = useMutation(
		client.career.updateExperience.mutationOptions()
	)

	const isPending = isAdding || isUpdating

	const onSubmit = handleSubmit(async (data: ExperienceInput) => {
		if (experience) {
			await update({ id: experience.id, experience: data })
			toast.success('Experience updated')
		} else {
			await add({ experience: data })
			toast.success('Experience added')
		}
		reset()
		onSuccess()
		router.refresh()
	})

	return (
		<form onSubmit={onSubmit}>
			<FieldSet disabled={isPending}>
				<FieldGroup className="gap-4">
					<Controller
						control={control}
						name="role"
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Role</FieldLabel>
								<Input
									{...field}
									id={field.name}
									placeholder="Senior Frontend Engineer"
									aria-invalid={fieldState.invalid}
								/>
								<FieldError errors={[fieldState.error]} />
							</Field>
						)}
					/>

					<Controller
						control={control}
						name="company"
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Company</FieldLabel>
								<Input
									{...field}
									id={field.name}
									placeholder="Acme Inc."
									aria-invalid={fieldState.invalid}
								/>
								<FieldError errors={[fieldState.error]} />
							</Field>
						)}
					/>

					<Controller
						control={control}
						name="period"
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Period</FieldLabel>
								<Input
									{...field}
									id={field.name}
									placeholder="2023 — Present"
									aria-invalid={fieldState.invalid}
								/>
								<FieldError errors={[fieldState.error]} />
							</Field>
						)}
					/>

					<Controller
						control={control}
						name="description"
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<div className="flex items-baseline justify-between gap-2">
									<FieldLabel htmlFor={field.name}>Description</FieldLabel>
									<span className="text-muted-foreground text-xs tabular-nums">
										{field.value.length}/{DESCRIPTION_MAX}
									</span>
								</div>
								<Textarea
									{...field}
									id={field.name}
									rows={4}
									placeholder="What did you build and ship?"
									aria-invalid={fieldState.invalid}
								/>
								<FieldError errors={[fieldState.error]} />
							</Field>
						)}
					/>

					<Button type="submit" className="ml-auto w-fit" aria-busy={isPending}>
						{isPending && <Spinner />}
						{experience ? 'Save changes' : 'Add experience'}
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

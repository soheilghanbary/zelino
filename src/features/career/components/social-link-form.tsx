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
import { type SocialLinkInput, socialLinkInputSchema } from '../schemas'

const TITLE_MAX = 80
const LINK_MAX = 200

const EMPTY_VALUES: SocialLinkInput = {
	title: '',
	link: '',
}

type Props = {
	socialLink?: {
		id: string
		title: string
		link: string
	}
	onSuccess: () => void
}

export function SocialLinkForm({ socialLink, onSuccess }: Props) {
	const router = useRouter()

	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm({
		resolver: zodResolver(socialLinkInputSchema),
		mode: 'onChange',
		defaultValues: socialLink
			? {
					title: socialLink.title,
					link: socialLink.link,
				}
			: EMPTY_VALUES,
	})

	const { mutateAsync: add, isPending: isAdding } = useMutation(
		client.career.addSocialLink.mutationOptions({
			onError(err) {
				toast.add({
					title: 'Error',
					type: 'error',
					description: err.message,
				})
			},
		})
	)

	const { mutateAsync: update, isPending: isUpdating } = useMutation(
		client.career.updateSocialLink.mutationOptions({
			onError(err) {
				toast.add({
					title: 'Error',
					type: 'error',
					description: err.message,
				})
			},
		})
	)

	const isPending = isAdding || isUpdating

	const onSubmit = handleSubmit(async (data: SocialLinkInput) => {
		if (socialLink) {
			await update({ id: socialLink.id, socialLink: data })
			toast.add({
				title: 'Saved',
				type: 'success',
				description: 'Social link updated',
			})
		} else {
			await add({ socialLink: data })
			toast.add({
				title: 'Saved',
				type: 'success',
				description: 'Social link added',
			})
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
						name="title"
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<div className="flex items-baseline justify-between gap-2">
									<FieldLabel htmlFor={field.name}>Title</FieldLabel>
									<span className="text-muted-foreground text-xs tabular-nums">
										{(field.value ?? '').length}/{TITLE_MAX}
									</span>
								</div>
								<Input
									{...field}
									id={field.name}
									placeholder="Dribbble, GitHub, LinkedIn…"
									aria-invalid={fieldState.invalid}
								/>
								<FieldError errors={[fieldState.error]} />
							</Field>
						)}
					/>

					<Controller
						control={control}
						name="link"
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<div className="flex items-baseline justify-between gap-2">
									<FieldLabel htmlFor={field.name}>Link</FieldLabel>
									<span className="text-muted-foreground text-xs tabular-nums">
										{(field.value ?? '').length}/{LINK_MAX}
									</span>
								</div>
								<Input
									{...field}
									id={field.name}
									type="url"
									placeholder="dribbble.com/username"
									aria-invalid={fieldState.invalid}
								/>
								<FieldError errors={[fieldState.error]} />
							</Field>
						)}
					/>

					<Button
						type="submit"
						className="ml-auto w-fit"
						aria-busy={isPending}
						disabled={isPending || !isValid}
					>
						{isPending && <Spinner />}
						{socialLink ? 'Save changes' : 'Add social link'}
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

'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { UploadIcon } from 'lucide-react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { client } from '@/lib/orpc/client'
import { type AboutValues, aboutSchema } from '../schemas'

const TAGLINE_MAX = 140
const SUMMARY_MAX = 600

export function AboutForm(props: AboutValues) {
	const {
		handleSubmit,
		control,
		formState: { errors, isDirty },
		reset,
	} = useForm({
		resolver: zodResolver(aboutSchema),
		mode: 'onBlur',
		defaultValues: props,
	})

	const image = useWatch({ control, name: 'image' }) ?? ''

	const { mutate, isPending } = useMutation(
		client.career.updateAbout.mutationOptions({
			onSuccess(res) {
				toast.success(res.msg)
			},
		})
	)

	const isSaving = isPending ?? !isDirty

	const onSubmit = handleSubmit(async (data) => {
		await mutate(data)
		reset({
			image: data.image,
			fullName: data.fullName,
			title: data.title,
			tagline: data.tagline,
			summary: data.summary,
		})
	})

	return (
		<form onSubmit={onSubmit}>
			<FieldSet disabled={isSaving}>
				<FieldGroup>
					<div className="flex flex-wrap items-center gap-4">
						<Avatar className="size-28">
							<AvatarImage
								src={image.length > 0 ? image : '/placeholder.webp'}
								alt=""
							/>
						</Avatar>
						<div className="grid gap-2">
							<Button
								type="button"
								variant="outline"
								className="w-fit"
								onClick={() => document.getElementById('about-image')?.click()}
								disabled={isSaving}
							>
								<UploadIcon />
								Replace photo
							</Button>
							<p className="max-w-xs text-balance text-muted-foreground text-xs/5">
								Upload a photo of yourself. JPG, PNG, or WebP up to 4MB.
							</p>
						</div>
					</div>

					<Controller
						control={control}
						name="image"
						render={({ field, fieldState }) => (
							<Field className="sr-only" data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Photo URL</FieldLabel>
								<Input
									{...field}
									id={field.name}
									type="url"
									placeholder="https://example.com/avatar.jpg"
									tabIndex={-1}
									autoComplete="off"
								/>
								<FieldError errors={[fieldState.error]} />
							</Field>
						)}
					/>
					<div className="grid gap-4 sm:grid-cols-2">
						<Controller
							control={control}
							name="fullName"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={field.name}>Full name</FieldLabel>
									<Input
										{...field}
										id={field.name}
										aria-invalid={fieldState.invalid}
										disabled={isSaving}
									/>
									<FieldError errors={[fieldState.error]} />
								</Field>
							)}
						/>

						<Controller
							control={control}
							name="title"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={field.name}>Job title</FieldLabel>
									<Input
										{...field}
										id={field.name}
										aria-invalid={fieldState.invalid}
										disabled={isSaving}
									/>
									<FieldError errors={[fieldState.error]} />
								</Field>
							)}
						/>

						<Controller
							control={control}
							name="tagline"
							render={({ field, fieldState }) => (
								<Field
									className="sm:col-span-2"
									data-invalid={fieldState.invalid}
								>
									<div className="flex items-baseline justify-between gap-2">
										<FieldLabel htmlFor={field.name}>Short tagline</FieldLabel>
										<span
											className={
												field.value?.length > TAGLINE_MAX
													? 'text-destructive text-xs tabular-nums'
													: 'text-muted-foreground text-xs tabular-nums'
											}
										>
											{field.value?.length}/{TAGLINE_MAX}
										</span>
									</div>
									<Input {...field} id={field.name} disabled={isSaving} />
									<FieldError errors={[fieldState.error]} />
								</Field>
							)}
						/>

						<Controller
							control={control}
							name="summary"
							render={({ field, fieldState }) => (
								<Field
									className="sm:col-span-2"
									data-invalid={fieldState.invalid}
								>
									<div className="flex items-baseline justify-between gap-2">
										<FieldLabel htmlFor={field.name}>About you</FieldLabel>
										<span
											className={
												field.value.length > SUMMARY_MAX
													? 'text-destructive text-xs tabular-nums'
													: 'text-muted-foreground text-xs tabular-nums'
											}
										>
											{field.value.length}/{SUMMARY_MAX}
										</span>
									</div>
									<Textarea
										{...field}
										id={field.name}
										rows={5}
										aria-invalid={fieldState.invalid}
										disabled={isSaving}
									/>
									<FieldError errors={[fieldState.error]} />
								</Field>
							)}
						/>
					</div>

					<Button
						type="submit"
						disabled={isSaving || !isDirty}
						aria-busy={isSaving}
						className={'w-fit'}
					>
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

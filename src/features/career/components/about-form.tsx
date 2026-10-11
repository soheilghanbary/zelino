'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { client } from '@/lib/orpc/client'
import { type AboutValues, aboutSchema } from '../schemas'
import { UploadImage } from './upload-image'

const TAGLINE_MAX = 140
const SUMMARY_MAX = 600

export function AboutForm(props: AboutValues) {
	const {
		handleSubmit,
		control,
		formState: { errors, isDirty },
		reset,
		setValue,
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
			location: data.location,
			phone: data.phone,
			githubUrl: data.githubUrl,
			linkedinUrl: data.linkedinUrl,
			openToWork: data.openToWork,
		})
	})

	return (
		<form onSubmit={onSubmit}>
			<FieldSet disabled={isSaving}>
				<FieldGroup>
					<UploadImage
						value={image}
						disabled={isSaving}
						onChange={(url) => {
							setValue('image', url, { shouldDirty: true })
						}}
					/>
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
							name="location"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={field.name}>Location</FieldLabel>
									<Input
										{...field}
										id={field.name}
										autoComplete="address-level2"
										placeholder="Berlin, Germany"
										aria-invalid={fieldState.invalid}
										disabled={isSaving}
									/>
									<FieldError errors={[fieldState.error]} />
								</Field>
							)}
						/>

						<Controller
							control={control}
							name="phone"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={field.name}>Phone</FieldLabel>
									<Input
										{...field}
										id={field.name}
										type="tel"
										inputMode="tel"
										autoComplete="tel"
										placeholder="+49 30 123456"
										aria-invalid={fieldState.invalid}
										disabled={isSaving}
									/>
									<FieldError errors={[fieldState.error]} />
								</Field>
							)}
						/>

						<Controller
							control={control}
							name="githubUrl"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={field.name}>GitHub</FieldLabel>
									<Input
										{...field}
										id={field.name}
										type="url"
										inputMode="url"
										placeholder="github.com/username"
										aria-invalid={fieldState.invalid}
										disabled={isSaving}
									/>
									<FieldError errors={[fieldState.error]} />
								</Field>
							)}
						/>

						<Controller
							control={control}
							name="linkedinUrl"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={field.name}>LinkedIn</FieldLabel>
									<Input
										{...field}
										id={field.name}
										type="url"
										inputMode="url"
										placeholder="linkedin.com/in/username"
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

						<Controller
							control={control}
							name="openToWork"
							render={({ field, fieldState }) => (
								<Field
									className="sm:col-span-2"
									orientation="horizontal"
									data-invalid={fieldState.invalid}
								>
									<FieldContent>
										<FieldLabel htmlFor={field.name}>Open to work</FieldLabel>
										<FieldDescription>
											Show on your public profile that you are available for new
											roles.
										</FieldDescription>
									</FieldContent>
									<Switch
										id={field.name}
										name={field.name}
										checked={field.value}
										onCheckedChange={field.onChange}
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

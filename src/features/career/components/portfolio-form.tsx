'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { UploadIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
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
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/toast'
import { useSession } from '@/lib/auth/client'
import { useEdgeStore } from '@/lib/edgestore'
import { client } from '@/lib/orpc/client'
import {
	DESCRIPTION_MAX,
	type PortfolioInput,
	portfolioInputSchema,
} from '../schemas'

const TITLE_MAX = 120
const LINK_MAX = 200

const EMPTY_VALUES: PortfolioInput = {
	title: '',
	image: '',
	description: '',
	link: '',
}

type Props = {
	portfolio?: {
		id: string
		title: string
		image: string
		description: string
		link: string
	}
	onSuccess: () => void
}

export function PortfolioForm({ portfolio, onSuccess }: Props) {
	const router = useRouter()
	const { data: session } = useSession()
	const { edgestore } = useEdgeStore()
	const [isUploading, setIsUploading] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
		reset,
		setValue,
	} = useForm({
		resolver: zodResolver(portfolioInputSchema),
		mode: 'onChange',
		defaultValues: portfolio
			? {
					title: portfolio.title,
					image: portfolio.image,
					description: portfolio.description,
					link: portfolio.link,
				}
			: EMPTY_VALUES,
	})

	const { mutateAsync: add, isPending: isAdding } = useMutation(
		client.career.addPortfolio.mutationOptions({
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
		client.career.updatePortfolio.mutationOptions({
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

	const uploadImage = async (file: File) => {
		const userId = session?.user?.id
		if (!userId) {
			toast.add({
				title: 'Error',
				type: 'error',
				description: 'You need to be signed in to upload an image',
			})
			return
		}
		setIsUploading(true)
		try {
			const uploaded = await edgestore.publicFiles.upload({
				file,
				input: { userId },
			})
			setValue('image', uploaded.url, { shouldDirty: true })
		} catch (error) {
			toast.add({
				title: 'Error',
				type: 'error',
				description: error instanceof Error ? error.message : 'Upload failed',
			})
		} finally {
			setIsUploading(false)
		}
	}

	const onSubmit = handleSubmit(async (data: PortfolioInput) => {
		if (portfolio) {
			await update({ id: portfolio.id, portfolio: data })
			toast.add({
				title: 'Saved',
				type: 'success',
				description: 'Portfolio item updated',
			})
		} else {
			await add({ portfolio: data })
			toast.add({
				title: 'Saved',
				type: 'success',
				description: 'Portfolio item added',
			})
		}
		reset()
		onSuccess()
		router.refresh()
	})

	return (
		<form onSubmit={onSubmit}>
			<FieldSet disabled={isPending || isUploading}>
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
									placeholder="Project name"
									aria-invalid={fieldState.invalid}
								/>
								<FieldError errors={[fieldState.error]} />
							</Field>
						)}
					/>

					<Controller
						control={control}
						name="image"
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Image</FieldLabel>
								<div className="flex items-center gap-2">
									<Input
										{...field}
										id={field.name}
										type="url"
										placeholder="https://example.com/image.jpg"
										aria-invalid={fieldState.invalid}
									/>
									<Button
										type="button"
										variant="outline"
										size="sm"
										disabled={isUploading}
										onClick={() => fileInputRef.current?.click()}
									>
										{isUploading ? <Spinner /> : <UploadIcon />}
										{isUploading ? 'Uploading' : 'Upload'}
									</Button>
									<input
										ref={fileInputRef}
										accept="image/jpeg,image/png,image/webp"
										className="hidden"
										type="file"
										onChange={(event) => {
											const file = event.target.files?.[0]
											if (file) void uploadImage(file)
											event.target.value = ''
										}}
									/>
								</div>
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
										{(field.value ?? '').length}/{DESCRIPTION_MAX}
									</span>
								</div>
								<Textarea
									{...field}
									id={field.name}
									rows={3}
									maxLength={DESCRIPTION_MAX}
									className="max-h-40 overflow-y-auto"
									placeholder="What is it about?"
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
									placeholder="example.com/project"
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
						{portfolio ? 'Save changes' : 'Add portfolio item'}
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

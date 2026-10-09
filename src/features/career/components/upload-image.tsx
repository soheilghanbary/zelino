'use client'
import { useMutation } from '@tanstack/react-query'
import { cn } from 'cn'
import { UploadIcon } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { buttonVariants } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useSession } from '@/lib/auth/client'
import { useEdgeStore } from '@/lib/edgestore'
import {
	IMAGE_ACCEPT,
	MAX_IMAGE_BYTES,
	MAX_IMAGE_LABEL,
	REJECTION_MESSAGES,
} from '@/lib/edgestore/config'
import { client } from '@/lib/orpc/client'

type UploadImageProps = {
	value: string
	onChange?: (url: string) => void
	disabled?: boolean
}

export function UploadImage({ value, onChange, disabled }: UploadImageProps) {
	const { data: session } = useSession()
	const { edgestore, state } = useEdgeStore()
	const [preview, setPreview] = useState<string | null>(null)
	const [progress, setProgress] = useState<number | null>(null)
	const abortRef = useRef<AbortController | null>(null)

	const { mutateAsync: updateImage } = useMutation(
		client.career.updateImage.mutationOptions({
			onSuccess: (res) => toast.success(res.msg),
			onError: (error) => toast.error(error.message),
		})
	)

	useEffect(() => {
		if (value) setPreview(null)
	}, [value])

	useEffect(
		() => () => {
			if (preview) URL.revokeObjectURL(preview)
		},
		[preview]
	)

	const isUploading = progress !== null

	const upload = useCallback(
		async (file: File) => {
			const userId = session?.user?.id
			if (!userId) {
				toast.error('You need to be signed in to upload a photo')
				return
			}

			abortRef.current?.abort()
			const controller = new AbortController()
			abortRef.current = controller

			setPreview(URL.createObjectURL(file))
			setProgress(0)

			try {
				const uploaded = await edgestore.publicFiles.upload({
					file,
					input: { userId },
					signal: controller.signal,
					onProgressChange: setProgress,
				})
				await updateImage({ image: uploaded.url })
				onChange?.(uploaded.url)
			} catch (error) {
				if (controller.signal.aborted) return
				toast.error(error instanceof Error ? error.message : 'Upload failed')
				setPreview(null)
			} finally {
				setProgress(null)
			}
		},
		[edgestore, onChange, session?.user?.id, updateImage]
	)

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: IMAGE_ACCEPT,
		maxSize: MAX_IMAGE_BYTES,
		multiple: false,
		disabled: disabled || !state.initialized,
		onDrop(accepted, rejections) {
			const rejection = rejections[0]
			if (rejection) {
				toast.error(
					REJECTION_MESSAGES[rejection.errors[0]?.code] ??
						'That file cannot be uploaded'
				)
				return
			}
			const [file] = accepted
			if (file) void upload(file)
		},
	})

	return (
		<div className="flex flex-wrap items-center gap-4">
			<Avatar className="size-28">
				<AvatarImage
					src={preview ?? (value.length > 0 ? value : '/placeholder.webp')}
					alt="Profile photo"
				/>
			</Avatar>
			<div className="grid gap-2">
				<button
					{...getRootProps({ role: 'button' })}
					type="button"
					className={cn(
						buttonVariants({ variant: 'outline' }),
						'w-fit',
						isDragActive && 'border-ring bg-muted',
						(isUploading || disabled || !state.initialized) && 'opacity-60'
					)}
				>
					{isUploading ? <Spinner /> : <UploadIcon />}
					{isUploading ? 'Uploading' : 'Replace photo'}
				</button>
				<input {...getInputProps()} />
				{isUploading && (
					<div
						role="progressbar"
						aria-label="Photo upload progress"
						aria-valuemax={100}
						aria-valuemin={0}
						aria-valuenow={Math.round(progress ?? 0)}
						className="h-1 w-40 overflow-hidden rounded-full bg-muted"
					>
						<div
							className="h-full rounded-full bg-primary transition-[width] duration-150"
							style={{ width: `${progress}%` }}
						/>
					</div>
				)}
				<p className="max-w-xs text-balance text-muted-foreground text-xs/5">
					Upload a photo of yourself. JPG, PNG, or WebP up to {MAX_IMAGE_LABEL}.
				</p>
			</div>
		</div>
	)
}

'use client'
import { UploadIcon, XIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface UploadImageProps {
	value?: string | File | null
	onChange: (file: File | null) => void
	disabled?: boolean
	placeholder?: string
	className?: string
}

const MAX_FILE_SIZE = 4 * 1024 * 1024

export function UploadImage({
	value,
	onChange,
	disabled = false,
	placeholder = '/placeholder.webp',
	className,
}: UploadImageProps) {
	const [preview, setPreview] = useState(placeholder)

	useEffect(() => {
		if (value instanceof File) {
			const objectUrl = URL.createObjectURL(value)
			setPreview(objectUrl)

			return () => URL.revokeObjectURL(objectUrl)
		}

		setPreview(value || placeholder)
	}, [value, placeholder])

	const { getRootProps, getInputProps, open, fileRejections, isDragActive } =
		useDropzone({
			accept: {
				'image/jpeg': ['.jpg', '.jpeg'],
				'image/png': ['.png'],
				'image/webp': ['.webp'],
			},
			maxSize: MAX_FILE_SIZE,
			multiple: false,
			disabled,
			noClick: true,
			onDropAccepted: ([file]) => {
				if (file) onChange(file)
			},
		})

	const error = fileRejections[0]?.errors[0]

	const errorMessage =
		error?.code === 'file-too-large'
			? 'Image must be 4MB or smaller.'
			: error?.code === 'file-invalid-type'
				? 'Only JPG, PNG, and WebP images are allowed.'
				: error?.message

	return (
		<div className={cn('grid gap-2', className)}>
			<div
				{...getRootProps()}
				className={cn(
					'flex flex-wrap items-center gap-4 rounded-lg transition-colors',
					isDragActive && 'rounded-lg bg-accent/50 ring-2 ring-primary/30'
				)}
			>
				<input {...getInputProps()} />

				<Avatar className="size-28">
					<AvatarImage src={preview} alt="Profile image" />
					<AvatarFallback>IMG</AvatarFallback>
				</Avatar>

				<div className="grid gap-2">
					<div className="flex flex-wrap items-center gap-2">
						<Button
							type="button"
							variant="outline"
							className="w-fit"
							onClick={open}
							disabled={disabled}
						>
							<UploadIcon />
							{isDragActive ? 'Drop image here' : 'Replace photo'}
						</Button>

						{value && (
							<Button
								type="button"
								variant="ghost"
								size="icon"
								aria-label="Remove image"
								onClick={() => onChange(null)}
								disabled={disabled}
							>
								<XIcon />
							</Button>
						)}
					</div>

					<p className="max-w-xs text-balance text-muted-foreground text-xs/5">
						{isDragActive
							? 'Drop your image here to upload.'
							: 'Upload a photo of yourself. JPG, PNG, or WebP up to 4MB. You can also drag and drop an image here.'}
					</p>

					{errorMessage && (
						<p role="alert" className="text-destructive text-sm">
							{errorMessage}
						</p>
					)}
				</div>
			</div>
		</div>
	)
}

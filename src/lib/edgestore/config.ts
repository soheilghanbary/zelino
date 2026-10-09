export const IMAGE_ACCEPT = {
	'image/jpeg': ['.jpg', '.jpeg'],
	'image/png': ['.png'],
	'image/webp': ['.webp'],
} as const

export const ACCEPTED_IMAGE_TYPES = Object.keys(IMAGE_ACCEPT)

export const MAX_IMAGE_BYTES = 4 * 1024 * 1024

export const MAX_IMAGE_LABEL = `${MAX_IMAGE_BYTES / 1024 / 1024}MB`

export const REJECTION_MESSAGES: Record<string, string> = {
	'file-invalid-type': `Only ${ACCEPTED_IMAGE_TYPES.map((type) => type.replace('image/', '').toUpperCase()).join(', ')} images are allowed`,
	'file-too-large': `Image must be smaller than ${MAX_IMAGE_LABEL}`,
}

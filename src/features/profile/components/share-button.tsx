'use client'

import { Share2Icon } from 'lucide-react'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

type Props = {
	name: string
}

export function ShareButton({ name }: Props) {
	const [pending, setPending] = useState(false)

	const share = useCallback(async () => {
		const url = window.location.href
		const data = { text: `${name}'s profile`, title: name, url }

		if (navigator.share) {
			try {
				await navigator.share(data)
				return
			} catch {
				// Dismissed by the reader — no feedback, no error.
				return
			}
		}

		setPending(true)
		try {
			await navigator.clipboard.writeText(url)
			toast.success('Link copied to clipboard')
		} catch {
			toast.error('Could not copy the link')
		} finally {
			setPending(false)
		}
	}, [name])

	return (
		<Button
			aria-label="Share this profile"
			className="rounded-full"
			disabled={pending}
			onClick={share}
			size="sm"
			variant="outline"
		>
			{pending ? <Spinner /> : <Share2Icon />}
			Share
		</Button>
	)
}

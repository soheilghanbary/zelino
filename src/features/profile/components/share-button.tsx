'use client'

import { Share2Icon } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { toast } from '@/components/ui/toast'

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
			toast.add({ title: 'Copied', description: 'Link copied to clipboard' })
		} catch {
			toast.add({
				title: 'Error',
				type: 'error',
				description: 'Could not copy link',
			})
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
			variant="outline"
		>
			{pending ? <Spinner /> : <Share2Icon />}
			Share
		</Button>
	)
}

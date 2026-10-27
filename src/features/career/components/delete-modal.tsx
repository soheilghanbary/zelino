'use client'

import { useMutation } from '@tanstack/react-query'
import { TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useId, useState } from 'react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { toast } from '@/components/ui/toast'
import { signOut } from '@/lib/auth/client'
import { client } from '@/lib/orpc/client'

type Props = {
	username: string
}

export function DeleteModal({ username }: Props) {
	const router = useRouter()
	const fieldId = useId()
	const [open, setOpen] = useState(false)
	const [confirm, setConfirm] = useState('')

	const {
		error,
		isPending,
		mutateAsync: remove,
	} = useMutation(client.career.deleteAccount.mutationOptions())

	// Case-insensitive to match the server check; the input itself is never
	// trimmed before sending because the schema owns that.
	const canDelete = confirm.trim().toLowerCase() === username.toLowerCase()

	const onOpenChange = (next: boolean) => {
		// Don't let Escape or an outside click abandon a delete mid-flight.
		if (isPending) return
		setOpen(next)
		if (!next) setConfirm('')
	}

	const onDelete = async () => {
		try {
			await remove({ confirm })
		} catch {
			// Rendered inline from `error`; keep the dialog open so the typed
			// confirmation is not lost.
			return
		}

		// The session row cascaded away with the account, so this only has to
		// drop the now-meaningless cookie.
		await signOut().catch(() => undefined)
		toast.add({
			title: 'Account deleted',
			description: 'Your profile and sessions have been removed.',
			type: 'success',
		})
		router.replace('/')
		router.refresh()
	}

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogTrigger
				render={
					<Button variant="destructive" className="mt-4">
						<TrashIcon /> Delete account
					</Button>
				}
			/>
			<AlertDialogContent className="sm:max-w-md">
				<AlertDialogHeader>
					<AlertDialogTitle>Delete account</AlertDialogTitle>
					<AlertDialogDescription>
						This permanently removes your profile at /{username}, every saved
						skill and role, and all active sessions. It cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<Field data-invalid={Boolean(error)}>
					<FieldLabel htmlFor={fieldId}>
						Type <span className="text-foreground font-medium">{username}</span>{' '}
						to confirm
					</FieldLabel>
					<Input
						autoComplete="off"
						autoFocus
						id={fieldId}
						value={confirm}
						placeholder={username}
						disabled={isPending}
						aria-invalid={Boolean(error)}
						onChange={(event) => setConfirm(event.target.value)}
					/>
					{error && <FieldError>{error.message}</FieldError>}
				</Field>

				<AlertDialogFooter>
					<AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={!canDelete || isPending}
						aria-busy={isPending}
						variant="destructive"
						onClick={onDelete}
					>
						{isPending && <Spinner />}
						Delete account
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

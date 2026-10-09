'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Edit3Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { client } from '@/lib/orpc/client'

type Props = {
	value: string
}

const MAX_LENGTH = 20

export function EditUsername({ value }: Props) {
	const router = useRouter()
	const [open, setOpen] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { isDirty },
		watch,
		reset,
	} = useForm({
		resolver: zodResolver(z.object({ username: z.string() })),
		defaultValues: { username: value },
	})

	const username = watch('username')

	const { mutateAsync, isPending } = useMutation(
		client.career.updateUsername.mutationOptions()
	)

	const onSave = handleSubmit(async (data) => {
		await mutateAsync(data)
		router.refresh()
		setOpen(false)
		reset({
			username: data.username,
		})
	})

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger
				render={
					<Button variant="outline" size={'icon'}>
						<Edit3Icon />
					</Button>
				}
			/>
			<DialogContent className={'sm:max-w-xs'}>
				<DialogHeader>
					<DialogTitle>Update your username</DialogTitle>
				</DialogHeader>
				<form onSubmit={onSave}>
					<FieldSet disabled={isPending}>
						<FieldGroup className="gap-4">
							<Field className="col-span-2">
								<FieldLabel>
									Username ({username.length}/{MAX_LENGTH})
								</FieldLabel>
								<Input
									type="text"
									placeholder="new username"
									maxLength={MAX_LENGTH}
									{...register('username')}
								/>
								<FieldDescription className="wrap-anywhere">
									zelino.vercel.app/
									<span className="text-foreground">{username}</span>
								</FieldDescription>
							</Field>
							<Button
								type="submit"
								onClick={onSave}
								className={'ml-auto w-fit'}
								disabled={!isDirty}
							>
								{isPending && <Spinner />}
								Save changes
							</Button>
						</FieldGroup>
					</FieldSet>
				</form>
			</DialogContent>
		</Dialog>
	)
}

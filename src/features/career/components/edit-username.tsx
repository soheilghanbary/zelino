'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Edit3Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
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
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { toast } from '@/components/ui/toast'
import { appConfig } from '@/config'
import { useIsMobile } from '@/hooks/use-mobile'
import { client } from '@/lib/orpc/client'

type Props = {
	value: string
}

const MAX_LENGTH = 20

export function EditUsername({ value }: Props) {
	const router = useRouter()
	const isMobile = useIsMobile()
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

	useEffect(() => {
		reset({ username: value })
	}, [value, reset])

	const { mutateAsync, isPending } = useMutation(
		client.career.updateUsername.mutationOptions({
			onError(err) {
				toast.add({
					title: 'Error',
					type: 'error',
					description: err.message,
				})
			},
		})
	)

	const onSave = handleSubmit(async (data) => {
		await mutateAsync(data)
		router.refresh()
		setOpen(false)
		reset({ username: data.username })
	})

	const trigger = (
		<Button variant="outline" size={'icon'}>
			<Edit3Icon />
		</Button>
	)

	const content = (
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
							{appConfig.siteDomain}/
							<span className="text-foreground">{username}</span>
						</FieldDescription>
					</Field>
					<Button
						type="submit"
						className={'ml-auto w-fit'}
						disabled={!isDirty || isPending}
					>
						{isPending && <Spinner />}
						Save changes
					</Button>
				</FieldGroup>
			</FieldSet>
		</form>
	)

	if (isMobile) {
		return (
			<Drawer open={open} onOpenChange={setOpen} showSwipeHandle>
				<DrawerTrigger render={trigger} />
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Update your username</DrawerTitle>
					</DrawerHeader>
					<div className="p-4">{content}</div>
				</DrawerContent>
			</Drawer>
		)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger render={trigger} />
			<DialogContent className={'sm:max-w-xs'}>
				<DialogHeader>
					<DialogTitle>Update your username</DialogTitle>
				</DialogHeader>
				{content}
			</DialogContent>
		</Dialog>
	)
}

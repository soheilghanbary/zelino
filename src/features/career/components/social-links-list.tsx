'use client'
import { useMutation } from '@tanstack/react-query'
import { LinkIcon, PencilIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui/empty'
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemHeader,
	ItemMedia,
	ItemTitle,
} from '@/components/ui/item'
import { Spinner } from '@/components/ui/spinner'
import { toast } from '@/components/ui/toast'
import { useIsMobile } from '@/hooks/use-mobile'
import { client } from '@/lib/orpc/client'
import {
	SOCIAL_LINKS_MAX,
	type SocialLinkItem,
	type SocialLinksValues,
} from '../schemas'
import { SocialLinkForm } from './social-link-form'

type Props = {
	socialLinks: SocialLinksValues
}

export function SocialLinksList({ socialLinks }: Props) {
	const router = useRouter()
	const isMobile = useIsMobile()
	const [open, setOpen] = useState(false)
	const [editing, setEditing] = useState<SocialLinkItem | null>(null)
	const [deletingId, setDeletingId] = useState<string | null>(null)

	const { mutateAsync: remove } = useMutation(
		client.career.removeSocialLink.mutationOptions()
	)

	const openAdd = () => {
		setEditing(null)
		setOpen(true)
	}

	const openEdit = (item: SocialLinkItem) => {
		setEditing(item)
		setOpen(true)
	}

	const closeDialog = () => {
		setOpen(false)
		setEditing(null)
	}

	const onOpenChange = (next: boolean) => {
		if (next) {
			setOpen(true)
			return
		}
		closeDialog()
	}

	const onRemove = async (id: string) => {
		setDeletingId(id)
		try {
			await remove({ id })
			toast.add({
				title: 'Removed',
				description: 'Social link removed',
			})
			router.refresh()
		} finally {
			setDeletingId(null)
		}
	}

	const triggerButton = (
		<Button size="sm" disabled={socialLinks.length >= SOCIAL_LINKS_MAX}>
			<PlusIcon />
			Add social link
		</Button>
	)

	const form = (
		<SocialLinkForm
			key={editing?.id ?? 'new'}
			socialLink={editing ?? undefined}
			onSuccess={closeDialog}
		/>
	)

	const modal = isMobile ? (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerTrigger render={triggerButton} />
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>
						{editing ? 'Edit social link' : 'Add social link'}
					</DrawerTitle>
					<DrawerDescription>
						{editing
							? 'Update the details of this link.'
							: 'Add a profile link to your public page.'}
					</DrawerDescription>
				</DrawerHeader>
				<div className="p-4">{form}</div>
			</DrawerContent>
		</Drawer>
	) : (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogTrigger render={triggerButton} />
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>
						{editing ? 'Edit social link' : 'Add social link'}
					</DialogTitle>
					<DialogDescription>
						{editing
							? 'Update the details of this link.'
							: 'Add a profile link to your public page.'}
					</DialogDescription>
				</DialogHeader>
				{form}
			</DialogContent>
		</Dialog>
	)

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between gap-2">
				<p className="text-muted-foreground text-sm/6">
					Social links {socialLinks.length}/{SOCIAL_LINKS_MAX}
				</p>
				{modal}
			</div>

			{socialLinks.length === 0 ? (
				<Empty>
					<EmptyHeader>
						<EmptyMedia variant="icon">
							<LinkIcon />
						</EmptyMedia>
						<EmptyTitle>No social links yet</EmptyTitle>
						<EmptyDescription>
							Add links like Dribbble, GitHub, or LinkedIn.
						</EmptyDescription>
					</EmptyHeader>
					<EmptyContent>
						<Button variant="outline" size="sm" onClick={openAdd}>
							<PlusIcon />
							Add social link
						</Button>
					</EmptyContent>
				</Empty>
			) : (
				<ItemGroup>
					{socialLinks.map((item) => (
						<Item key={item.id} variant="muted">
							<ItemHeader>
								<ItemMedia variant="icon">
									<LinkIcon />
								</ItemMedia>
								<ItemContent>
									<ItemTitle>{item.title}</ItemTitle>
									{item.link && (
										<ItemDescription className="truncate">
											{item.link}
										</ItemDescription>
									)}
								</ItemContent>
								<div className="flex items-center gap-1">
									<Button
										variant="ghost"
										size="icon"
										aria-label={`Edit ${item.title}`}
										onClick={() => openEdit(item)}
									>
										<PencilIcon />
									</Button>
									<Button
										variant="ghost"
										size="icon"
										className="text-muted-foreground hover:text-destructive"
										aria-label={`Remove ${item.title}`}
										aria-busy={deletingId === item.id}
										disabled={deletingId === item.id}
										onClick={() => onRemove(item.id)}
									>
										{deletingId === item.id ? <Spinner /> : <TrashIcon />}
									</Button>
								</div>
							</ItemHeader>
						</Item>
					))}
				</ItemGroup>
			)}
		</div>
	)
}

'use client'
import { useMutation } from '@tanstack/react-query'
import { ImageIcon, PencilIcon, PlusIcon, TrashIcon } from 'lucide-react'
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
	PORTFOLIOS_MAX,
	type PortfolioItem,
	type PortfoliosValues,
} from '../schemas'
import { PortfolioForm } from './portfolio-form'

type Props = {
	portfolios: PortfoliosValues
}

export function PortfoliosList({ portfolios }: Props) {
	const router = useRouter()
	const isMobile = useIsMobile()
	const [open, setOpen] = useState(false)
	const [editing, setEditing] = useState<PortfolioItem | null>(null)
	const [deletingId, setDeletingId] = useState<string | null>(null)

	const { mutateAsync: remove } = useMutation(
		client.career.removePortfolio.mutationOptions()
	)

	const openAdd = () => {
		setEditing(null)
		setOpen(true)
	}

	const openEdit = (portfolio: PortfolioItem) => {
		setEditing(portfolio)
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
				description: 'Portfolio item removed',
			})
			router.refresh()
		} finally {
			setDeletingId(null)
		}
	}

	const triggerButton = (
		<Button size="sm" disabled={portfolios.length >= PORTFOLIOS_MAX}>
			<PlusIcon />
			Add portfolio item
		</Button>
	)

	const portfolioForm = (
		<PortfolioForm
			key={editing?.id ?? 'new'}
			portfolio={editing ?? undefined}
			onSuccess={closeDialog}
		/>
	)

	const modal = isMobile ? (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerTrigger render={triggerButton} />
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>
						{editing ? 'Edit portfolio item' : 'Add portfolio item'}
					</DrawerTitle>
					<DrawerDescription>
						{editing
							? 'Update the details of this item.'
							: 'Add a project or gallery item to your public profile.'}
					</DrawerDescription>
				</DrawerHeader>
				<div className="p-4">{portfolioForm}</div>
			</DrawerContent>
		</Drawer>
	) : (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogTrigger render={triggerButton} />
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>
						{editing ? 'Edit portfolio item' : 'Add portfolio item'}
					</DialogTitle>
					<DialogDescription>
						{editing
							? 'Update the details of this item.'
							: 'Add a project or gallery item to your public profile.'}
					</DialogDescription>
				</DialogHeader>
				{portfolioForm}
			</DialogContent>
		</Dialog>
	)

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between gap-2">
				<p className="text-muted-foreground text-sm/6">
					Portfolio items {portfolios.length}/{PORTFOLIOS_MAX}
				</p>
				{modal}
			</div>

			{portfolios.length === 0 ? (
				<Empty>
					<EmptyHeader>
						<EmptyMedia variant="icon">
							<ImageIcon />
						</EmptyMedia>
						<EmptyTitle>No portfolio items yet</EmptyTitle>
						<EmptyDescription>
							Add your first item to showcase your work.
						</EmptyDescription>
					</EmptyHeader>
					<EmptyContent>
						<Button variant="outline" size="sm" onClick={openAdd}>
							<PlusIcon />
							Add portfolio item
						</Button>
					</EmptyContent>
				</Empty>
			) : (
				<ItemGroup>
					{portfolios.map((item) => (
						<Item key={item.id} variant="muted">
							<ItemHeader>
								{item.image ? (
									<ItemMedia variant="image">
										{/* eslint-disable-next-line @next/next/no-img-element */}
										{/* biome-ignore lint/performance/noImgElement: user-provided remote image */}
										<img
											alt={item.title}
											className="size-full object-cover"
											src={item.image}
										/>
									</ItemMedia>
								) : (
									<ItemMedia variant="icon">
										<ImageIcon />
									</ItemMedia>
								)}
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
							{item.description && (
								<p className="whitespace-pre-wrap text-muted-foreground text-sm/6">
									{item.description}
								</p>
							)}
						</Item>
					))}
				</ItemGroup>
			)}
		</div>
	)
}

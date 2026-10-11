'use client'
import { useMutation } from '@tanstack/react-query'
import { BriefcaseIcon, PencilIcon, PlusIcon, TrashIcon } from 'lucide-react'
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
import { client } from '@/lib/orpc/client'
import {
	EXPERIENCES_MAX,
	type Experience,
	type ExperiencesValues,
} from '../schemas'
import { ExperienceForm } from './experience-form'

type Props = {
	experiences: ExperiencesValues
}

export function ExperiencesList({ experiences }: Props) {
	const router = useRouter()
	const [open, setOpen] = useState(false)
	const [editing, setEditing] = useState<Experience | null>(null)
	const [deletingId, setDeletingId] = useState<string | null>(null)

	const { mutateAsync: remove } = useMutation(
		client.career.removeExperience.mutationOptions()
	)

	const openAdd = () => {
		setEditing(null)
		setOpen(true)
	}

	const openEdit = (experience: Experience) => {
		setEditing(experience)
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
				description: 'Experience removed',
			})
			router.refresh()
		} finally {
			setDeletingId(null)
		}
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between gap-2">
				<p className="text-muted-foreground text-sm/6">
					Work history {experiences.length}/{EXPERIENCES_MAX}
				</p>
				<Dialog open={open} onOpenChange={onOpenChange}>
					<DialogTrigger
						render={
							<Button
								size="sm"
								disabled={experiences.length >= EXPERIENCES_MAX}
							>
								<PlusIcon />
								Add experience
							</Button>
						}
					/>
					<DialogContent className="sm:max-w-md">
						<DialogHeader>
							<DialogTitle>
								{editing ? 'Edit experience' : 'Add experience'}
							</DialogTitle>
							<DialogDescription>
								{editing
									? 'Update the details of this role.'
									: 'Add a role you held. Visitors see this on your public profile.'}
							</DialogDescription>
						</DialogHeader>
						<ExperienceForm
							key={editing?.id ?? 'new'}
							experience={editing ?? undefined}
							onSuccess={closeDialog}
						/>
					</DialogContent>
				</Dialog>
			</div>

			{experiences.length === 0 ? (
				<Empty>
					<EmptyHeader>
						<EmptyMedia variant="icon">
							<BriefcaseIcon />
						</EmptyMedia>
						<EmptyTitle>No experience yet</EmptyTitle>
						<EmptyDescription>
							Add your first role to show where you have worked.
						</EmptyDescription>
					</EmptyHeader>
					<EmptyContent>
						<Button variant="outline" size="sm" onClick={openAdd}>
							<PlusIcon />
							Add experience
						</Button>
					</EmptyContent>
				</Empty>
			) : (
				<ItemGroup>
					{experiences.map((experience) => (
						<Item key={experience.id} variant="outline">
							<ItemHeader>
								<ItemMedia variant="icon">
									<BriefcaseIcon />
								</ItemMedia>
								<ItemContent>
									<ItemTitle>{experience.role}</ItemTitle>
									<ItemDescription>{experience.company}</ItemDescription>
								</ItemContent>
								<div className="flex items-center gap-1">
									<Button
										variant="ghost"
										size="icon"
										aria-label={`Edit ${experience.role} at ${experience.company}`}
										onClick={() => openEdit(experience)}
									>
										<PencilIcon />
									</Button>
									<Button
										variant="ghost"
										size="icon"
										className="text-muted-foreground hover:text-destructive"
										aria-label={`Remove ${experience.role} at ${experience.company}`}
										aria-busy={deletingId === experience.id}
										disabled={deletingId === experience.id}
										onClick={() => onRemove(experience.id)}
									>
										{deletingId === experience.id ? <Spinner /> : <TrashIcon />}
									</Button>
								</div>
							</ItemHeader>
							<p className="text-muted-foreground text-sm/6">
								{experience.period}
							</p>
							{experience.description && (
								<p className="whitespace-pre-wrap text-sm/6">
									{experience.description}
								</p>
							)}
						</Item>
					))}
				</ItemGroup>
			)}
		</div>
	)
}

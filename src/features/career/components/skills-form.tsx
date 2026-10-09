'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { type Tag, TagInput } from 'emblor'
import { Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { client } from '@/lib/orpc/client'
import { type SkillsValues, skillsSchema } from '../schemas'

export function SkillsForm({ skills }: SkillsValues) {
	const [tags, setTags] = useState<Tag[]>(skills)
	const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null)
	const router = useRouter()
	const {
		control,
		handleSubmit,
		formState: { isDirty },
		reset,
	} = useForm({
		resolver: zodResolver(skillsSchema),
		defaultValues: { skills: tags },
	})

	const { mutateAsync, isPending } = useMutation(
		client.career.updateSkills.mutationOptions({
			onSuccess(res) {
				toast(res.msg)
				router.refresh()
			},
		})
	)

	const isSaving = isPending || !isDirty

	const onSubmit = handleSubmit(async (data) => {
		await mutateAsync(data)
		reset({
			skills: data.skills,
		})
	})

	return (
		<form onSubmit={onSubmit}>
			<FieldGroup>
				<Field>
					<FieldLabel>
						Your skills {tags.length}/{10}
					</FieldLabel>
					<Controller
						control={control}
						name="skills"
						render={({ field }) => (
							<TagInput
								placeholder="Enter a topic"
								tags={tags}
								setTags={(e) => {
									setTags(e)
									field.onChange(e)
								}}
								activeTagIndex={activeTagIndex}
								setActiveTagIndex={setActiveTagIndex}
								{...field}
							/>
						)}
					/>
				</Field>
				<Button type="submit" className={'w-fit'} disabled={isSaving}>
					<Save />
					Save
				</Button>
			</FieldGroup>
		</form>
	)
}

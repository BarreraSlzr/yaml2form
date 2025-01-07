"use client"

import React, { FormEvent, useState } from 'react'
import { Command, CommandInput } from "@/components/ui/command"
import { YamlCommandMenu } from './yaml-command-menu'
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, X } from 'lucide-react'
import { useYamlContent } from '@/contexts/yaml-content'
import { CommandDialogForm } from './create-command-form'

export function YamlCommandWrapper() {
    const { yamlContent, removeItems } = useYamlContent()
    const [search, setSearch] = useState('')
    const [open, setOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement
        if (submitter.id === 'remove' && editMode) {
            const formData = new FormData(event.currentTarget)
            const checkedItems = Object.fromEntries(formData.entries()) as Record<string, string>
            await removeItems(checkedItems)
        }
        setEditMode(false)
    }

    return (
        <div className="relative">
            <form onSubmit={handleSubmit}>
                <Command className="rounded-lg border shadow-md">
                    <CommandInput
                        placeholder="Search..."
                        onValueChange={setSearch}
                        defaultValue={search}
                    />
                    <Button
                        size="sm"
                        variant="outline"
                        className="absolute right-0  size-6 m-2"
                        onClick={() => setOpen(true)}
                    >
                        <Plus />
                    </Button>
                    <YamlCommandMenu yamlContent={yamlContent} editionMode={editMode} />
                </Command>
                <div className="flex flex-row gap-2 my-3 justify-end">
                    <Button
                    key='edit'
                    type='button'
                        size="sm"
                        variant="outline"
                        className="text-blue-500 border-blue-500 size-6"
                        onClick={() => setEditMode(!editMode)}
                    >
                        {editMode ? <X /> : <Edit />}
                    </Button>
                    {editMode && (
                        <Button key='remove' type="submit" id="remove" size="sm" variant="destructive" className="size-6">
                            <Trash2 />
                        </Button>
                    )}
                </div>
            </form>
            <CommandDialogForm search={search} open={open} setOpen={setOpen} />
        </div>
    )
}


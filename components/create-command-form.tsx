"use client"

import React, { FormEvent, useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Command, CommandDialog, CommandInput, CommandList, CommandGroup, CommandItem } from "@/components/ui/command"
import { Check, X } from 'lucide-react'
import { useYamlContent } from '@/contexts/yaml-content'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface CommandDialogFormProps {
  search: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function CommandDialogForm({ search, open, setOpen }: CommandDialogFormProps) {
  const { yamlContent, addItem } = useYamlContent()
  const [selectedGroup, setSelectedGroup] = useState<string>('')
  const [groupSearch, setGroupSearch] = useState<string>('')

  const existingGroups = useMemo(() => {
    const groups = Object.keys(yamlContent)
    if (groupSearch) {
      groups.push(groupSearch);
    }
    return Array.from(new Set(groups))
  }
    , [, groupSearch])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const key = formData.get('key') as string
    const description = formData.get('description') as string
    const group = selectedGroup || groupSearch || 'Default'

    if (key && description) {
      await addItem(group, key, description)
      setOpen(false)
    }
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <DialogHeader className='m-3'>
        <DialogTitle>Add New Item</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <Input
          key='key'
          id='key'
          name="key"
          placeholder="Enter key..."
          defaultValue={search}
          className="w-full"
        />
        <Input
          key='description'
          id='description'
          type='text'
          name="description"
          placeholder="Enter description..."
          className="w-full"
        />
        <Command className="relative rounded-lg border shadow-md">
          <CommandInput
            placeholder="Search group..."
            value={groupSearch}
            onValueChange={setGroupSearch}
          />
          <CommandList>
            <CommandGroup>
              {existingGroups
                .map((group) => (
                  <CommandItem
                    key={group}
                    onSelect={() => {
                      setSelectedGroup(group)
                      setGroupSearch(group)
                    }}
                  >
                    {group}
                  </CommandItem>
                ))
              }
            </CommandGroup>
          </CommandList>
        </Command>
        <div className="flex justify-end space-x-2">
          <Button type="reset" size="sm" variant="ghost" onClick={() => setOpen(false)}>
            <X />
          </Button>
          <Button
            type="submit"
            size="sm"
            variant="outline"
            className="bg-green-500 text-white border-green-500 hover:bg-green-600"
          >
            <Check />
          </Button>
        </div>
      </form>
    </CommandDialog>
  )
}


"use client"

import { useState } from 'react'
import { YamlCommandMenu, YamlStructure } from "./yaml-command-menu"
import { Button } from "@/components/ui/button"
import { CommandInput } from "@/components/ui/command"
import { Input } from './ui/input'

interface CreateCommandFormProps {
  onSave: (newYaml: YamlStructure) => void
}

export function CreateCommandForm({ onSave }: CreateCommandFormProps) {
  const [showDescription, setShowDescription] = useState(false)
  const [isKeyEmpty, setIsKeyEmpty] = useState(true)
  const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(true)
  const [YamlStructure, setYamlStructure] = useState<YamlStructure>({})

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const key = formData.get('key')?.toString().trim()
    const description = formData.get('description')?.toString().trim()

    if (key && description) {
      const newItem = {
        [key]: {
          id: key.toLowerCase().replace(/\s+/g, '_'),
          description
        }
      }
      setYamlStructure({ Creating: {...newItem, ...YamlStructure['Creating']} })
      setShowDescription(false)
      setIsKeyEmpty(true)
      setIsDescriptionEmpty(true)
    } else if (key) {
      setShowDescription(true)
    }
  }

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    const key = event.currentTarget?.elements.namedItem('key') as HTMLInputElement
    const description = event.currentTarget?.elements.namedItem('description') as HTMLInputElement
    setIsKeyEmpty(!key.value)
    setIsDescriptionEmpty(!description?.value)
  }

  const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
    (event.currentTarget?.elements.namedItem('key') as HTMLInputElement).value = '';
    setShowDescription(false)
    setIsKeyEmpty(true)
    setIsDescriptionEmpty(true)
    setYamlStructure({ })
  }

  return (
    <form onSubmit={handleSubmit} onChange={handleChange} onReset={handleReset} className="space-y-4">
      <YamlCommandMenu yamlContent={YamlStructure} editionMode={false}>
        <CommandInput key='key' id='key' name="key" placeholder="Enter key..." />
        <Input key='description' id='description' type='text' name="description" placeholder="Enter description..." disabled={!showDescription}/>
      </YamlCommandMenu>
      <div className="flex justify-end space-x-2">
        {!showDescription && (
          <Button 
            type="submit" 
            size="sm" 
            variant="outline" 
            className="text-blue-500 border-blue-500"
            disabled={isKeyEmpty}
          >
            Create
          </Button>
        )}
        {showDescription && (
          <Button 
            type="submit" 
            size="sm" 
            variant="outline" 
            className="bg-green-500 text-white border-green-500 hover:bg-green-600"
            disabled={isKeyEmpty || isDescriptionEmpty}
          >
            Add
          </Button>
        )}
        <Button type="reset" size="sm" variant="ghost">
          Cancel
        </Button>
        { !!Object.keys(YamlStructure).length && (
          <Button 
            type="button" 
            size="sm" 
            variant="default"
            onClick={() => onSave(YamlStructure)}
          >
            Save
          </Button>
        )}
      </div>
    </form>
  )
}


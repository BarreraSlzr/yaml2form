"use client"

import { useState } from 'react'
import { YamlCommandMenu, YamlStructure } from "./yaml-command-menu"
import { Button } from "@/components/ui/button"

interface YamlCommandFormProps {
  yamlContent: YamlStructure
  onUpdate: (newYaml: YamlStructure) => void
}

type ActionType = () => Promise<void>

export function YamlCommandForm({ yamlContent, onUpdate }: YamlCommandFormProps) {
  const [editMode, setEditMode] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const submitterId = ((event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement).id
    const actions: Record<string, ActionType> = {
      delete: async () => {
        console.log('Delete action')
        // Implement delete action here
      },
      edit: async () => {
        console.log('Edit action')
        // Implement edit action here
      },
    }
    
    const action = actions[submitterId]
    if (action) {
      await action()
    }
  }

  const handleReset = () => {
    setEditMode(!editMode)
  }

  return (
    <form onSubmit={handleSubmit} onReset={handleReset} className="space-y-4">
      <YamlCommandMenu 
        yamlContent={yamlContent} 
        editionMode={editMode}
      />
      <div className="flex justify-end space-x-2">
        {editMode ? (
          <>
            <Button type="submit" id="delete" size="sm" variant="destructive">
              Delete
            </Button>
            <Button 
              type="submit" 
              id="edit" 
              size="sm" 
              variant="outline" 
              className="text-blue-500 border-blue-500"
            >
              Edit
            </Button>
            <Button type="reset" size="sm" variant="secondary">
              Cancel
            </Button>
          </>
        ) : (
          <Button 
            type="reset" 
            size="sm" 
            variant="outline" 
            className="text-blue-500 border-blue-500"
          >
            Edit
          </Button>
        )}
      </div>
    </form>
  )
}

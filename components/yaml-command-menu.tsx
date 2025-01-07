"use client"

import React from 'react'
import { CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { DefaultItemTemplate } from "./default-item-template"

interface YamlCommandMenuProps {
  yamlContent: YamlStructure
  ItemTemplate?: React.ComponentType<{ item: { id: string; key: string; description: string }; editionMode?: boolean; }>
  editionMode?: boolean
}

export interface YamlStructure {
  [group: string]: {
    [key: string]: {
      id: string
      description: string
    }
  }
}

export function YamlCommandMenu({ yamlContent, ItemTemplate = DefaultItemTemplate, editionMode = false }: YamlCommandMenuProps) {
  
  return (
    <>
      <CommandList>
        {Object.entries(yamlContent).map(([group, items]) => (
          <CommandGroup key={group} heading={group}>
            {Object.entries(items).map(([key, { id, description }]) => (
              <CommandItem key={id}>
                <ItemTemplate 
                  item={{ id, key, description }} 
                  editionMode={editionMode} 
                />
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </>
  )
}

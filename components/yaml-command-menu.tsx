"use client"

import { useEffect, useState } from 'react'
import yaml from 'js-yaml'
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { DefaultItemTemplate } from "./default-item-template"

interface YamlCommandMenuProps {
  yamlContent?: YamlStructure
  ItemTemplate?: React.ComponentType<{ item: { id: string; key: string; description: string }; editionMode?: boolean; }>
  editionMode?: boolean
  children?: React.ReactNode;
}

export interface YamlStructure {
  [group: string]: {
    [key: string]: {
      id: string
      description: string
    }
  }
}

export function YamlCommandMenu({ yamlContent= {}, ItemTemplate = DefaultItemTemplate, editionMode = false, children }: YamlCommandMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Command className="rounded-lg border shadow-md">
      {children}
      <CommandList>
        {Object.entries(yamlContent).map(([group, items]) => (
          <CommandGroup key={group} heading={group}>
            {Object.entries(items).map(([key, { id, description }]) => (
              <CommandItem key={id} onSelect={() => setOpen(false)}>
                <ItemTemplate 
                  item={{ id, key, description }} 
                  editionMode={editionMode} 
                />
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </Command>
  )
}

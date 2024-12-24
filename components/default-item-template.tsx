//default-item-template.tsx
import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

interface ItemTemplateProps {
  item: {
    id: string
    key: string
    description: string
  }
  editionMode?: boolean
}

export const DefaultItemTemplate: React.FC<ItemTemplateProps> = ({ 
  item, 
  editionMode = false
}) => (
  <div className="flex items-center space-x-2 max-h-[2lh] overflow-hidden hover:text-primary hover:border-primary">
    {editionMode && (
      <Checkbox 
        id={item.id} 
        name={item.key}
        className="mr-2" 
      />
    )}
    <div className="flex items-center space-x-2 overflow-hidden">
      <Badge variant="outline" className="text-blue border-blue whitespace-nowrap bg-secondary">
        {item.key}
      </Badge>
      <span className="text-sm text-muted-foreground truncate">{item.description}</span>
    </div>
  </div>
)


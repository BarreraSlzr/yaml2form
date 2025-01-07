import React from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface ItemTemplateProps {
  item: {
    id: string;
    key: string;
    description: string;
  };
  editionMode?: boolean;
}

export const DefaultItemTemplate: React.FC<ItemTemplateProps> = ({
  item,
  editionMode = false,
}) => (
  <div
    className={`w-full flex items-center space-x-2 max-h-[2lh] overflow-hidden hover:text-primary hover:border-primary ${editionMode ? "cursor-pointer" : ""
      }`}
  >
    {editionMode && (
      <label htmlFor={item.id} className="w-full flex items-center space-x-2">
        <Checkbox
          id={item.id}
          name={item.id}
          value={item.id}
          className="mr-2 pointer-events-none" />
        <Content item={item} />
      </label>
    )}
    {!editionMode && <Content item={item} />}
  </div>
);

const Content: React.FC<{ item: { key: string; description: string } }> = ({
  item,
}) => (
  <div className="flex items-center space-x-2 overflow-hidden">
    <Badge
      variant="outline"
      className="text-blue border-blue whitespace-nowrap bg-secondary"
    >
      {item.key}
    </Badge>
    <span className="text-sm text-muted-foreground truncate">
      {item.description}
    </span>
  </div>
);

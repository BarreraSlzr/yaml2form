import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Accordion } from "@radix-ui/react-accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface YamlFormFieldProps {
  id: string;
  data: Record<string, any>;
  path?: string; // Hierarchical path for form field names
}

export function YamlFormField({ id, data, path = "" }: YamlFormFieldProps) {
  const renderPrimitiveField = (key: string, value: any, currentPath: string) => {
    const fieldId = `${id}-${key}`;
    const fieldName = `${currentPath ? `${currentPath}:` : ""}${key}`;
    return (
      <div key={key} className="space-y-2">
        <Label htmlFor={fieldId}>{key}</Label>
        <Input
          id={fieldId}
          name={fieldName}
          defaultValue={typeof value === "boolean" ? undefined : value}
          type={typeof value === "boolean" ? "checkbox" : "text"}
          defaultChecked={typeof value === "boolean" ? value : undefined}
        />
      </div>
    );
  };

  const renderArrayField = (key: string, value: any[], currentPath: string) => {
    const fieldName = `${currentPath ? `${currentPath}:` : ""}${key}`;
    if (value.some((item) => typeof item === "object")) {
      return (
        <Accordion key={key} type="single" collapsible className="w-full">
          <AccordionItem value={key}>
            <AccordionTrigger>{key}</AccordionTrigger>
            <AccordionContent>
              {value.map((item, index) =>
                typeof item === "object" ? (
                  <YamlFormField
                    key={index}
                    id={`${key}-${index}`}
                    data={item}
                    path={`${fieldName}[${index}]`}
                  />
                ) : (
                  renderPrimitiveField(`${key}-${index}`, item, fieldName)
                )
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    }

    return (
      <div key={key} className="space-y-2">
        <Label htmlFor={fieldName}>{key}</Label>
        <Select>
          <SelectTrigger id={fieldName}>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {value.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  };

  const renderObjectField = (key: string, value: Record<string, any>, currentPath: string) => {
    const fieldName = `${currentPath ? `${currentPath}:` : ""}${key}`;
    return (
      <Accordion key={key} type="single" collapsible className="w-full">
        <AccordionItem value={key}>
          <AccordionTrigger>{key}</AccordionTrigger>
          <AccordionContent>
            {Object.entries(value).map(([subKey, subValue]) =>
              renderField(subKey, subValue, fieldName)
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  };

  const renderField = (key: string, value: any, currentPath: string) => {
    if (Array.isArray(value)) return renderArrayField(key, value, currentPath);
    if (typeof value === "object" && value !== null)
      return renderObjectField(key, value, currentPath);
    return renderPrimitiveField(key, value, currentPath);
  };

  return (
    renderField(id, data, path)
  );
}

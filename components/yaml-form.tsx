import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface YamlFormProps {
  id: string
  data: Record<string, any>
}

export function YamlForm({ id, data }: YamlFormProps) {
  const renderField = (key: string, value: any) => {
    if (typeof value === 'string') {
      return (
        <div key={key} className="space-y-2">
          <Label htmlFor={`${id}-${key}`}>{key}</Label>
          <Input id={`${id}-${key}`} defaultValue={value} />
        </div>
      )
    } else if (Array.isArray(value)) {
      return (
        <div key={key} className="space-y-2">
          <Label htmlFor={`${id}-${key}`}>{key}</Label>
          <Select>
            <SelectTrigger id={`${id}-${key}`}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {value.map((item, index) => (
                <SelectItem key={index} value={item}>{item}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )
    } else if (typeof value === 'object') {
      return (
        <div key={key} className="space-y-4">
          <h3 className="text-lg font-semibold">{key}</h3>
          {Object.entries(value).map(([subKey, subValue]) => renderField(subKey, subValue))}
        </div>
      )
    }
  }

  return (
    <form className="space-y-4">
      {Object.entries(data).map(([key, value]) => renderField(key, value))}
    </form>
  )
}


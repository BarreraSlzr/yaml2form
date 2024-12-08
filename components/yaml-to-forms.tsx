'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import yaml from 'js-yaml'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { YamlForm } from './yaml-form'

interface YamlToFormsProps {
  initialYaml?: string
}

export default function YamlToForms({ initialYaml }: YamlToFormsProps) {
  const [yamlInput, setYamlInput] = useState(initialYaml || '')
  const [parsedYaml, setParsedYaml] = useState<Record<string, any> | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (initialYaml) {
      handleParseYaml()
    }
  }, [initialYaml])

  const handleParseYaml = () => {
    try {
      const parsed = yaml.load(yamlInput) as Record<string, any>
      setParsedYaml(parsed)
    } catch (error) {
      console.error('Error parsing YAML:', error)
      alert('Error parsing YAML. Please check your input.')
    }
  }

  const handleSaveYaml = async () => {
    try {
      const response = await fetch('/api/yaml', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ yaml_data: yamlInput }),
      })

      if (!response.ok) {
        throw new Error('Failed to save YAML')
      }

      const { id } = await response.json()
      alert(`YAML saved successfully. ID: ${id}`)
      router.push(`/${id}`)
    } catch (error) {
      console.error('Error saving YAML:', error)
      alert('Error saving YAML. Please try again.')
    }
  }

  return (
    <div className="space-y-4">
      <Textarea
        value={yamlInput}
        onChange={(e) => setYamlInput(e.target.value)}
        placeholder="Enter your YAML here..."
        className="h-40"
      />
      <div className="space-x-2">
        <Button onClick={handleParseYaml}>Parse YAML</Button>
        <Button onClick={handleSaveYaml}>Save YAML</Button>
      </div>
      
      {parsedYaml && (
        <Accordion type="single" collapsible className="w-full">
          {Object.entries(parsedYaml).map(([key, value]) => (
            <AccordionItem key={key} value={key}>
              <AccordionTrigger>{key}</AccordionTrigger>
              <AccordionContent>
                <YamlForm id={key} data={value} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  )
}


"use client"

import { useEffect, useState } from 'react'
import { YamlCommandForm } from "@/components/yaml-command-form"
import { CreateCommandForm } from "@/components/create-command-form"
import yaml from 'js-yaml'
import { YamlStructure } from '@/components/yaml-command-menu'

const initialYamlContent = `
Frontend:
  React:
    id: react
    description: A JavaScript library for building user interfaces
  Vue:
    id: vue
    description: A progressive framework for building user interfaces
  Angular:
    id: angular
    description: A platform for building mobile and desktop web applications

Backend:
  Node.js:
    id: nodejs
    description: JavaScript runtime built on Chrome's V8 JavaScript engine
  Django:
    id: django
    description: A high-level Python web framework
  Ruby on Rails:
    id: rails
    description: A web application framework written in Ruby

Database:
  MySQL:
    id: mysql
    description: An open-source relational database management system
  MongoDB:
    id: mongodb
    description: A source-available cross-platform document-oriented database program
  PostgreSQL:
    id: postgresql
    description: A free and open-source relational database management system
`

export default function Home() {
  const [yamlContent, setYamlContent] = useState<YamlStructure>({})

  const handleYamlUpdate = (newYaml: YamlStructure) => {
    setYamlContent({ ...yamlContent, ...newYaml })
  }

  useEffect(() => {
    const yamlString = initialYamlContent;
    try {
      const parsedYaml = yaml.load(yamlString) as YamlStructure
      setYamlContent(parsedYaml);
    } catch (e) {
      console.error("Failed to parse YAML:", e)
    }
  }, [])

  return (
    <div className="container mx-auto p-4 font-sans">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">YAML2Form</h1>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Create New Command</h2>
          <CreateCommandForm onSave={handleYamlUpdate} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Existing Commands</h2>
          <YamlCommandForm yamlContent={yamlContent} onUpdate={setYamlContent} />
        </div>
      </div>
    </div>
  )
}


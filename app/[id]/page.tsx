import { db } from '@/lib/db'
import YamlToForms from '@/components/yaml-to-forms'

export default async function YamlFormPage({ params }: { params: { id: string } }) {
  const yamlData = await db
    .selectFrom('yaml_forms')
    .selectAll()
    .where('id', '=', parseInt(params.id))
    .executeTakeFirst()

  if (!yamlData) {
    return <div>YAML not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Saved YAML Form</h1>
      <YamlToForms initialYaml={yamlData.yaml_data} />
    </div>
  )
}


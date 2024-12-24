import { db } from '@/lib/db'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function YamlFormPage({
  params: Params
}: PageProps) {
  const params = await Params;
  const yamlData = await db
    .selectFrom('yamls')
    .selectAll()
    .where('id', '=', parseInt(params.id))
    .executeTakeFirst()

  if (!yamlData) {
    return <div>YAML not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Saved YAML Form</h1>
    
    </div>
  )
}


import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  const { yaml_data } = await request.json()
  
  try {
    const result = await db
      .insertInto('yamls')
      .values({ yaml_data })
      .returningAll()
      .executeTakeFirstOrThrow()

    return NextResponse.json({ id: result.id }, { status: 201 })
  } catch (error) {
    console.error('Error storing YAML:', error)
    return NextResponse.json({ error: 'Failed to store YAML' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }

  try {
    const result = await db
      .selectFrom('yamls')
      .selectAll()
      .where('id', '=', parseInt(id))
      .executeTakeFirst()

    if (!result) {
      return NextResponse.json({ error: 'YAML not found' }, { status: 404 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error retrieving YAML:', error)
    return NextResponse.json({ error: 'Failed to retrieve YAML' }, { status: 500 })
  }
}


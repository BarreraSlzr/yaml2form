"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { YamlStructure } from '@/components/yaml-command-menu'

interface YamlContentContextType {
  yamlContent: YamlStructure
  setYamlContent: React.Dispatch<React.SetStateAction<YamlStructure>>
  addItem: (group: string, key: string, description: string) => Promise<void>
  removeItems: (checkedItems: Record<string, string>) => Promise<void>
}

const YamlContentContext = createContext<YamlContentContextType | undefined>(undefined)

export function YamlContentProvider({ children, initialYamlContent = {} }: { children: React.ReactNode, initialYamlContent?: YamlStructure }) {
  const [yamlContent, setYamlContent] = useState<YamlStructure>(initialYamlContent)

  useEffect(() => {
    const initDB = async () => {
      const db = await openDB()
      const storedContent = await getYamlContent(db)
      if (storedContent) {
        setYamlContent(storedContent)
      } else {
        await saveYamlContent(db, initialYamlContent)
      }
    }
    initDB()
  }, [initialYamlContent])

  const addItem = async (group: string, key: string, description: string) => {
    const newContent: YamlStructure = {
      ...yamlContent,
      [group]: {
        ...yamlContent[group],
        [key]: {
          id: `${group}-${key}`,
          description: description
        }
      }
    }
    setYamlContent(newContent)
    const db = await openDB()
    await saveYamlContent(db, newContent)
  }

  
  const removeItems = async (checkedItems: Record<string, string>) => {
    const newContent = { ...yamlContent }
    Object.keys(checkedItems).forEach(id => {
      for (const group in newContent) {
        for (const key in newContent[group]) {
          if (newContent[group][key].id === id) {
            delete newContent[group][key]
            if (Object.keys(newContent[group]).length === 0) {
              delete newContent[group]
            }
            break
          }
        }
      }
    })
    setYamlContent(newContent)
    const db = await openDB()
    await saveYamlContent(db, newContent)
  }

  return (
    <YamlContentContext.Provider value={{ yamlContent, setYamlContent, addItem, removeItems }}>
      {children}
    </YamlContentContext.Provider>
  )
}

export function useYamlContent() {
  const context = useContext(YamlContentContext)
  if (context === undefined) {
    throw new Error('useYamlContent must be used within a YamlContentProvider')
  }
  return context
}

async function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('YamlContentDB', 1)
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      db.createObjectStore('yamlContent', { keyPath: 'id' })
    }
  })
}

async function getYamlContent(db: IDBDatabase): Promise<YamlStructure | null> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('yamlContent', 'readonly')
    const store = transaction.objectStore('yamlContent')
    const request = store.get('yamlContent')
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result ? request.result.content : null)
  })
}

async function saveYamlContent(db: IDBDatabase, content: YamlStructure): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('yamlContent', 'readwrite')
    const store = transaction.objectStore('yamlContent')
    const request = store.put({ id: 'yamlContent', content })
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve()
  })
}


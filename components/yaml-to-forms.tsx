'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import yaml from 'js-yaml';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { YamlFormField } from './yaml-form';

interface YamlToFormsProps {
  initialYaml?: string;
}

export default function YamlToForms({ initialYaml }: YamlToFormsProps) {
  const [yamlInput, setYamlInput] = useState(initialYaml || '');
  const [parsedYaml, setParsedYaml] = useState<Record<string, any> | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const router = useRouter();

  useEffect(() => {
    if (initialYaml) {
      handleParseYaml();
    }
  }, [initialYaml]);

  const handleParseYaml = () => {
    try {
      const parsed = yaml.load(yamlInput) as Record<string, any>;
      setParsedYaml(parsed);
      setFormData(parsed); // Initialize the form data with parsed YAML
    } catch (error) {
      console.error('Error parsing YAML:', error);
      alert('Error parsing YAML. Please check your input.');
    }
  };

  const handleInputChange = (name: string, value: any) => {
    const updateNestedObject = (obj: Record<string, any>, path: string[], val: any): Record<string, any> => {
      const [current, ...rest] = path;
      if (!rest.length) {
        return { ...obj, [current]: val };
      }
      return { ...obj, [current]: updateNestedObject(obj[current] || {}, rest, val) };
    };

    const path = name.split(':');
    setFormData((prev) => updateNestedObject(prev, path, value));
  };

  const handleSaveYaml = async () => {
    try {
      const updatedYaml = yaml.dump(formData);
      setYamlInput(updatedYaml);
      // const response = await fetch('/api/yaml', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ yaml_data: updatedYaml }),
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to save YAML');
      // }

      // const { id } = await response.json();
      alert(`YAML saved successfully. ID: ${
        // id ||
         'new'}`);
      // router.push(`/${id}`);
    } catch (error) {
      console.error('Error saving YAML:', error);
      alert('Error saving YAML. Please try again.');
    }
  };

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
        <form
          className="space-y-4"
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            handleInputChange(target.name, target.type === 'checkbox' ? target.checked : target.value);
          }}
        >
          <YamlFormField id="form" data={parsedYaml} />
        </form>
      )}
    </div>
  );
}

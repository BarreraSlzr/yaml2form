"use client"

import { YamlCommandWrapper } from '@/components/yaml-command-wrapper'
import { YamlContentProvider } from '@/contexts/yaml-content'

const initialYamlContent = {
  "Project Overview": {
    "name": {
      id: "project-overview-name",
      description: "YAML Command Menu Project"
    },
    "description": {
      id: "project-overview-description",
      description: "A flexible and efficient way to manage and display hierarchical data in a command menu interface, with persistent storage using IndexedDB"
    },
    "main_features": {
      id: "project-overview-main-features",
      description: "Search functionality, Add new items, Customizable item rendering, Responsive design, IndexedDB integration"
    }
  },
  "Technologies": {
    "framework": {
      id: "technologies-framework",
      description: "Next.js with App Router"
    },
    "ui_library": {
      id: "technologies-ui-library",
      description: "shadcn/ui components"
    },
    "styling": {
      id: "technologies-styling",
      description: "Tailwind CSS"
    },
    "state_management": {
      id: "technologies-state-management",
      description: "React Context API"
    },
    "data_persistence": {
      id: "technologies-data-persistence",
      description: "IndexedDB"
    }
  },
  "Code Style": {
    "language": {
      id: "code-style-language",
      description: "TypeScript"
    },
    "component_structure": {
      id: "code-style-component-structure",
      description: "Functional components with hooks"
    },
    "naming_convention": {
      id: "code-style-naming-convention",
      description: "camelCase for variables and functions, PascalCase for components and interfaces"
    },
    "file_naming": {
      id: "code-style-file-naming",
      description: "kebab-case for file names"
    }
  },
  "Workflow": {
    "version_control": {
      id: "workflow-version-control",
      description: "Git with feature branches and pull requests"
    },
    "code_review": {
      id: "workflow-code-review",
      description: "Peer review required before merging to main branch"
    },
    "testing": {
      id: "workflow-testing",
      description: "Jest for unit tests, React Testing Library for component tests"
    },
    "deployment": {
      id: "workflow-deployment",
      description: "Vercel for continuous deployment"
    }
  },
  "Component Structure": {
    "yaml_command_wrapper": {
      id: "component-structure-yaml-command-wrapper",
      description: "Main component that renders the command menu interface"
    },
    "command_dialog_form": {
      id: "component-structure-command-dialog-form",
      description: "Form component for adding new items to the YAML content"
    },
    "yaml_command_menu": {
      id: "component-structure-yaml-command-menu",
      description: "Renders the list of YAML content items"
    },
    "default_item_template": {
      id: "component-structure-default-item-template",
      description: "Default template for rendering individual YAML items"
    }
  },
  "Context and Hooks": {
    "yaml_content_context": {
      id: "context-and-hooks-yaml-content-context",
      description: "React context that manages the YAML content state and IndexedDB operations"
    },
    "use_yaml_content": {
      id: "context-and-hooks-use-yaml-content",
      description: "Custom hook for accessing and updating YAML content"
    }
  },
  "Accessibility": {
    "semantic_html": {
      id: "accessibility-semantic-html",
      description: "Use of semantic HTML elements for better structure and accessibility"
    },
    "aria_attributes": {
      id: "accessibility-aria-attributes",
      description: "Proper use of ARIA roles and attributes where necessary"
    },
    "keyboard_navigation": {
      id: "accessibility-keyboard-navigation",
      description: "Ensure all interactive elements are keyboard accessible"
    }
  }
}

export default function Home() {
  return (
    <YamlContentProvider initialYamlContent={initialYamlContent}>
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">YAML Command Menu</h1>
        <YamlCommandWrapper />
      </main>
    </YamlContentProvider>
  )
}


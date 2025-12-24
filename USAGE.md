# A2UI Builder Usage Guide

This guide provides detailed examples and best practices for using A2UI Builder.

## Table of Contents

- [Basic Usage](#basic-usage)
- [A2UI Format Examples](#a2ui-format-examples)
- [Component Types](#component-types)
- [Data Binding](#data-binding)
- [Common Patterns](#common-patterns)
- [Tips & Best Practices](#tips--best-practices)

## Basic Usage

### Creating a Simple UI

1. **Start a new project**: Click "New Project" and name it (e.g., "My App")
2. **Add a screen**: Click "Add Screen" under your project
3. **Describe your UI**: Type in the chat:
   ```
   Create a welcome page with a title and a button
   ```
4. **View the result**: Your UI appears in the canvas
5. **Iterate**: Ask for modifications:
   ```
   Make the button larger and change the color to blue
   ```

### Natural Language Prompts

The AI understands various ways to describe UI:

**Good prompts:**
- "Create a login form with email and password fields"
- "Build a card with a title, description, and action button"
- "Make a navigation bar with logo, menu items, and a user avatar"
- "Design a pricing table with three tiers"

**More specific prompts:**
- "Create a hero section with a large heading, subtitle, and two buttons side by side"
- "Build a dashboard card showing user stats with icons and numbers"
- "Make a responsive grid layout with 4 product cards"

## A2UI Format Examples

### Simple Text Component

```json
[
  {
    "id": "welcome-text",
    "component": {
      "Text": {
        "text": {
          "literalString": "Welcome to A2UI Builder"
        },
        "usageHint": "h1",
        "className": "text-4xl font-bold"
      }
    }
  }
]
```

### Card with Content

```json
[
  {
    "id": "root",
    "component": {
      "Column": {
        "gap": 8,
        "children": {
          "explicitList": ["card-container"]
        }
      }
    }
  },
  {
    "id": "card-container",
    "component": {
      "Card": {
        "title": {
          "literalString": "Product Name"
        },
        "description": {
          "literalString": "Product description goes here"
        },
        "child": "card-content",
        "footer": "card-button"
      }
    }
  },
  {
    "id": "card-content",
    "component": {
      "Column": {
        "gap": 4,
        "children": {
          "explicitList": ["price", "features"]
        }
      }
    }
  },
  {
    "id": "price",
    "component": {
      "Text": {
        "text": {
          "literalString": "$99.99"
        },
        "usageHint": "h2"
      }
    }
  },
  {
    "id": "features",
    "component": {
      "Column": {
        "gap": 2,
        "children": {
          "explicitList": ["feature-1", "feature-2"]
        }
      }
    }
  },
  {
    "id": "feature-1",
    "component": {
      "Text": {
        "text": {
          "literalString": "Feature one"
        }
      }
    }
  },
  {
    "id": "feature-2",
    "component": {
      "Text": {
        "text": {
          "literalString": "Feature two"
        }
      }
    }
  },
  {
    "id": "card-button",
    "component": {
      "Button": {
        "label": {
          "literalString": "Buy Now"
        },
        "variant": "default"
      }
    }
  }
]
```

### Form Example

```json
[
  {
    "id": "form-root",
    "component": {
      "Column": {
        "gap": 6,
        "children": {
          "explicitList": ["form-title", "form-card"]
        }
      }
    }
  },
  {
    "id": "form-title",
    "component": {
      "Text": {
        "text": {
          "literalString": "Contact Us"
        },
        "usageHint": "h2"
      }
    }
  },
  {
    "id": "form-card",
    "component": {
      "Card": {
        "child": "form-fields"
      }
    }
  },
  {
    "id": "form-fields",
    "component": {
      "Column": {
        "gap": 4,
        "children": {
          "explicitList": ["name-field", "email-field", "message-field", "submit-button"]
        }
      }
    }
  },
  {
    "id": "name-field",
    "component": {
      "Field": {
        "label": {
          "literalString": "Name"
        },
        "child": "name-input"
      }
    }
  },
  {
    "id": "name-input",
    "component": {
      "TextField": {
        "placeholder": {
          "literalString": "Enter your name"
        },
        "value": {
          "path": "/form/name"
        }
      }
    }
  },
  {
    "id": "email-field",
    "component": {
      "Field": {
        "label": {
          "literalString": "Email"
        },
        "child": "email-input"
      }
    }
  },
  {
    "id": "email-input",
    "component": {
      "TextField": {
        "type": {
          "literalString": "email"
        },
        "placeholder": {
          "literalString": "Enter your email"
        },
        "value": {
          "path": "/form/email"
        }
      }
    }
  },
  {
    "id": "message-field",
    "component": {
      "Field": {
        "label": {
          "literalString": "Message"
        },
        "child": "message-textarea"
      }
    }
  },
  {
    "id": "message-textarea",
    "component": {
      "TextArea": {
        "placeholder": {
          "literalString": "Enter your message"
        },
        "rows": {
          "literalNumber": 5
        },
        "value": {
          "path": "/form/message"
        }
      }
    }
  },
  {
    "id": "submit-button",
    "component": {
      "Button": {
        "label": {
          "literalString": "Submit"
        },
        "variant": "default",
        "action": {
          "name": "submitForm",
          "context": {
            "formId": "contact"
          }
        }
      }
    }
  }
]
```

## Component Types

### Layout Components

**Column**: Vertical flex container
```json
{
  "Column": {
    "gap": 8,
    "align": "center",
    "justify": "start",
    "padding": 4,
    "children": {
      "explicitList": ["child-1", "child-2"]
    }
  }
}
```

**Row**: Horizontal flex container
```json
{
  "Row": {
    "gap": 4,
    "wrap": true,
    "justify": "space-between",
    "children": {
      "explicitList": ["item-1", "item-2"]
    }
  }
}
```

**Card**: Container with optional title/description
```json
{
  "Card": {
    "title": {
      "literalString": "Card Title"
    },
    "description": {
      "literalString": "Card description"
    },
    "child": "card-content",
    "footer": "card-footer"
  }
}
```

### Display Components

**Text**: Typography element
```json
{
  "Text": {
    "text": {
      "literalString": "Hello World"
    },
    "usageHint": "h1",
    "className": "text-2xl font-bold"
  }
}
```

**Image**: Image display
```json
{
  "Image": {
    "src": {
      "literalString": "/image.jpg"
    },
    "alt": {
      "literalString": "Description"
    },
    "width": {
      "literalNumber": 400
    },
    "height": {
      "literalNumber": 300
    }
  }
}
```

**Badge**: Label/badge
```json
{
  "Badge": {
    "text": {
      "literalString": "New"
    },
    "variant": "default"
  }
}
```

### Input Components

**TextField**: Text input
```json
{
  "TextField": {
    "placeholder": {
      "literalString": "Enter text"
    },
    "value": {
      "path": "/user/name"
    },
    "type": {
      "literalString": "text"
    },
    "disabled": {
      "literalBoolean": false
    }
  }
}
```

**TextArea**: Multi-line input
```json
{
  "TextArea": {
    "placeholder": {
      "literalString": "Enter message"
    },
    "rows": {
      "literalNumber": 5
    },
    "value": {
      "path": "/form/message"
    }
  }
}
```

**Button**: Clickable button
```json
{
  "Button": {
    "label": {
      "literalString": "Click Me"
    },
    "variant": "default",
    "size": "default",
    "action": {
      "name": "handleClick",
      "context": {
        "buttonId": "primary-cta"
      }
    }
  }
}
```

## Data Binding

### Literal Values

Static content that doesn't change:

```json
{
  "literalString": "Hello World"
}
{
  "literalNumber": 42
}
{
  "literalBoolean": true
}
```

### Path Bindings

Dynamic content from data model:

```json
{
  "path": "/user/name"           // Simple property
}
{
  "path": "/users/0/email"      // Array index
}
{
  "path": "/product/details/price"  // Nested property
}
```

### Data Model Example

If your data model is:
```json
{
  "user": {
    "name": "John Doe",
    "email": "john@example.com"
  },
  "products": [
    {
      "name": "Product 1",
      "price": 99.99
    }
  ]
}
```

Then bindings resolve as:
- `/user/name` → "John Doe"
- `/user/email` → "john@example.com"
- `/products/0/name` → "Product 1"
- `/products/0/price` → 99.99

## Common Patterns

### Hero Section

```
Create a hero section with:
- Large centered heading
- Subtitle text
- Two buttons side by side (primary and secondary)
- Background image or gradient
```

### Navigation Bar

```
Build a navigation bar with:
- Logo on the left
- Menu items in the center (Home, About, Contact)
- User avatar and dropdown on the right
```

### Dashboard Card

```
Create a dashboard stat card with:
- Icon at the top
- Large number in the middle
- Label text below
- Optional trend indicator
```

### Pricing Table

```
Design a 3-column pricing table with:
- Three pricing tiers (Basic, Pro, Enterprise)
- Each card has: title, price, feature list, CTA button
- Highlight the middle tier
```

## Tips & Best Practices

### 1. Be Specific

**Better:**
```
Create a login form with email and password fields, 
a "Remember me" checkbox, and a "Sign In" button. 
Add validation error messages below each field.
```

**Less effective:**
```
Make a form
```

### 2. Use Iterative Refinement

Start simple, then refine:
1. "Create a card"
2. "Add a title and description"
3. "Add a button at the bottom"
4. "Make the button blue"

### 3. Reference Existing UI

```
Make it look like the hero section from Apple's website
Create a form similar to Stripe's checkout
```

### 4. Specify Layout

```
Arrange items in a 3-column grid
Stack items vertically with spacing
Center everything on the page
```

### 5. Describe Styling

```
Use a modern, clean design
Make it colorful and playful
Keep it minimal and professional
Add shadows and rounded corners
```

### 6. Export and Reuse

- Use the "Manifest" tab to copy your A2UI JSON
- Save it for reuse in other projects
- Share with team members
- Version control your UI definitions

### 7. Component Organization

- Use semantic IDs: `header`, `nav-menu`, `submit-btn`
- Group related components
- Keep the structure flat (A2UI format requirement)

## Troubleshooting

### UI Not Rendering

1. Check that a screen is selected
2. Verify the prompt was understood (check chat)
3. Try a simpler prompt first
4. Check browser console for errors

### Components Not Appearing

1. Ensure component IDs are correct
2. Check parent-child relationships
3. Verify data bindings if using paths
4. Review the manifest JSON structure

### Styling Issues

1. Use `className` prop for custom styles
2. Check Tailwind classes are valid
3. Verify responsive breakpoints
4. Use the browser inspector to debug

## Advanced Usage

### Custom Styling

Add Tailwind classes via `className`:
```json
{
  "Column": {
    "className": "bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-lg shadow-xl",
    "children": { "explicitList": ["content"] }
  }
}
```

### Responsive Design

Use Tailwind responsive prefixes:
```json
{
  "Row": {
    "className": "flex-col md:flex-row",
    "gap": 4
  }
}
```

### Complex Layouts

Combine multiple layout components:
```
Column (root)
  ├─ Row (header)
  │   ├─ Text (logo)
  │   └─ Row (nav)
  ├─ Column (content)
  │   └─ Card (main)
  └─ Row (footer)
```

---

For technical details, see [ARCHITECTURE.md](./ARCHITECTURE.md)


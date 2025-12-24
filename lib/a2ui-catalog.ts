// A2UI Standard Catalog
// Defines all available A2UI component types that map to shadcn/ui
// Based on A2UI Builder Implementation Guide

export const A2UI_STANDARD_CATALOG = {
    components: {
        // ============================================
        // Layout Components
        // ============================================
        Column: {
            description: 'Vertical flex container',
            props: ['gap', 'children', 'align', 'justify', 'padding', 'width', 'height', 'className'],
            shadcnMapping: 'div with flex-col',
        },
        Row: {
            description: 'Horizontal flex container',
            props: ['gap', 'children', 'align', 'justify', 'wrap', 'width', 'height', 'className'],
            shadcnMapping: 'div with flex-row',
        },
        Card: {
            description: 'Card container with optional title',
            props: ['title', 'description', 'child', 'footer', 'width', 'className'],
            shadcnMapping: 'Card',
        },
        Section: {
            description: 'Semantic section wrapper',
            props: ['child', 'padding', 'background'],
            shadcnMapping: 'section element',
        },
        AspectRatio: {
            description: 'Component for displaying content within a fixed aspect ratio',
            props: ['ratio', 'child'],
            shadcnMapping: 'AspectRatio',
        },
        Resizable: {
            description: 'Resizable panel layout',
            props: ['direction', 'panels'],
            shadcnMapping: 'ResizablePanelGroup',
        },
        Sidebar: {
            description: 'Collapsible application sidebar',
            props: ['header', 'content', 'footer', 'collapsible'],
            shadcnMapping: 'Sidebar',
        },
        SidebarTrigger: {
            description: 'Toggle button for the sidebar',
            props: [],
            shadcnMapping: 'SidebarTrigger',
        },

        // ============================================
        // Display Components
        // ============================================
        Text: {
            description: 'Text/Typography element',
            props: ['text', 'usageHint', 'className'],
            shadcnMapping: 'p, h1-h6, span',
        },
        Image: {
            description: 'Image display',
            props: ['src', 'alt', 'width', 'height'],
            shadcnMapping: 'next/image or img',
        },
        Icon: {
            description: 'Icon element',
            props: ['name', 'size', 'color'],
            shadcnMapping: 'lucide-react icons',
        },
        Badge: {
            description: 'Badge/label element',
            props: ['text', 'variant'],
            shadcnMapping: 'Badge',
        },
        Divider: {
            description: 'Visual separator line',
            props: ['orientation'],
            shadcnMapping: 'Separator',
        },
        Avatar: {
            description: 'An image element with a fallback for representing the user',
            props: ['src', 'fallback', 'alt'],
            shadcnMapping: 'Avatar',
        },
        Alert: {
            description: 'Displays a callout for user attention',
            props: ['title', 'description', 'variant'],
            shadcnMapping: 'Alert',
        },
        Progress: {
            description: 'Displays an indicator showing the completion progress of a task',
            props: ['value'],
            shadcnMapping: 'Progress',
        },
        Skeleton: {
            description: 'Used to show a placeholder while content is loading',
            props: ['width', 'height', 'className'],
            shadcnMapping: 'Skeleton',
        },
        Breadcrumb: {
            description: 'Displays the path to the current resource using a hierarchy of links',
            props: ['items'],
            shadcnMapping: 'Breadcrumb',
        },
        Empty: {
            description: 'Placeholder for empty states',
            props: ['title', 'description', 'icon', 'action'],
            shadcnMapping: 'Empty',
        },

        // ============================================
        // Input Components
        // ============================================
        TextField: {
            description: 'Single-line text input',
            props: ['placeholder', 'value', 'type', 'disabled', 'label'],
            shadcnMapping: 'Input',
        },
        InputGroup: {
            description: 'Group multiple inputs and addons together',
            props: ['children'],
            shadcnMapping: 'InputGroup',
        },
        InputGroupAddon: {
            description: 'Addon for InputGroup',
            props: ['child', 'align'],
            shadcnMapping: 'InputGroupAddon',
        },
        InputOTP: {
            description: 'Accessible one-time password input',
            props: ['value', 'onChange', 'maxLength', 'pattern'],
            shadcnMapping: 'InputOTP',
        },
        TextArea: {
            description: 'Multi-line text input',
            props: ['placeholder', 'value', 'rows', 'disabled'],
            shadcnMapping: 'Textarea',
        },
        SelectInput: {
            description: 'Dropdown selection',
            props: ['options', 'value', 'placeholder', 'disabled'],
            shadcnMapping: 'Select',
        },
        CheckBox: {
            description: 'Boolean checkbox',
            props: ['checked', 'label', 'disabled'],
            shadcnMapping: 'Checkbox',
        },
        RadioInput: {
            description: 'Radio button group',
            props: ['options', 'value', 'name'],
            shadcnMapping: 'RadioGroup',
        },
        DateInput: {
            description: 'Date picker',
            props: ['value', 'placeholder', 'disabled'],
            shadcnMapping: 'Input with type=date',
        },
        Toggle: {
            description: 'Toggle switch',
            props: ['checked', 'label', 'disabled'],
            shadcnMapping: 'Switch',
        },
        ToggleGroup: {
            description: 'A set of two-state buttons',
            props: ['type', 'variant', 'size', 'items'],
            shadcnMapping: 'ToggleGroup',
        },
        Slider: {
            description: 'Range slider',
            props: ['value', 'min', 'max', 'step'],
            shadcnMapping: 'Slider',
        },
        Field: {
            description: 'A wrapper for form fields with label, description and validation',
            props: ['label', 'description', 'error', 'child'],
            shadcnMapping: 'Field',
        },

        // ============================================
        // Interactive Components
        // ============================================
        Button: {
            description: 'Clickable button',
            props: ['label', 'action', 'variant', 'size', 'disabled', 'child'],
            shadcnMapping: 'Button',
        },
        ButtonGroup: {
            description: 'Group of related buttons',
            props: ['children', 'variant', 'size'],
            shadcnMapping: 'ButtonGroup',
        },
        Link: {
            description: 'Navigation link',
            props: ['text', 'href', 'target'],
            shadcnMapping: 'a element',
        },
        Dialog: {
            description: 'Modal dialog',
            props: ['title', 'content', 'trigger', 'open'],
            shadcnMapping: 'Dialog',
        },
        DropdownMenu: {
            description: 'Context/dropdown menu',
            props: ['trigger', 'items'],
            shadcnMapping: 'DropdownMenu',
        },
        Tabs: {
            description: 'Tab panel navigation',
            props: ['tabs', 'defaultValue'],
            shadcnMapping: 'Tabs',
        },
        Accordion: {
            description: 'Expandable/collapsible sections',
            props: ['items', 'type'],
            shadcnMapping: 'Accordion',
        },
        Stepper: {
            description: 'Progress/step indicator',
            props: ['steps', 'currentStep'],
            shadcnMapping: 'Custom stepper',
        },
        AlertDialog: {
            description: 'A modal dialog that interrupts the user with important content and expects a response',
            props: ['trigger', 'title', 'description', 'actionLabel', 'cancelLabel'],
            shadcnMapping: 'AlertDialog',
        },
        Drawer: {
            description: 'A drawer component that slides in from the edge of the screen',
            props: ['trigger', 'title', 'description', 'child', 'footer'],
            shadcnMapping: 'Drawer',
        },
        Sheet: {
            description: 'Extends the Dialog component to display content that complements the main screen',
            props: ['trigger', 'title', 'description', 'child', 'side'],
            shadcnMapping: 'Sheet',
        },
        Popover: {
            description: 'Displays rich content in a portal, triggered by a button',
            props: ['trigger', 'content'],
            shadcnMapping: 'Popover',
        },
        Tooltip: {
            description: 'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it',
            props: ['trigger', 'content'],
            shadcnMapping: 'Tooltip',
        },
        HoverCard: {
            description: 'For card-like content that appears on hover',
            props: ['trigger', 'content'],
            shadcnMapping: 'HoverCard',
        },
        Collapsible: {
            description: 'An interactive component which can be expanded or collapsed',
            props: ['trigger', 'content'],
            shadcnMapping: 'Collapsible',
        },
        Carousel: {
            description: 'A slideshow component for cycling through elements',
            props: ['items'],
            shadcnMapping: 'Carousel',
        },

        // ============================================
        // Data Display Components
        // ============================================
        Table: {
            description: 'Data table',
            props: ['columns', 'rows', 'caption'],
            shadcnMapping: 'Table',
        },
        Chart: {
            description: 'Visualize data using various chart types',
            props: ['config', 'data', 'type', 'height', 'title', 'description'],
            shadcnMapping: 'Chart',
        },
        ListView: {
            description: 'List of items',
            props: ['items', 'renderItem'],
            shadcnMapping: 'ScrollArea with items',
        },
        ChipList: {
            description: 'List of chips/tags',
            props: ['chips'],
            shadcnMapping: 'flex with Badge components',
        },
        Pagination: {
            description: 'Pagination with previous and next buttons',
            props: ['total', 'current', 'onPageChange'],
            shadcnMapping: 'Pagination',
        },
        Command: {
            description: 'Fast, composable, unstyled command menu',
            props: ['placeholder', 'groups'],
            shadcnMapping: 'Command',
        },
        Menubar: {
            description: 'A visually persistent menu common in desktop applications',
            props: ['items'],
            shadcnMapping: 'Menubar',
        },
        NavigationMenu: {
            description: 'A collection of links for navigating websites',
            props: ['items'],
            shadcnMapping: 'NavigationMenu',
        },
        ContextMenu: {
            description: 'Displays a menu to users — typically triggered by right-click',
            props: ['trigger', 'items'],
            shadcnMapping: 'ContextMenu',
        },
    },
} as const;

// Type helper to get component type names
export type A2UIComponentType = keyof typeof A2UI_STANDARD_CATALOG.components;

// Get catalog as a simple list for agent prompts
export function getCatalogForPrompt(): string {
    return Object.entries(A2UI_STANDARD_CATALOG.components)
        .map(([type, meta]) => `- **${type}**: ${meta.description}`)
        .join('\n');
}

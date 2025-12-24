// A2UI Component Registry
// Maps A2UI component types to shadcn/ui React components
// Based on A2UI Builder Implementation Guide

import React from 'react';
import { A2UIComponent, BoundValue, ComponentRenderer, RendererProps } from '@/lib/types';

// ============================================
// Import ALL pre-installed shadcn/ui components
// ============================================

// Layout & Container
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';

// Form Inputs
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from '@/components/ui/input-group';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

// Display
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

// Interactive
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';

// Data Display
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from '@/components/ui/command';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from '@/components/ui/menubar';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';

// New Final Components
import { ButtonGroup, ButtonGroupSeparator } from '@/components/ui/button-group';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Toggle } from '@/components/ui/toggle';
import { Toggle as SwitchToggle } from '@/components/ui/toggle';

// ============================================
// Component Registry Class
// ============================================

export class ComponentRegistry {
    private renderers: Map<string, ComponentRenderer> = new Map();

    constructor() {
        this.registerAllComponents();
    }

    // ============================================
    // Register All Component Renderers
    // ============================================

    private registerAllComponents() {
        // ----------------------------------------
        // Layout Components
        // ----------------------------------------

        // Column - Vertical flex container
        this.register('Column', ({ props, renderComponent }) => {
            const childIds = props.children?.explicitList || [];
            const gap = props.gap ?? 4;
            const align = props.align || 'stretch';
            const justify = props.justify || 'start';
            const width = props.width ? (props.width.startsWith('[') ? `w-${props.width}` : `w-${props.width}`) : 'w-full';
            const height = props.height ? (props.height.startsWith('[') ? `h-${props.height}` : `h-${props.height}`) : '';

            return React.createElement(
                'div',
                {
                    className: `flex flex-col gap-${gap} items-${align} justify-${justify} ${width} ${height} ${props.className || ''}`.trim(),
                    style: { padding: props.padding ? `${props.padding * 4}px` : undefined },
                },
                childIds.map((id: string) => (
                    <React.Fragment key={id}>{renderComponent(id)}</React.Fragment>
                ))
            );
        });

        // Row - Horizontal flex container
        this.register('Row', ({ props, renderComponent }) => {
            const childIds = props.children?.explicitList || [];
            const gap = props.gap ?? 4;
            const align = props.align || 'center';
            const justify = props.justify || 'start';
            const wrap = props.wrap ? 'flex-wrap' : '';
            const width = props.width ? (props.width.startsWith('[') ? `w-${props.width}` : `w-${props.width}`) : 'w-full';
            const height = props.height ? (props.height.startsWith('[') ? `h-${props.height}` : `h-${props.height}`) : '';

            return React.createElement(
                'div',
                {
                    className: `flex flex-row gap-${gap} items-${align} justify-${justify} ${wrap} ${width} ${height} ${props.className || ''}`.trim(),
                },
                childIds.map((id: string) => (
                    <React.Fragment key={id}>{renderComponent(id)}</React.Fragment>
                ))
            );
        });

        // Card - Container with styling
        this.register('Card', ({ props, renderComponent, resolveDataBinding }) => {
            const title = resolveDataBinding(props.title);
            const description = resolveDataBinding(props.description);
            const width = props.width ? (props.width.startsWith('[') ? `w-${props.width}` : `w-${props.width}`) : '';

            return (
                <Card className={`${width} ${props.className || ''}`.trim()}>
                    {(title || description) && (
                        <CardHeader>
                            {title && <CardTitle>{title}</CardTitle>}
                            {description && <CardDescription>{description}</CardDescription>}
                        </CardHeader>
                    )}
                    <CardContent>
                        {props.child && renderComponent(props.child)}
                        {props.children?.explicitList?.map((id: string) => (
                            <React.Fragment key={id}>{renderComponent(id)}</React.Fragment>
                        ))}
                    </CardContent>
                    {props.footer && (
                        <CardFooter>{renderComponent(props.footer)}</CardFooter>
                    )}
                </Card>
            );
        });

        // Section - Semantic section wrapper
        this.register('Section', ({ props, renderComponent }) => {
            return (
                <section
                    className={props.background || ''}
                    style={{ padding: props.padding ? `${props.padding * 4}px` : undefined }}
                >
                    {props.child && renderComponent(props.child)}
                </section>
            );
        });

        // AspectRatio
        this.register('AspectRatio', ({ props, renderComponent }) => {
            return (
                <AspectRatio ratio={props.ratio || 16 / 9}>
                    {props.child && renderComponent(props.child)}
                </AspectRatio>
            );
        });

        // Resizable
        this.register('Resizable', ({ props, renderComponent }) => {
            const panels = props.panels || [];
            return (
                <ResizablePanelGroup
                    direction={(props.direction as any) || 'horizontal'}
                    className="min-h-50 w-full rounded-lg border"
                >
                    {panels.map((panel: any, idx: number) => (
                        <React.Fragment key={idx}>
                            <ResizablePanel defaultSize={panel.size || 50}>
                                <div className="flex h-full items-center justify-center p-6">
                                    {panel.child && renderComponent(panel.child)}
                                </div>
                            </ResizablePanel>
                            {idx < panels.length - 1 && <ResizableHandle />}
                        </React.Fragment>
                    ))}
                </ResizablePanelGroup>
            );
        });

        // Sidebar
        this.register('Sidebar', ({ props, renderComponent }) => {
            return (
                <SidebarProvider>
                    <div className="flex min-h-screen w-full">
                        <Sidebar collapsible={props.collapsible}>
                            {props.header && (
                                <SidebarHeader>{renderComponent(props.header)}</SidebarHeader>
                            )}
                            <SidebarContent>
                                {props.content && renderComponent(props.content)}
                                {props.children?.explicitList?.map((id: string) => (
                                    <React.Fragment key={id}>{renderComponent(id)}</React.Fragment>
                                ))}
                            </SidebarContent>
                            {props.footer && (
                                <SidebarFooter>{renderComponent(props.footer)}</SidebarFooter>
                            )}
                        </Sidebar>
                        <main className="flex-1 p-6">
                            <SidebarTrigger />
                            {/* Target content would go here if Sidebar was a layout wrapper */}
                        </main>
                    </div>
                </SidebarProvider>
            );
        });

        // SidebarTrigger
        this.register('SidebarTrigger', () => {
            return <SidebarTrigger />;
        });

        // ----------------------------------------
        // Display Components
        // ----------------------------------------

        // Text - Typography
        this.register('Text', ({ props, resolveDataBinding }) => {
            const text = resolveDataBinding(props.text);
            const hint = props.usageHint || 'body';

            const tagMap: Record<string, string> = {
                h1: 'h1',
                h2: 'h2',
                h3: 'h3',
                h4: 'h4',
                h5: 'h5',
                h6: 'h6',
                body: 'p',
                label: 'span',
                caption: 'span',
            };

            const classMap: Record<string, string> = {
                h1: 'text-4xl font-bold tracking-tight',
                h2: 'text-3xl font-semibold tracking-tight',
                h3: 'text-2xl font-semibold',
                h4: 'text-xl font-semibold',
                h5: 'text-lg font-medium',
                h6: 'text-base font-medium',
                body: 'text-base',
                label: 'text-sm font-medium',
                caption: 'text-sm text-muted-foreground',
            };

            const Tag = tagMap[hint] || 'p';
            const className = `${classMap[hint] || 'text-base'} ${props.className || ''}`.trim();

            return React.createElement(Tag, { className }, String(text ?? ''));
        });

        // Image - Image display
        this.register('Image', ({ props, resolveDataBinding }) => {
            const src = resolveDataBinding(props.src);
            const alt = resolveDataBinding(props.alt) || '';

            return (
                <img
                    src={src}
                    alt={alt}
                    width={props.width}
                    height={props.height}
                    className="rounded-md object-cover"
                />
            );
        });

        // Icon - Icon element (using emoji/text as placeholder)
        this.register('Icon', ({ props, resolveDataBinding }) => {
            const name = resolveDataBinding(props.name);
            return (
                <span
                    className={`inline-flex items-center justify-center ${props.size === 'lg' ? 'text-2xl' : props.size === 'sm' ? 'text-sm' : 'text-base'}`}
                    style={{ color: props.color }}
                >
                    {name}
                </span>
            );
        });

        // Badge - Label element
        this.register('Badge', ({ props, resolveDataBinding }) => {
            const text = resolveDataBinding(props.text);
            const variant = props.variant || 'default';

            return <Badge variant={variant as any}>{text}</Badge>;
        });

        // Divider - Separator
        this.register('Divider', ({ props }) => {
            return <Separator orientation={props.orientation || 'horizontal'} className="my-4" />;
        });

        // Breadcrumb
        this.register('Breadcrumb', ({ props, resolveDataBinding }) => {
            const items = props.items || [];
            return (
                <Breadcrumb>
                    <BreadcrumbList>
                        {items.map((item: any, idx: number) => (
                            <React.Fragment key={idx}>
                                <BreadcrumbItem>
                                    {idx === items.length - 1 ? (
                                        <BreadcrumbPage>{resolveDataBinding(item.label)}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={item.href || '#'}>
                                            {resolveDataBinding(item.label)}
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {idx < items.length - 1 && <BreadcrumbSeparator />}
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            );
        });

        // Avatar
        this.register('Avatar', ({ props, resolveDataBinding }) => {
            const src = resolveDataBinding(props.src);
            const fallback = resolveDataBinding(props.fallback) || '?';

            return (
                <Avatar>
                    {src && <AvatarImage src={src} />}
                    <AvatarFallback>{fallback}</AvatarFallback>
                </Avatar>
            );
        });

        // Alert
        this.register('Alert', ({ props, resolveDataBinding }) => {
            const title = resolveDataBinding(props.title);
            const description = resolveDataBinding(props.description);

            return (
                <Alert variant={props.variant || 'default'}>
                    {title && <AlertTitle>{title}</AlertTitle>}
                    {description && <AlertDescription>{description}</AlertDescription>}
                </Alert>
            );
        });

        // Progress
        this.register('Progress', ({ props, resolveDataBinding }) => {
            const value = resolveDataBinding(props.value) ?? 0;
            return <Progress value={value} />;
        });

        // Skeleton
        this.register('Skeleton', ({ props }) => {
            return <Skeleton className={`h-${props.height || 4} w-${props.width || 'full'}`} />;
        });

        // ----------------------------------------
        // Input Components
        // ----------------------------------------

        // TextField - Text input
        this.register('TextField', ({ props, resolveDataBinding }) => {
            const value = resolveDataBinding(props.value);
            const placeholder = resolveDataBinding(props.placeholder);
            const label = resolveDataBinding(props.label);

            const input = (
                <Input
                    type={props.type || 'text'}
                    placeholder={placeholder}
                    defaultValue={value}
                    disabled={props.disabled}
                    className="w-full"
                />
            );

            if (label) {
                return (
                    <div className="space-y-2">
                        <Label>{label}</Label>
                        {input}
                    </div>
                );
            }

            return input;
        });

        // InputGroup
        this.register('InputGroup', ({ props, renderComponent }) => {
            const childIds = props.children?.explicitList || [];
            return (
                <InputGroup>
                    {childIds.map((id: string) => (
                        <React.Fragment key={id}>{renderComponent(id)}</React.Fragment>
                    ))}
                </InputGroup>
            );
        });

        // InputGroupAddon
        this.register('InputGroupAddon', ({ props, renderComponent }) => {
            return (
                <InputGroupAddon align={(props.align as any) || 'inline-start'}>
                    {props.child && renderComponent(props.child)}
                </InputGroupAddon>
            );
        });

        // TextArea - Multi-line text input
        this.register('TextArea', ({ props, resolveDataBinding }) => {
            const value = resolveDataBinding(props.value);
            const placeholder = resolveDataBinding(props.placeholder);
            const label = resolveDataBinding(props.label);

            const textarea = (
                <Textarea
                    placeholder={placeholder}
                    defaultValue={value}
                    disabled={props.disabled}
                    rows={props.rows || 4}
                    className="w-full"
                />
            );

            if (label) {
                return (
                    <div className="space-y-2">
                        <Label>{label}</Label>
                        {textarea}
                    </div>
                );
            }

            return textarea;
        });

        // SelectInput - Dropdown
        this.register('SelectInput', ({ props, resolveDataBinding }) => {
            const value = resolveDataBinding(props.value);
            const placeholder = resolveDataBinding(props.placeholder) || 'Select...';
            const label = resolveDataBinding(props.label);
            const options = props.options || [];

            const select = (
                <Select defaultValue={value} disabled={props.disabled}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((opt: any, idx: number) => (
                            <SelectItem key={idx} value={opt.value || opt}>
                                {opt.label || opt}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            );

            if (label) {
                return (
                    <div className="space-y-2">
                        <Label>{label}</Label>
                        {select}
                    </div>
                );
            }

            return select;
        });

        // CheckBox
        this.register('CheckBox', ({ props, resolveDataBinding }) => {
            const checked = resolveDataBinding(props.checked);
            const label = resolveDataBinding(props.label);

            return (
                <div className="flex items-center space-x-2">
                    <Checkbox defaultChecked={checked} disabled={props.disabled} id={props.id} />
                    {label && <Label htmlFor={props.id}>{label}</Label>}
                </div>
            );
        });

        // RadioInput - Radio group
        this.register('RadioInput', ({ props, resolveDataBinding }) => {
            const value = resolveDataBinding(props.value);
            const options = props.options || [];

            return (
                <RadioGroup defaultValue={value}>
                    {options.map((opt: any, idx: number) => (
                        <div key={idx} className="flex items-center space-x-2">
                            <RadioGroupItem value={opt.value || opt} id={`radio-${idx}`} />
                            <Label htmlFor={`radio-${idx}`}>{opt.label || opt}</Label>
                        </div>
                    ))}
                </RadioGroup>
            );
        });

        // DateInput
        this.register('DateInput', ({ props, resolveDataBinding }) => {
            const value = resolveDataBinding(props.value);
            const placeholder = resolveDataBinding(props.placeholder);
            const label = resolveDataBinding(props.label);

            const input = (
                <Input
                    type="date"
                    placeholder={placeholder}
                    defaultValue={value}
                    disabled={props.disabled}
                />
            );

            if (label) {
                return (
                    <div className="space-y-2">
                        <Label>{label}</Label>
                        {input}
                    </div>
                );
            }

            return input;
        });

        // Toggle - Switch
        this.register('Toggle', ({ props, resolveDataBinding }) => {
            const checked = resolveDataBinding(props.checked);
            const label = resolveDataBinding(props.label);

            return (
                <div className="flex items-center space-x-2">
                    <Switch defaultChecked={checked} disabled={props.disabled} />
                    {label && <Label>{label}</Label>}
                </div>
            );
        });

        // Slider
        this.register('Slider', ({ props, resolveDataBinding }) => {
            const value = resolveDataBinding(props.value) ?? 50;
            const label = resolveDataBinding(props.label);

            const slider = (
                <Slider
                    defaultValue={[value]}
                    min={props.min ?? 0}
                    max={props.max ?? 100}
                    step={props.step ?? 1}
                />
            );

            if (label) {
                return (
                    <div className="space-y-2">
                        <Label>{label}</Label>
                        {slider}
                    </div>
                );
            }

            return slider;
        });

        // ----------------------------------------
        // Interactive Components
        // ----------------------------------------

        // Button
        this.register('Button', ({ props, onAction, renderComponent, resolveDataBinding }) => {
            const label = resolveDataBinding(props.label);
            const children = props.child ? renderComponent(props.child) : label;

            return (
                <Button
                    variant={props.variant || 'default'}
                    size={props.size || 'default'}
                    disabled={props.disabled}
                    onClick={() => {
                        if (props.action && onAction) {
                            onAction(props.action.name, props.action.context || {});
                        }
                    }}
                >
                    {children}
                </Button>
            );
        });

        // Link
        this.register('Link', ({ props, resolveDataBinding }) => {
            const text = resolveDataBinding(props.text);
            const href = resolveDataBinding(props.href) || '#';

            return (
                <a
                    href={href}
                    target={props.target || '_self'}
                    className="text-primary underline-offset-4 hover:underline"
                >
                    {text}
                </a>
            );
        });

        // Dialog
        this.register('Dialog', ({ props, renderComponent, resolveDataBinding }) => {
            const title = resolveDataBinding(props.title);
            const description = resolveDataBinding(props.description);

            return (
                <Dialog defaultOpen={props.open}>
                    {props.trigger && (
                        <DialogTrigger asChild>{renderComponent(props.trigger)}</DialogTrigger>
                    )}
                    <DialogContent>
                        <DialogHeader>
                            {title && <DialogTitle>{title}</DialogTitle>}
                            {description && <DialogDescription>{description}</DialogDescription>}
                        </DialogHeader>
                        {props.content && renderComponent(props.content)}
                        {props.child && renderComponent(props.child)}
                    </DialogContent>
                </Dialog>
            );
        });

        // AlertDialog
        this.register('AlertDialog', ({ props, renderComponent, resolveDataBinding }) => {
            return (
                <AlertDialog>
                    {props.trigger && (
                        <AlertDialogTrigger asChild>{renderComponent(props.trigger)}</AlertDialogTrigger>
                    )}
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>{resolveDataBinding(props.title)}</AlertDialogTitle>
                            <AlertDialogDescription>{resolveDataBinding(props.description)}</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>{resolveDataBinding(props.cancelLabel) || 'Cancel'}</AlertDialogCancel>
                            <AlertDialogAction>{resolveDataBinding(props.actionLabel) || 'Continue'}</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            );
        });

        // Drawer
        this.register('Drawer', ({ props, renderComponent, resolveDataBinding }) => {
            return (
                <Drawer>
                    {props.trigger && (
                        <DrawerTrigger asChild>{renderComponent(props.trigger)}</DrawerTrigger>
                    )}
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>{resolveDataBinding(props.title)}</DrawerTitle>
                            <DrawerDescription>{resolveDataBinding(props.description)}</DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 overflow-y-auto">
                            {props.child && renderComponent(props.child)}
                        </div>
                        <DrawerFooter>
                            {props.footer && renderComponent(props.footer)}
                            <DrawerClose asChild>
                                <Button variant="outline">Close</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            );
        });

        // Sheet
        this.register('Sheet', ({ props, renderComponent, resolveDataBinding }) => {
            return (
                <Sheet>
                    {props.trigger && (
                        <SheetTrigger asChild>{renderComponent(props.trigger)}</SheetTrigger>
                    )}
                    <SheetContent side={props.side || 'right'}>
                        <SheetHeader>
                            <SheetTitle>{resolveDataBinding(props.title)}</SheetTitle>
                            <SheetDescription>{resolveDataBinding(props.description)}</SheetDescription>
                        </SheetHeader>
                        <div className="py-4">
                            {props.child && renderComponent(props.child)}
                        </div>
                    </SheetContent>
                </Sheet>
            );
        });

        // Popover
        this.register('Popover', ({ props, renderComponent }) => {
            return (
                <Popover>
                    {props.trigger && (
                        <PopoverTrigger asChild>{renderComponent(props.trigger)}</PopoverTrigger>
                    )}
                    <PopoverContent>
                        {props.content && renderComponent(props.content)}
                    </PopoverContent>
                </Popover>
            );
        });

        // Tooltip
        this.register('Tooltip', ({ props, renderComponent }) => {
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            {props.trigger && renderComponent(props.trigger)}
                        </TooltipTrigger>
                        <TooltipContent>
                            {props.content && renderComponent(props.content)}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        });

        // Collapsible
        this.register('Collapsible', ({ props, renderComponent }) => {
            return (
                <Collapsible>
                    {props.trigger && (
                        <CollapsibleTrigger asChild>{renderComponent(props.trigger)}</CollapsibleTrigger>
                    )}
                    <CollapsibleContent>
                        {props.content && renderComponent(props.content)}
                    </CollapsibleContent>
                </Collapsible>
            );
        });

        // Carousel
        this.register('Carousel', ({ props, renderComponent }) => {
            const items = props.items || [];
            return (
                <Carousel className="w-full max-w-xs mx-auto">
                    <CarouselContent>
                        {items.map((item: any, idx: number) => (
                            <CarouselItem key={idx}>
                                {renderComponent(item)}
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            );
        });

        // Tabs
        this.register('Tabs', ({ props, renderComponent, resolveDataBinding }) => {
            const tabs = props.tabs || [];
            const defaultValue = resolveDataBinding(props.defaultValue) || tabs[0]?.value || 'tab-0';

            return (
                <Tabs defaultValue={defaultValue}>
                    <TabsList>
                        {tabs.map((tab: any, idx: number) => (
                            <TabsTrigger key={idx} value={tab.value || `tab-${idx}`}>
                                {tab.label || `Tab ${idx + 1}`}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {tabs.map((tab: any, idx: number) => (
                        <TabsContent key={idx} value={tab.value || `tab-${idx}`}>
                            {tab.content && renderComponent(tab.content)}
                        </TabsContent>
                    ))}
                </Tabs>
            );
        });

        // Accordion
        this.register('Accordion', ({ props, renderComponent, resolveDataBinding }) => {
            const items = props.items || [];

            return (
                <Accordion type={props.type || 'single'} collapsible>
                    {items.map((item: any, idx: number) => (
                        <AccordionItem key={idx} value={`item-${idx}`}>
                            <AccordionTrigger>
                                {resolveDataBinding(item.title) || `Item ${idx + 1}`}
                            </AccordionTrigger>
                            <AccordionContent>
                                {item.content && renderComponent(item.content)}
                                {item.text && <p>{resolveDataBinding(item.text)}</p>}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            );
        });

        // DropdownMenu
        this.register('DropdownMenu', ({ props, renderComponent, resolveDataBinding, onAction }) => {
            const items = props.items || [];

            return (
                <DropdownMenu>
                    {props.trigger && (
                        <DropdownMenuTrigger asChild>{renderComponent(props.trigger)}</DropdownMenuTrigger>
                    )}
                    <DropdownMenuContent>
                        {props.label && <DropdownMenuLabel>{resolveDataBinding(props.label)}</DropdownMenuLabel>}
                        {props.label && <DropdownMenuSeparator />}
                        {items.map((item: any, idx: number) => (
                            <DropdownMenuItem
                                key={idx}
                                onClick={() => {
                                    if (item.action && onAction) {
                                        onAction(item.action.name, item.action.context || {});
                                    }
                                }}
                            >
                                {resolveDataBinding(item.label) || item}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        });

        // ----------------------------------------
        // Data Display Components
        // ----------------------------------------

        // Table
        this.register('Table', ({ props, resolveDataBinding }) => {
            const columns = props.columns || [];
            const rows = props.rows || [];
            const caption = resolveDataBinding(props.caption);

            return (
                <Table>
                    {caption && <TableCaption>{caption}</TableCaption>}
                    <TableHeader>
                        <TableRow>
                            {columns.map((col: any, idx: number) => (
                                <TableHead key={idx}>{resolveDataBinding(col.header) || col}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((row: any, rowIdx: number) => (
                            <TableRow key={rowIdx}>
                                {columns.map((col: any, colIdx: number) => (
                                    <TableCell key={colIdx}>
                                        {row[col.key] || row[colIdx] || ''}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            );
        });

        // ScrollArea (renders a scroll container or top-level scroll wrapper)
        this.register('ScrollArea', ({ props, renderComponent }) => {
            const child = props.child ? renderComponent(props.child) : (props.children?.explicitList || []).map((id: string) => renderComponent(id));
            return (
                <ScrollArea className={props.className || ''}>
                    {Array.isArray(child) ? (<div className={props.innerClassName || ''}>{child}</div>) : child}
                </ScrollArea>
            );
        });

        // ListView
        this.register('ListView', ({ props, renderComponent, resolveDataBinding }) => {
            const items = props.items || [];

            return (
                <ScrollArea className="h-[18.75px]">
                    <div className="space-y-2 pr-4">
                        {items.map((item: any, idx: number) => (
                            <div key={idx} className="p-3 border rounded-lg">
                                {typeof item === 'string' ? (
                                    <p>{item}</p>
                                ) : item.content ? (
                                    renderComponent(item.content)
                                ) : (
                                    <p>{resolveDataBinding(item.text) || JSON.stringify(item)}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            );
        });

        // ChipList
        this.register('ChipList', ({ props, resolveDataBinding }) => {
            const chips = props.chips || [];

            return (
                <div className="flex flex-wrap gap-2">
                    {chips.map((chip: any, idx: number) => (
                        <Badge key={idx} variant={chip.variant || 'secondary'}>
                            {resolveDataBinding(chip.text) || chip}
                        </Badge>
                    ))}
                </div>
            );
        });

        // Pagination
        this.register('Pagination', ({ props }) => {
            return (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            );
        });

        // Command
        this.register('Command', ({ props, resolveDataBinding }) => {
            const groups = props.groups || [];
            return (
                <Command className="rounded-lg border shadow-md">
                    <CommandInput placeholder={resolveDataBinding(props.placeholder) || 'Type a command...'} />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        {groups.map((group: any, idx: number) => (
                            <React.Fragment key={idx}>
                                <CommandGroup heading={group.heading}>
                                    {(group.items || []).map((item: any, itemIdx: number) => (
                                        <CommandItem key={itemIdx}>
                                            {resolveDataBinding(item.label) || item}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                                {idx < groups.length - 1 && <CommandSeparator />}
                            </React.Fragment>
                        ))}
                    </CommandList>
                </Command>
            );
        });

        // Menubar
        this.register('Menubar', ({ props, resolveDataBinding }) => {
            const items = props.items || [];
            return (
                <Menubar>
                    {items.map((menu: any, idx: number) => (
                        <MenubarMenu key={idx}>
                            <MenubarTrigger>{menu.label}</MenubarTrigger>
                            <MenubarContent>
                                {(menu.items || []).map((item: any, itemIdx: number) => (
                                    <React.Fragment key={itemIdx}>
                                        {item.separator ? (
                                            <MenubarSeparator />
                                        ) : (
                                            <MenubarItem>
                                                {resolveDataBinding(item.label)}
                                            </MenubarItem>
                                        )}
                                    </React.Fragment>
                                ))}
                            </MenubarContent>
                        </MenubarMenu>
                    ))}
                </Menubar>
            );
        });

        // NavigationMenu
        this.register('NavigationMenu', ({ props, resolveDataBinding }) => {
            const items = props.items || [];
            return (
                <NavigationMenu>
                    <NavigationMenuList>
                        {items.map((item: any, idx: number) => (
                            <NavigationMenuItem key={idx}>
                                {item.content ? (
                                    <>
                                        <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <div className="p-4 w-100">
                                                {item.content}
                                            </div>
                                        </NavigationMenuContent>
                                    </>
                                ) : (
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()} href={item.href || '#'}>
                                        {item.label}
                                    </NavigationMenuLink>
                                )}
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            );
        });

        // ContextMenu
        this.register('ContextMenu', ({ props, renderComponent, resolveDataBinding }) => {
            const items = props.items || [];
            return (
                <ContextMenu>
                    <ContextMenuTrigger className="flex h-[37.5px] w-full items-center justify-center rounded-md border border-dashed text-sm">
                        {props.trigger ? renderComponent(props.trigger) : 'Right click here'}
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-64">
                        {items.map((item: any, idx: number) => (
                            <React.Fragment key={idx}>
                                {item.separator ? (
                                    <ContextMenuSeparator />
                                ) : (
                                    <ContextMenuItem>
                                        {resolveDataBinding(item.label)}
                                    </ContextMenuItem>
                                )}
                            </React.Fragment>
                        ))}
                    </ContextMenuContent>
                </ContextMenu>
            );
        });

        // ButtonGroup
        this.register('ButtonGroup', ({ props, renderComponent }) => {
            const childIds = props.children?.explicitList || [];
            return (
                <ButtonGroup orientation={props.orientation || 'horizontal'}>
                    {childIds.map((id: string) => (
                        <React.Fragment key={id}>{renderComponent(id)}</React.Fragment>
                    ))}
                </ButtonGroup>
            );
        });

        // Empty State
        this.register('Empty', ({ props, renderComponent, resolveDataBinding }) => {
            const title = resolveDataBinding(props.title);
            const description = resolveDataBinding(props.description);
            return (
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            {props.icon && renderComponent(props.icon)}
                        </EmptyMedia>
                        {title && <EmptyTitle>{title}</EmptyTitle>}
                        {description && <EmptyDescription>{description}</EmptyDescription>}
                    </EmptyHeader>
                    {props.child && (
                        <EmptyContent>
                            {renderComponent(props.child)}
                        </EmptyContent>
                    )}
                </Empty>
            );
        });

        // Field Wrapper
        this.register('Field', ({ props, renderComponent, resolveDataBinding }) => {
            const label = resolveDataBinding(props.label);
            const description = resolveDataBinding(props.description);
            const error = resolveDataBinding(props.error);

            return (
                <Field orientation={props.orientation || 'vertical'}>
                    {label && <FieldLabel>{label}</FieldLabel>}
                    <FieldContent>
                        {props.child && renderComponent(props.child)}
                        {description && <FieldDescription>{description}</FieldDescription>}
                        {error && <FieldError>{error}</FieldError>}
                    </FieldContent>
                </Field>
            );
        });

        // InputOTP
        this.register('InputOTP', ({ props, resolveDataBinding }) => {
            const value = resolveDataBinding(props.value);
            const maxLength = props.maxLength || 6;
            const slots = Array.from({ length: maxLength }, (_, i) => i);

            return (
                <InputOTP
                    maxLength={maxLength}
                    value={value}
                    pattern={props.pattern}
                >
                    <InputOTPGroup>
                        {slots.map((i) => (
                            <InputOTPSlot key={i} index={i} />
                        ))}
                    </InputOTPGroup>
                </InputOTP>
            );
        });

        // ToggleGroup
        this.register('ToggleGroup', ({ props, renderComponent, resolveDataBinding }) => {
            const items = props.items || [];
            return (
                <ToggleGroup
                    type={props.type || 'multiple'}
                    variant={props.variant}
                    size={props.size}
                >
                    {items.map((item: any, idx: number) => (
                        <ToggleGroupItem key={idx} value={item.value}>
                            {item.label ? resolveDataBinding(item.label) : (item.child && renderComponent(item.child))}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            );
        });

        // Toggle (Shadcn Button style)
        this.register('Toggle', ({ props, renderComponent, resolveDataBinding }) => {
            return (
                <Toggle
                    variant={props.variant}
                    size={props.size}
                    aria-label={resolveDataBinding(props.label)}
                >
                    {props.child ? renderComponent(props.child) : resolveDataBinding(props.label)}
                </Toggle>
            );
        });

        // HoverCard
        this.register('HoverCard', ({ props, renderComponent }) => {
            return (
                <HoverCard>
                    <HoverCardTrigger asChild>
                        {props.trigger && renderComponent(props.trigger)}
                    </HoverCardTrigger>
                    <HoverCardContent>
                        {props.content && renderComponent(props.content)}
                    </HoverCardContent>
                </HoverCard>
            );
        });

        // Chart (Final Implementation)
        this.register('Chart', ({ props, resolveDataBinding }) => {
            const config = props.config || {};

            return (
                <div className="w-full">
                    {(props.title || props.description) && (
                        <div className="mb-4">
                            {props.title && <h3 className="text-lg font-medium">{resolveDataBinding(props.title)}</h3>}
                            {props.description && <p className="text-sm text-muted-foreground">{resolveDataBinding(props.description)}</p>}
                        </div>
                    )}
                    <ChartContainer config={config} className={`aspect-video w-full h-[${props.height || '300px'}]`}>
                        <div className="flex h-full items-center justify-center border-2 border-dashed rounded-lg bg-muted/50">
                            <span className="text-sm text-muted-foreground">Chart: {props.type || 'Data Visualization'}</span>
                        </div>
                    </ChartContainer>
                </div>
            );
        });

        // ---------------------------------------------------------------------
        // Explicitly register every imported shadcn/ui component.
        // No implicit fallback or runtime auto-registration loop is used.
        // Each component is registered explicitly (guarded so we don't
        // overwrite custom renderers defined earlier).
        // ---------------------------------------------------------------------

        const registerSimple = (name: string, Comp: any) => {
            if (!Comp) return;
            if (this.hasRenderer(name)) return;

            const renderFn = ({ props, renderComponent }: any) => {
                const child = props?.child ? renderComponent(props.child) : undefined;
                const childrenList = props?.children?.explicitList ? props.children.explicitList.map((id: string) => renderComponent(id)) : undefined;
                const children = child ?? childrenList ?? undefined;

                const safeProps = { ...props };
                delete safeProps.child;
                delete safeProps.children;

                return React.createElement(
                    Comp,
                    safeProps,
                    Array.isArray(children) ? React.createElement(React.Fragment, null, ...children) : children
                );
            };

            // register primary name
            this.register(name, renderFn);

            // register common aliases: lowercase and kebab-case
            const lower = name.toLowerCase();
            const kebab = name
                .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
                .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
                .toLowerCase();

            [lower, kebab].forEach((alias) => {
                if (alias !== name && !this.hasRenderer(alias)) {
                    this.register(alias, renderFn);
                }
            });
        };

        // Layout & Container
        registerSimple('Card', Card);
        registerSimple('CardContent', CardContent);
        registerSimple('CardDescription', CardDescription);
        registerSimple('CardFooter', CardFooter);
        registerSimple('CardHeader', CardHeader);
        registerSimple('CardTitle', CardTitle);
        registerSimple('AspectRatio', AspectRatio);
        registerSimple('ResizableHandle', ResizableHandle);
        registerSimple('ResizablePanel', ResizablePanel);
        registerSimple('ResizablePanelGroup', ResizablePanelGroup);
        registerSimple('Sidebar', Sidebar);
        registerSimple('SidebarContent', SidebarContent);
        registerSimple('SidebarFooter', SidebarFooter);
        registerSimple('SidebarHeader', SidebarHeader);
        registerSimple('SidebarProvider', SidebarProvider);
        registerSimple('SidebarTrigger', SidebarTrigger);

        // Form Inputs
        registerSimple('Button', Button);
        registerSimple('Input', Input);
        registerSimple('InputGroup', InputGroup);
        registerSimple('InputGroupAddon', InputGroupAddon);
        registerSimple('InputGroupButton', InputGroupButton);
        registerSimple('InputGroupInput', InputGroupInput);
        registerSimple('Textarea', Textarea);
        registerSimple('Label', Label);
        registerSimple('Checkbox', Checkbox);
        registerSimple('RadioGroup', RadioGroup);
        registerSimple('RadioGroupItem', RadioGroupItem);
        registerSimple('Switch', Switch);
        registerSimple('Slider', Slider);
        registerSimple('Select', Select);
        registerSimple('SelectContent', SelectContent);
        registerSimple('SelectItem', SelectItem);
        registerSimple('SelectTrigger', SelectTrigger);
        registerSimple('SelectValue', SelectValue);

        // Display
        registerSimple('Badge', Badge);
        registerSimple('Avatar', Avatar);
        registerSimple('AvatarFallback', AvatarFallback);
        registerSimple('AvatarImage', AvatarImage);
        registerSimple('Separator', Separator);
        registerSimple('Skeleton', Skeleton);
        registerSimple('Alert', Alert);
        registerSimple('AlertDescription', AlertDescription);
        registerSimple('AlertTitle', AlertTitle);
        registerSimple('Progress', Progress);
        registerSimple('Breadcrumb', Breadcrumb);
        registerSimple('BreadcrumbItem', BreadcrumbItem);
        registerSimple('BreadcrumbLink', BreadcrumbLink);
        registerSimple('BreadcrumbList', BreadcrumbList);
        registerSimple('BreadcrumbPage', BreadcrumbPage);
        registerSimple('BreadcrumbSeparator', BreadcrumbSeparator);

        // Interactive
        registerSimple('Dialog', Dialog);
        registerSimple('DialogContent', DialogContent);
        registerSimple('DialogDescription', DialogDescription);
        registerSimple('DialogFooter', DialogFooter);
        registerSimple('DialogHeader', DialogHeader);
        registerSimple('DialogTitle', DialogTitle);
        registerSimple('DialogTrigger', DialogTrigger);
        registerSimple('DropdownMenu', DropdownMenu);
        registerSimple('DropdownMenuContent', DropdownMenuContent);
        registerSimple('DropdownMenuItem', DropdownMenuItem);
        registerSimple('DropdownMenuLabel', DropdownMenuLabel);
        registerSimple('DropdownMenuSeparator', DropdownMenuSeparator);
        registerSimple('DropdownMenuTrigger', DropdownMenuTrigger);
        registerSimple('Tooltip', Tooltip);
        registerSimple('TooltipContent', TooltipContent);
        registerSimple('TooltipProvider', TooltipProvider);
        registerSimple('TooltipTrigger', TooltipTrigger);
        registerSimple('Tabs', Tabs);
        registerSimple('TabsContent', TabsContent);
        registerSimple('TabsList', TabsList);
        registerSimple('TabsTrigger', TabsTrigger);
        registerSimple('Accordion', Accordion);
        registerSimple('AccordionContent', AccordionContent);
        registerSimple('AccordionItem', AccordionItem);
        registerSimple('AccordionTrigger', AccordionTrigger);
        registerSimple('Sheet', Sheet);
        registerSimple('SheetContent', SheetContent);
        registerSimple('SheetDescription', SheetDescription);
        registerSimple('SheetHeader', SheetHeader);
        registerSimple('SheetTitle', SheetTitle);
        registerSimple('SheetTrigger', SheetTrigger);
        registerSimple('Popover', Popover);
        registerSimple('PopoverContent', PopoverContent);
        registerSimple('PopoverTrigger', PopoverTrigger);
        registerSimple('AlertDialog', AlertDialog);
        registerSimple('AlertDialogAction', AlertDialogAction);
        registerSimple('AlertDialogCancel', AlertDialogCancel);
        registerSimple('AlertDialogContent', AlertDialogContent);
        registerSimple('AlertDialogDescription', AlertDialogDescription);
        registerSimple('AlertDialogFooter', AlertDialogFooter);
        registerSimple('AlertDialogHeader', AlertDialogHeader);
        registerSimple('AlertDialogTitle', AlertDialogTitle);
        registerSimple('AlertDialogTrigger', AlertDialogTrigger);
        registerSimple('Drawer', Drawer);
        registerSimple('DrawerClose', DrawerClose);
        registerSimple('DrawerContent', DrawerContent);
        registerSimple('DrawerDescription', DrawerDescription);
        registerSimple('DrawerFooter', DrawerFooter);
        registerSimple('DrawerHeader', DrawerHeader);
        registerSimple('DrawerTitle', DrawerTitle);
        registerSimple('DrawerTrigger', DrawerTrigger);
        registerSimple('Collapsible', Collapsible);
        registerSimple('CollapsibleContent', CollapsibleContent);
        registerSimple('CollapsibleTrigger', CollapsibleTrigger);
        registerSimple('Carousel', Carousel);
        registerSimple('CarouselContent', CarouselContent);
        registerSimple('CarouselItem', CarouselItem);
        registerSimple('CarouselNext', CarouselNext);
        registerSimple('CarouselPrevious', CarouselPrevious);
        registerSimple('ChartContainer', ChartContainer);
        registerSimple('ChartTooltip', ChartTooltip);
        registerSimple('ChartTooltipContent', ChartTooltipContent);

        // Data Display
        registerSimple('Table', Table);
        registerSimple('TableBody', TableBody);
        registerSimple('TableCaption', TableCaption);
        registerSimple('TableCell', TableCell);
        registerSimple('TableHead', TableHead);
        registerSimple('TableHeader', TableHeader);
        registerSimple('TableRow', TableRow);
        registerSimple('ScrollArea', ScrollArea);
        registerSimple('Pagination', Pagination);
        registerSimple('PaginationContent', PaginationContent);
        registerSimple('PaginationEllipsis', PaginationEllipsis);
        registerSimple('PaginationItem', PaginationItem);
        registerSimple('PaginationLink', PaginationLink);
        registerSimple('PaginationNext', PaginationNext);
        registerSimple('PaginationPrevious', PaginationPrevious);

        // Command / Menus / Navigation
        registerSimple('Command', Command);
        registerSimple('CommandEmpty', CommandEmpty);
        registerSimple('CommandGroup', CommandGroup);
        registerSimple('CommandInput', CommandInput);
        registerSimple('CommandItem', CommandItem);
        registerSimple('CommandList', CommandList);
        registerSimple('CommandSeparator', CommandSeparator);
        registerSimple('CommandShortcut', CommandShortcut);
        registerSimple('Menubar', Menubar);
        registerSimple('MenubarContent', MenubarContent);
        registerSimple('MenubarItem', MenubarItem);
        registerSimple('MenubarMenu', MenubarMenu);
        registerSimple('MenubarSeparator', MenubarSeparator);
        registerSimple('MenubarShortcut', MenubarShortcut);
        registerSimple('MenubarTrigger', MenubarTrigger);
        registerSimple('NavigationMenu', NavigationMenu);
        registerSimple('NavigationMenuContent', NavigationMenuContent);
        registerSimple('NavigationMenuItem', NavigationMenuItem);
        registerSimple('NavigationMenuLink', NavigationMenuLink);
        registerSimple('NavigationMenuList', NavigationMenuList);
        registerSimple('NavigationMenuTrigger', NavigationMenuTrigger);
        // navigationMenuTriggerStyle is a helper function/style; we don't register it as a component

        // ContextMenu
        registerSimple('ContextMenu', ContextMenu);
        registerSimple('ContextMenuCheckboxItem', ContextMenuCheckboxItem);
        registerSimple('ContextMenuContent', ContextMenuContent);
        registerSimple('ContextMenuItem', ContextMenuItem);
        registerSimple('ContextMenuLabel', ContextMenuLabel);
        registerSimple('ContextMenuRadioGroup', ContextMenuRadioGroup);
        registerSimple('ContextMenuRadioItem', ContextMenuRadioItem);
        registerSimple('ContextMenuSeparator', ContextMenuSeparator);
        registerSimple('ContextMenuShortcut', ContextMenuShortcut);
        registerSimple('ContextMenuSub', ContextMenuSub);
        registerSimple('ContextMenuSubContent', ContextMenuSubContent);
        registerSimple('ContextMenuSubTrigger', ContextMenuSubTrigger);
        registerSimple('ContextMenuTrigger', ContextMenuTrigger);

        // New Final Components
        registerSimple('ButtonGroup', ButtonGroup);
        registerSimple('ButtonGroupSeparator', ButtonGroupSeparator);
        registerSimple('Empty', Empty);
        registerSimple('EmptyContent', EmptyContent);
        registerSimple('EmptyDescription', EmptyDescription);
        registerSimple('EmptyHeader', EmptyHeader);
        registerSimple('EmptyMedia', EmptyMedia);
        registerSimple('EmptyTitle', EmptyTitle);
        registerSimple('Field', Field);
        registerSimple('FieldContent', FieldContent);
        registerSimple('FieldDescription', FieldDescription);
        registerSimple('FieldError', FieldError);
        registerSimple('FieldLabel', FieldLabel);
        registerSimple('HoverCard', HoverCard);
        registerSimple('HoverCardContent', HoverCardContent);
        registerSimple('HoverCardTrigger', HoverCardTrigger);
        registerSimple('InputOTP', InputOTP);
        registerSimple('InputOTPGroup', InputOTPGroup);
        registerSimple('InputOTPSeparator', InputOTPSeparator);
        registerSimple('InputOTPSlot', InputOTPSlot);
        registerSimple('ToggleGroup', ToggleGroup);
        registerSimple('ToggleGroupItem', ToggleGroupItem);
        registerSimple('Toggle', Toggle);
        registerSimple('SwitchToggle', SwitchToggle);
    }

    // ============================================
    // Registry Methods
    // ============================================

    register(type: string, renderer: ComponentRenderer) {
        this.renderers.set(type, renderer);
    }

    getRenderer(type: string): ComponentRenderer | undefined {
        return this.renderers.get(type);
    }

    hasRenderer(type: string): boolean {
        return this.renderers.has(type);
    }

    getRegisteredTypes(): string[] {
        return Array.from(this.renderers.keys());
    }
}

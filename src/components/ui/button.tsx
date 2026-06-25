import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border-[3px] border-black bg-clip-padding text-sm font-bold whitespace-nowrap outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer transition-all duration-150",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white [box-shadow:var(--neo-shadow)] hover:[box-shadow:var(--neo-shadow-hover)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:[box-shadow:var(--neo-shadow-active)] active:translate-x-0.5 active:translate-y-0.5",
        outline:
          "bg-white text-foreground [box-shadow:var(--neo-shadow)] hover:[box-shadow:var(--neo-shadow-hover)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:[box-shadow:var(--neo-shadow-active)] active:translate-x-0.5 active:translate-y-0.5",
        secondary:
          "bg-secondary text-secondary-foreground border-black [box-shadow:var(--neo-shadow)] hover:[box-shadow:var(--neo-shadow-hover)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:[box-shadow:var(--neo-shadow-active)] active:translate-x-0.5 active:translate-y-0.5",
        ghost:
          "border-transparent shadow-none hover:bg-accent hover:border-black hover:[box-shadow:var(--neo-shadow)]",
        destructive:
          "bg-red-500 text-white [box-shadow:var(--neo-shadow)] hover:[box-shadow:var(--neo-shadow-hover)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:[box-shadow:var(--neo-shadow-active)] active:translate-x-0.5 active:translate-y-0.5",
        link: "border-transparent shadow-none text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 gap-1.5 px-4",
        xs: "h-6 gap-1 rounded-md px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 px-3 text-[0.8rem] [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 gap-2 px-6 text-base",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

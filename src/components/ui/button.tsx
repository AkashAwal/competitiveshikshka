import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-2xl border bg-clip-padding text-sm font-semibold whitespace-nowrap outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-[3px] border-primary/70 [box-shadow:var(--clay-shadow-btn)] hover:[box-shadow:var(--clay-shadow-btn-hover)] hover:-translate-y-0.5 active:[box-shadow:var(--clay-shadow-btn-active)] active:translate-y-px [transition-property:all] [transition-duration:200ms] [transition-timing-function:var(--clay-bounce)]",
        outline:
          "border-[3px] border-primary/25 bg-card text-foreground [box-shadow:var(--clay-shadow-sm)] hover:[box-shadow:var(--clay-shadow)] hover:-translate-y-0.5 active:translate-y-px [transition-property:all] [transition-duration:200ms] [transition-timing-function:var(--clay-bounce)]",
        secondary:
          "border-[3px] border-border bg-secondary text-secondary-foreground [box-shadow:var(--clay-shadow-sm)] hover:[box-shadow:var(--clay-shadow)] hover:-translate-y-0.5 [transition-property:all] [transition-duration:200ms] [transition-timing-function:var(--clay-bounce)]",
        ghost:
          "border-[3px] border-transparent hover:border-primary/15 hover:bg-accent hover:text-foreground [transition-property:all] [transition-duration:200ms]",
        destructive:
          "border-[3px] border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20 [box-shadow:inset_-1px_-3px_6px_rgba(0,0,0,0.08),_3px_6px_16px_rgba(239,68,68,0.25)] hover:[box-shadow:inset_-1px_-3px_6px_rgba(0,0,0,0.08),_5px_8px_20px_rgba(239,68,68,0.35)] hover:-translate-y-0.5 [transition-property:all] [transition-duration:200ms] [transition-timing-function:var(--clay-bounce)]",
        link: "border-transparent text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "h-6 gap-1 rounded-xl px-2.5 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-xl px-3 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 gap-2 px-6 text-base has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-xl [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 rounded-xl",
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

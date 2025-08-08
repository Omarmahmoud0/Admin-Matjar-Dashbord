import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "~/lib/utils";

function Popover({ children, ...props }: PopoverPrimitive.PopoverProps) {
  return <PopoverPrimitive.Root {...props}>{children}</PopoverPrimitive.Root>;
}

function PopoverTrigger({ children, ...props }: PopoverPrimitive.PopoverTriggerProps) {
  return <PopoverPrimitive.Trigger asChild {...props}>{children}</PopoverPrimitive.Trigger>;
}

function PopoverContent({ className, sideOffset = 4, ...props }: PopoverPrimitive.PopoverContentProps & { className?: string; sideOffset?: number }) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          "z-50 rounded-md border bg-popover p-4 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

export { Popover, PopoverTrigger, PopoverContent }; 
"use client"
import React, { useCallback, useState, forwardRef, useEffect } from "react"

// shadcn
import { Popover, PopoverContent, PopoverTrigger } from "./Popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./Command"

// utils

// assets
import { cn } from "@/utils/clsx"
import { ChevronDown, CheckIcon, Globe } from "lucide-react"

// data
interface Option {
  id: string
  name: string
}

// Dropdown props
interface Props {
  options?: Option[]
  onChange?: (value: Option) => void
  defaultValue?: string
  disabled?: boolean
  placeholder?: string
  slim?: boolean
}

const AutocompleteDropdownComponent = (
  {
    onChange,
    options = [],
    defaultValue,
    disabled = false,
    placeholder = "Select a item",
    slim = false,
    ...props
  }: Props,
  ref: React.ForwardedRef<HTMLButtonElement>,
) => {
  const [open, setOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<Option | undefined>(undefined)

  useEffect(() => {
    if (defaultValue) {
      const initialCountry = options.find((country) => country.id === defaultValue)
      if (initialCountry) {
        setSelectedCountry(initialCountry)
      } else {
        // Reset selected item if defaultValue is not found
        setSelectedCountry(undefined)
      }
    } else {
      // Reset selected item if defaultValue is undefined or null
      setSelectedCountry(undefined)
    }
  }, [defaultValue, options])

  const handleSelect = useCallback(
    (country: Option) => {
      setSelectedCountry(country)
      onChange?.(country)
      setOpen(false)
    },
    [onChange],
  )

  const triggerClasses = cn(
    "flex h-10 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
    slim === true && "w-20",
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger ref={ref} className={triggerClasses} disabled={disabled} {...props}>
        {selectedCountry ? (
          <div className="flex items-center flex-grow w-0 gap-2 overflow-hidden">
            {slim === false && (
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">{selectedCountry.name}</span>
            )}
          </div>
        ) : (
          <span>{slim === false ? placeholder || setSelectedCountry.name : <Globe size={20} />}</span>
        )}
        <ChevronDown size={16} />
      </PopoverTrigger>
      <PopoverContent collisionPadding={10} side="bottom" className="min-w-[--radix-popper-anchor-width] p-0">
        <Command className="w-full max-h-[200px] sm:max-h-[270px]">
          <CommandList>
            <div className="sticky top-0 z-10 bg-popover">
              <CommandInput placeholder="Search country..." />
            </div>
            <CommandEmpty>Нічого не знайдено.</CommandEmpty>
            <CommandGroup>
              {options
                .filter((x) => x.name)
                .map((option, key: number) => (
                  <CommandItem
                    className="flex items-center w-full gap-2"
                    key={key}
                    onSelect={() => handleSelect(option)}
                  >
                    <div className="flex flex-grow w-0 space-x-2 overflow-hidden">
                      <span className="overflow-hidden text-ellipsis whitespace-nowrap">{option.name}</span>
                    </div>
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4 shrink-0",
                        option.name === selectedCountry?.name ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

AutocompleteDropdownComponent.displayName = "AutocompleteDropdownComponent"

export const AutocompleteDropdown = forwardRef(AutocompleteDropdownComponent)

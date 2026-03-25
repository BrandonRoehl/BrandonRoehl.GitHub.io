'use client'

import cn from 'clsx'
import { useTheme } from 'next-themes'
import { Select } from 'nextra/components'
import { useMounted } from 'nextra/hooks'
import { MoonIcon, SunIcon, DeviceDesktopIcon, Icon } from '@primer/octicons-react'
import { ReactNode } from 'react'

interface MenuOption {
    id: string;
    icon: Icon;
    name: ReactNode;
}

export function ThemeSwitch() {
    const props = useTheme()
    const mounted = useMounted()

    const id = (mounted ? (props.theme || props.systemTheme) : undefined) || 'light'
    const options: MenuOption[] = [
        {
            id: 'light',
            icon: SunIcon,
            name: 'Light',
        },
        {
            id: 'dark',
            icon: MoonIcon,
            name: 'Dark',
        },
        {
            id: 'system',
            icon: DeviceDesktopIcon,
            name: 'System',
        }
    ].filter(o => props.themes.includes(o.id))

    const IconToUse = options.find(o => o.id === id)?.icon || SunIcon

    return (
        <Select
            className={cn('x:p-2')}
            title="Change theme"
            options={options}
            onChange={props.setTheme}
            value={id}
            selectedOption={
                <IconToUse size={12} />
            }
        />
    )
}


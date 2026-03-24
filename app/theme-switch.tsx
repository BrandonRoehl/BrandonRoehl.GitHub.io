'use client'

import cn from 'clsx'
import { useTheme } from 'next-themes'
import { Select } from 'nextra/components'
import { useMounted } from 'nextra/hooks'
import { MoonIcon, SunIcon } from 'nextra/icons'

export function ThemeSwitch() {
    const props = useTheme()
    const mounted = useMounted()

    const IconToUse = mounted && props.resolvedTheme === 'dark' ? MoonIcon : SunIcon
    const id = (mounted ? (props.theme || props.systemTheme) : undefined) || 'light'

    const options = props.themes.map(theme => ({ id: theme, name: theme }))
    return (
        <Select
            className={cn('x:p-2')}
            title="Change theme"
            options={options}
            onChange={props.setTheme}
            value={id}
            selectedOption={
                <IconToUse height="12" />
            }
        />
    )
}


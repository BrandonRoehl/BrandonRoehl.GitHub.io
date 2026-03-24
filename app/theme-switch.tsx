'use client'

import cn from 'clsx'
import { useTheme } from 'next-themes'
import { Select } from 'nextra/components'
import { useMounted } from 'nextra/hooks'
import { MoonIcon, SunIcon } from 'nextra/icons'

export function ThemeSwitch() {
    const { setTheme, resolvedTheme, theme } = useTheme()
    const mounted = useMounted()

    const IconToUse = mounted && resolvedTheme === 'dark' ? MoonIcon : SunIcon

    const id = mounted ? (theme as keyof typeof String) : 'light'
    return (
        <Select
            className={cn('x:p-2')}
            title="Change theme"
            options={[
                { id: 'light', name: 'Light' },
                { id: 'dark', name: 'Dark' },
                { id: 'system', name: 'System' }
            ]}
            onChange={setTheme}
            value={id}
            selectedOption={
                <>
                    <IconToUse height="12" />
                </>
            }
        />
    )
}

// 'use client'
//
// import { useTheme } from 'next-themes'
// import { Button } from 'nextra/components'
// import { useMounted } from 'nextra/hooks'
// import { MoonIcon, SunIcon } from 'nextra/icons'
//
// export function ThemeSwitch() {
//     const { setTheme, resolvedTheme } = useTheme()
//     const mounted = useMounted()
//     const isDark = resolvedTheme === 'dark'
//
//     // TODO: system theme
//     const toggleTheme = () => {
//         setTheme(isDark ? 'light' : 'dark')
//     }
//
//     const IconToUse = mounted && isDark ? MoonIcon : SunIcon
//
//     return (
//         <Button
//             aria-label="Toggle Dark Mode"
//             className="x:p-2"
//             onClick={toggleTheme}
//         >
//             <IconToUse height="14" />
//         </Button>
//     )
// }

import {
    createContext,
    useContext,
    useRef,
    useState,
    useCallback
} from "react"

import type { ReactNode } from 'react'
import { useTerminalDimensions } from "@opentui/react"
import type { ToastOptions, ToastVariant } from "./type"
import { DEFAULT_DURATION } from './type'
import { SplitBorderChars } from "../../components/border"
import { useTheme } from "../themes"

export type ToastContextValue = {
    show: (option: ToastOptions) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast(): ToastContextValue {
    const value = useContext(ToastContext)
    if (!value) {
        throw new Error("useToast must be used inside a Toast Provider")
    }

    return value
}

type ToastProviderProp = {
    children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProp) {
    const [currentToast, setCurrentToast] = useState<ToastOptions | null>(null)
    const timeoutHandleRef = useRef<NodeJS.Timeout | null>(null)

    const clearCurrentTimeout = useCallback(() => {
        if (timeoutHandleRef.current) {
            clearTimeout(timeoutHandleRef.current);
            timeoutHandleRef.current = null
        }
    }, [])

    const show = useCallback((options: ToastOptions) => {
        const duration = options.duration ?? DEFAULT_DURATION
        clearCurrentTimeout()

        setCurrentToast({
            ...options,
            variant: options.variant ?? 'info',
            duration
        })

        timeoutHandleRef.current = setTimeout(() => {
            setCurrentToast(null)
        }, duration).unref()
    }, [])

    const value: ToastContextValue = {
        show
    }

    return (
        <ToastContext.Provider value={value}>
            {children}
            <Toast currentToast={currentToast} />
        </ToastContext.Provider>
    )
}

type ToastProps = {
    currentToast: ToastOptions | null
}

function Toast({ currentToast }: ToastProps) {
    const { width } = useTerminalDimensions()
    const {colors} = useTheme()

    if (!currentToast) return null

    const variantColors: Record<ToastVariant, string> = {
        success: colors.success,
        error: colors.error,
        info:colors.info
    }

    const borderColor =
        currentToast.variant ?
            variantColors[currentToast.variant]
            : variantColors.info

    return (
        <box
            position="absolute"
            justifyContent="center"
            alignItems="flex-start"
            top={2}
            right={2}
            width={Math.max(1, Math.min(60, width - 60))}
            paddingX={2}
            paddingY={1}
            backgroundColor={colors.surface}
            borderColor={borderColor}
            border={["left", "right"]}
            // TODO add split border
            customBorderChars={SplitBorderChars}
        >
            <box flexDirection="column" gap={1} width={"100%"}>
                <text fg={"#e1e1e1"} wrapMode="word" width={"100%"}>
                    {currentToast.message}
                </text>
            </box>
        </box>
    )
}
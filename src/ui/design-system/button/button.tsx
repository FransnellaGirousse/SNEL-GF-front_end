
import {PropsWithChildren} from "react";
import {IconProps} from "@/types/iconProps";
import clsx from "clsx";
import {LinkType, LinkTypes} from "@/lib/link-type";
import {Spinner} from "@/ui/design-system/spinner/spinner";
import Link from "next/link";

interface Props {
    size?: "small" | "medium" | "large",
    variant?: "accent" | "secondary" | "outline" | "disabled" | "ico" | "success",
    icon?: IconProps,
    iconTheme?: "accent" | "secondary" | "gray" | "danger",
    iconPosition?: "left" | "right",
    disabled?: boolean,
    isLoading?: boolean,
    baseUrl?: string,
    linkType?: LinkType,
    type?: "button" | "submit",
    fullWidth?: boolean,
    action?: Function,
}

export const Button = ({
                           size = "medium",
                           variant = "accent",
                           icon,
                           iconTheme = "accent",
                           iconPosition = "right",
                           disabled,
                           isLoading,
                           children,
                           baseUrl,
                           linkType = "internal",
                           type = "button",
                           fullWidth = false,
                           action = () => {
                           }
                       }: PropsWithChildren<Props>) => {
    let variantStyles: string = "", sizeStyles: string = "", icoSize: number = 0
    switch (variant) {
        case "accent": // Default
            variantStyles = "bg-primary hover:bg-primary-400 text-white rounded"
            break
        case "secondary":
            variantStyles = "bg-primary-200 hover:bg-primary-300/50 text-primary rounded"
            break
        case "outline":
            variantStyles = "border border-gray text-gray rounded"
            break
        case "disabled":
            variantStyles = "bg-gray-400 border border-gray-500 text-gray-600 rounded cursor-not-allowed"
            break
        case "success":
            variantStyles = "bg-secondary hover:bg-secondary-400 text-white rounded"
            break
        case "ico":
            if (iconTheme === "accent") { // Default
                variantStyles = "bg-primary hover:bg-primary-400 text-white rounded-full"
            }
            if (iconTheme === "secondary") {
                variantStyles = "bg-primary-200 hover:bg-primary-300/50 text-primary rounded-full"
            }
            if (iconTheme === "gray") {
                variantStyles = "bg-gray-800 hover:bg-gray-700 text-white rounded-full"
            }
            if (iconTheme === "danger") {
                variantStyles = "bg-alert-danger hover:bg-alert-danger/50 text-white rounded-full"
            }
            break
    }
    switch (size) {
        case "small":
            sizeStyles = `text-caption3 max-sm:text-caption4 font-medium ${
                variant === "ico" ? "flex items-center justify-center w-[40px] h-[40px]" : "px-[14px] py-[12px] max-sm:px-[12px] max-sm:py-[10px]"
            }`
            icoSize = 18
            break
        case "medium": // Default
            sizeStyles = `text-caption2 font-medium max-sm:text-caption3 ${
                variant === "ico" ? "flex items-center justify-center w-[50px] h-[50px] max-sm:w-[40px] max-sm:h-[40px]" : "px-[18px] py-[15px] max-sm:px-[14px] max-sm:py-[12px]"
            }`
            icoSize = 20
            break
        case "large":
            sizeStyles = `text-caption1 font-medium ${
                variant === "ico" ? "flex items-center justify-center w-[60px] h-[60px]" : "px-[22px] py-[18px]"
            }`
            icoSize = 24
            break
    }
    const handleClick = () => {
        if (action) {
            action()
        }
    }
    const buttonContent = (
        <>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    {
                        variant === "accent" || variant === "ico"
                            ? (<Spinner size="small" variant="white"/>)
                            : (<Spinner size="small"/>)
                    }
                </div>
            )}
            <div className={clsx(isLoading && "invisible")}>
                {
                    icon && variant === "ico"
                        ? <icon.icon size={icoSize}/>
                        : <div className={clsx(icon && "flex items-center gap-1")}>
                            {icon && iconPosition === "left"
                                && <icon.icon size={icoSize}/>
                            }
                            {children}
                            {icon && iconPosition === "right"
                                && <icon.icon size={icoSize}/>
                            }
                        </div>
                }
            </div>
        </>
    )
    const buttonElement = (
        <button
            type={type}
            className={clsx(
                variantStyles,
                sizeStyles,
                icoSize,
                fullWidth && "w-full",
                isLoading && "cursor-not-allowed",
                "relative animate"
            )}
            disabled={disabled || isLoading ? true : false}
        >
            {buttonContent}
        </button>
    )
    if (baseUrl) {
        if (linkType === LinkTypes.EXTERNAL) {
            return <a href={baseUrl} target="_blank">
                {buttonElement}
            </a>
        } else {
            return <Link href={baseUrl}>
                {buttonElement}
            </Link>
        }
    }
    return buttonElement
}
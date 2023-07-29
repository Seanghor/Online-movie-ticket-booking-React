import React from "react";


interface IconButtonProps {
    title?: string;
    emoji?: string | null;
    isTitleOnly: boolean;
    isIconOnly: boolean;
    onClick: Function;
    isDisabled: boolean;
    className: string | null
}

export const IconButton: React.FunctionComponent<IconButtonProps> = (props: IconButtonProps) => {
    const {
        title,
        emoji,
        isTitleOnly,
        isIconOnly,
        onClick,
        isDisabled,
        className
    } = props;
    return (
        <button
            // type='submit'
            disabled={isDisabled}
            onClick={() => onClick()}
            className={className
                ? `${className} flex items-center justify-center p-2 px-5 align-middle rounded-md cursor-pointer `
                : `flex items-center justify-center p-2 px-5 align-middle rounded-md cursor-pointer`

            }>
            {
                isIconOnly ? (
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <img src={emoji || ""} alt="Image" />
                ) : null
            }
            {
                isTitleOnly ? (
                    <p className="outline-none items-center text-center text-[16px]">
                        {title}
                    </p>
                ) : null
            }
        </button >

    );
}


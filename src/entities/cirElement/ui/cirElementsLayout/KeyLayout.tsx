import { ICirElementLayout } from "@/shared/model/types";
import { FC } from 'react';

interface KeyLayout extends ICirElementLayout { }

/**
 * LampLayout
 * @param {KeyLayout} props - props
 * @returns {JSX.Element}
 */
export const KeyLayout: FC<KeyLayout> = ({ power, isSelected }) => {
    console.log(power)
    const d = !power ? `
    M 0 0
    m -40 0
    a 5 5 1 0 1 -10 0
    a 5 5 1 0 1 10 0
    l 73 -35
    m 7 35
    a 5 5 1 0 1 10 0
    a 5 5 1 0 1 -10 0
    m 10 0
    l 40 0
    m -140 0
    l -40 0
        ` : `
    M 0 0
    m -40 0
    a 5 5 1 0 1 -10 0
    a 5 5 1 0 1 10 0
    M -40 0
    L 40 0
    a 5 5 1 0 1 10 0
    a 5 5 1 0 1 -10 0
    m 10 0
    l 40 0
    m -140 0
    l -40 0
        `
    return (
        <>
            <path d={d} fill='transparent' stroke="black" strokeWidth={3} />
            {isSelected && <path d={d}
                stroke="DodgerBlue"
                strokeOpacity={0.4}
                strokeWidth={6} />}
        </>
    )
}
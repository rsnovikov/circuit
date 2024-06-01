import { ICirElementLayout } from "@/shared/model/types";
import { FC } from 'react';

interface LampLayoutProps extends ICirElementLayout { }

/**
 * LampLayout
 * @param {LampLayoutProps} props - props
 * @returns {JSX.Element}
 */
export const KeyLayout: FC<LampLayoutProps> = ({ power, isSelected }) => {
    console.log(power)
    const d = !power ? `
        M 0 0,
        m -40 0,
        a 5 5 1 0 1 -10 0,
        a 5 5 1 0 1 10 0,
        l 73 -35,
        m 7 35,
        a 5 5 1 0 1 10 0,
        a 5 5 1 0 1 -10 0,
        m 10 0,
        l 20 0,
        m -120 0,
        l -20 0
        ` : `
        M 0 0,
        m -40 0,
        a 5 5 1 0 1 -10 0,
        a 5 5 1 0 1 10 0,
        M -40 0
        L 40 0
        a 5 5 1 0 1 10 0,
        a 5 5 1 0 1 -10 0,
        m 10 0,
        l 20 0,
        m -120 0,
        l -20 0
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
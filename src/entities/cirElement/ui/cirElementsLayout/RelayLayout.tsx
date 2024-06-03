import { ICirElementLayout } from "@/shared/model/types";
import { FC } from 'react';

interface RelayLayoutProps extends ICirElementLayout { }

/**
 * LampLayout
 * @param {RelayLayoutProps} props - props
 * @returns {JSX.Element}
 */
export const RelayLayout: FC<RelayLayoutProps> = ({ power, isSelected }) => {
    console.log(power)
    const d = !power ? `
    M 0 0
    m 0 -20
    h -20
    v -40
    h -40
    m 40 0
    v -40
    h 40
    v 40
    h 40
    m -40 0
    v 40
    h-20
    m 0 10
    l 0 10
    m 0 10
    l 0 10
    m 0 10
    l 0 10
    m 0 10
    l 0 10
    m 0 10
    l 0 10
    m 0 15
    m -40 -35
    a 5 5 1 0 1 -10 0
    a 5 5 1 0 1 10 0
    l 73 -35
    m 7 35
    a 5 5 1 0 1 10 0
    a 5 5 1 0 1 -10 0
    m 10 0
    l 40 0
    m -140 0
    l -40 0 `
        :
        ` M 0 0
    m 0 -20
    h -20
    v -40
    h -40
    m 40 0
    v -40
    h 40
    v 40
    h 40
    m -40 0
    v 40
    h -20
    m 0 10
    l 0 10
    m 0 10
    l 0 10
    m 0 10
    l 0 10
    m 0 10
    l 0 10
    m 0 10
    l 0 10
    m 0 15
    m -40 -35
    a 5 5 1 0 1 -10 0
    a 5 5 1 0 1 10 0
    l 75 0
    m 5 0
    a 5 5 1 0 1 10 0
    a 5 5 1 0 1 -10 0
    m 10 0
    l 40 0
    m -140 0
    l -40 0 `
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
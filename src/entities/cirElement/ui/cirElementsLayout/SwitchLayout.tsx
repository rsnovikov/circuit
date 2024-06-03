import { ICirElementLayout } from "@/shared/model/types";
import { FC } from 'react';

interface SwitchLayoutProps extends ICirElementLayout { }

/**
 * LampLayout
 * @param {SwitchLayoutProps} props - props
 * @returns {JSX.Element}
 */
export const SwitchLayout: FC<SwitchLayoutProps> = ({ power, isSelected }) => {
    const d = !power ? `
    M 0 0
        m 0 20
        h -20
        v 40
        h-40
        m 40 0
        v 40
        h 40
        v -40
        h 40
        m -40 0
        v -40
        h -20
        m 0 -5
        v -10
        m 0 -5
        v-10
        m 0 -5
        v -10
        m 0 -5
        v-10
        m 0 -5
        v -10
        m 0 -5
        v-10
        m 0 -5
        v -10
        m 0 -5
        v-10
        m -60 10
        h 120
        v 10
        m 0 40
        v 10
        h -120
        m 0 -30
        h 20
        l 100 22`
        :
        ` M 0 0
        m 0 20
        h -20
        v 40
        h-40
        m 40 0
        v 40
        h 40
        v -40
        h 40
        m -40 0
        v -40
        h -20
        m 0 -5
        v -10
        m 0 -5
        v-10
        m 0 -5
        v -10
        m 0 -5
        v-10
        m 0 -5
        v -10
        m 0 -5
        v-10
        m 0 -5
        v -10
        m 0 -5
        v-10
        m -60 10
        h 120
        v 10
        m 0 40
        v 10
        h -120
        m 0 -30
        h 20
        l 100 -22`
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
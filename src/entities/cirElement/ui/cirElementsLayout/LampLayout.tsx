import { ICirElementLayout } from "@/shared/model/types";
import { FC } from 'react';

interface LampLayoutProps  extends ICirElementLayout{}

/**
 * LampLayout
 * @param {LampLayoutProps} props - props
 * @returns {JSX.Element}
 */
export const LampLayout: FC<LampLayoutProps> = ({power, isSelected}) => {

	const d = 'M 0 0 m -50 0 a 50 50 1 0 1 100 0 a 50 50 1 0 1 -100 0 m 15 35 l 70 -70 m -70 0 l 70 70 m 15 -35 l 30 0 m -130 0 l -30 0'

return (
	<>
<path d={d} fill={power && power > 0 ? "yellow" : "transparent"}  stroke="black" strokeWidth={3}/>
{isSelected && <path d={d}
stroke="DodgerBlue"
					strokeOpacity={0.4}
					strokeWidth={6}/>}
</>
)
}
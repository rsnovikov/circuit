import { ICirElementLayout } from "@/shared/model/types";
import { FC } from 'react';

const Fire = () => {
  return (
		<g transform="translate(-50, -100)"><path className="st0" d="M18.61,54.89C15.7,28.8,30.94,10.45,59.52,0C42.02,22.71,74.44,47.31,76.23,70.89 c4.19-7.15,6.57-16.69,7.04-29.45c21.43,33.62,3.66,88.57-43.5,80.67c-4.33-0.72-8.5-2.09-12.3-4.13C10.27,108.8,0,88.79,0,69.68 C0,57.5,5.21,46.63,11.95,37.99C12.85,46.45,14.77,52.76,18.61,54.89L18.61,54.89z"/><path className="st1" d="M33.87,92.58c-4.86-12.55-4.19-32.82,9.42-39.93c0.1,23.3,23.05,26.27,18.8,51.14 c3.92-4.44,5.9-11.54,6.25-17.15c6.22,14.24,1.34,25.63-7.53,31.43c-26.97,17.64-50.19-18.12-34.75-37.72 C26.53,84.73,31.89,91.49,33.87,92.58L33.87,92.58z"/></g>
  );
};

interface LampLayoutProps  extends ICirElementLayout{}

/**
 * LampLayout
 * @param {LampLayoutProps} props - props
 * @returns {JSX.Element}
 */
export const LampLayout: FC<LampLayoutProps> = ({power, isSelected}) => {

	const d = 'M 0 0 m -50 0 a 50 50 1 0 1 100 0 a 50 50 1 0 1 -100 0 m 15 35 l 70 -70 m -70 0 l 70 70 m 15 -35 l 40 0 m -140 0 l -40 0'

return (
	<>
		<path d={d} fill={power && power > 0 ? `rgba(255,255,0,${power}` : "transparent"} stroke="black" strokeWidth={3} />
{isSelected && <path d={d}
stroke="DodgerBlue"
					strokeOpacity={0.4}
			strokeWidth={6} />}
			{Math.abs(power) >= 1 && <Fire/>}
</>
)
}


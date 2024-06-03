import { ICirElementLayout } from "@/shared/model/types";
import { FC } from 'react';
import './MotorLayout.scss';
interface MotorLayout extends ICirElementLayout { }

/**
 * LampLayout
 * @param {MotorLayout} props - props
 * @returns {JSX.Element}
 */
export const MotorLayout: FC<MotorLayout> = ({ power, isSelected }) => {

	let speed = power || 0;
	console.log('speed', speed);


    const dList =   [`

		M 0 0
		m -70 0
		a 70 70 1 0 1 140 0
		a 70 70 1 0 1 -140 0l -50 0
		m 190 0
		l 50 0
		m -120 70
		l 0 50

		`,`
		M 0 0
		m 0 -60
		l 0 60
		l -50 35
		m 100 0
		l -50 -35
	` ]    
    return (
        <>
				{dList.map((d, index) => 
 <path key={d} d={d} fill='transparent' stroke="black" strokeWidth={3} style={index === 1 ? {
						animation: `motor-rotating ${1 / Math.abs(speed)}s linear infinite${speed < 0 ? ' reverse' : ''}`
 } : {}}/>
				)}
           
					 { isSelected && 
						<path  d={dList[0]}
						
                stroke="DodgerBlue"
                strokeOpacity={0.4}
                strokeWidth={6} 
								/>
				}

        </>
    )
}
import {motion} from "framer-motion";
import './App.css';
type SpinnerProps=
{
  size?:number;
  thickness?:number;
  color?:string;
  speed?:number;
  lable?:string;
}

function App({
size = 48,
thickness = 4,
color = 'red',
speed = 1,
lable = 'Loading',
}:SpinnerProps) {
  const radius = (size - thickness) / 2;
const circumference = 2 * Math.PI * radius;
  return (
    <div role="status" aria-live="polite" aria-label={lable} className="spinner-wrapper">
     <div className="loading">Loading</div> 
     <motion.svg
     width={size}
     height={size}
     viewBox={`0 0 ${size} ${size}`}
     initial={{ rotate: 0 }}
     animate={{ rotate: 360 }}
     transition={{ repeat: Infinity, ease: 'linear', duration: speed }}
     className="block">
     <circle
     cx={size / 2}
     cy={size / 2}
     r={radius}
     stroke={color}
     strokeWidth={thickness}
     opacity={0.12}
     fill="none"
     />
     <motion.circle
      cx={size / 2}
     cy={size / 2}
     r={radius}
     stroke={color}
     strokeWidth={thickness}
     strokeLinecap="round"
     fill="none"
     strokeDasharray={`${circumference * 0.75} ${circumference}`} // 75% arc + gap
     strokeDashoffset={0}
     style={{ transformOrigin: '50% 50%' }}
     />
     </motion.svg>
    </div>
  );
}

export default App;

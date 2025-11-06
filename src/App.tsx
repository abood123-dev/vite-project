import {motion} from "framer-motion";
import './App.css';
import { useState } from "react";
import { useEffect } from "react";
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
const[Rounding,setRounding]=useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div role="status" aria-live="polite" aria-label={lable} className="spinner-wrapper">
    { !Rounding  ?  <span className="click" onClick={()=>setRounding(true)}>Click here mate</span> : null}
     <div className="loading">Loading</div>
       <motion.div
        animate={
          Rounding
            ? { rotate: 360 }
            : { rotate: 0 }
        }
        transition={{
          repeat: Rounding ? Infinity : 0,
          duration: 3,
          ease: "linear",
        }}
      style={
        !Rounding ? {
          transformOrigin: "120px center", 
          position: "absolute",
          top:isMobile ?  "400px" :  "370px",
        } : 
        {
           transformOrigin: "120px center", 
           position: "absolute",
           top:isMobile ?  ""   : "270px",
           left:isMobile ? "60px"  :  "510px",
        }
        

        }
      >   
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
     </motion.div>
    </div>
  );
}

export default App;

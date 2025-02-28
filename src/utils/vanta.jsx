import  { useEffect, useRef } from "react";
import RINGS from "vanta/dist/vanta.rings.min";

const VantaBackground = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = RINGS({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x7eff00,
      backgroundColor: 0x111111, // Optional: Dark background
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return <div ref={vantaRef} className="vanta-background"></div>;
};

export default VantaBackground;

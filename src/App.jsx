import Canvas from "./Canvas";
import "./index.css";
import data from "./data"
import gsap from "gsap"
import LocomotiveScroll from 'locomotive-scroll';
import { useEffect,useState,useRef } from "react";

function App(){
    const [showCanvas,setShowCanvas] = useState(false)
    const headingRef = useRef(null)
    const growingSpanRef = useRef(null)

    useEffect(() =>{
        const scroll = new LocomotiveScroll()
        const handleClick = (e) => {
            setShowCanvas((prevCanvas) => {
                if(!prevCanvas) {
                    setShowCanvas(true)
                    gsap.set(growingSpanRef.current,{
                        top: e.clientY,
                        left: e.clientX,
                    })
                    gsap.to("body",{
                        color: "#000", 
                        backgroundColor: "#fd2c2a",
                        duration: 1.2,
                        ease: "power2.inOut",
                    })
                    gsap.to(growingSpanRef.current,{
                        scale: 1000,
                        duration: 2,
                        ease: 'Expo.easeInOut',
                        onComplete: () =>{
                            gsap.set(growingSpanRef.current,{
                                scale: 0,
                                clearProps: 'all',
                            });
                        }
                    })
                } else{
                    gsap.to("body",{
                        color: "#fff",
                        backgroundColor: "#000",
                        duration: 1.2,
                        ease: "power2.inOut",
                    })
                }
                return !prevCanvas
            });    
        }
        const headingElement = headingRef.current;
        headingElement.addEventListener("click", handleClick)

        return () => { headingElement.removeEventListener("click",handleClick) }
    }, [])
    return(
        <>
            <span ref={growingSpanRef} className="growing block fixed top-[-20px] left-[-20px] w-5 h-5 rounded-full"></span>
            <div className="w-full relative min-h-screen font-[poppins]">
                {showCanvas && data[0].map((canvasDets,index) =>(
                    <Canvas key={index} details={canvasDets}/>
                ))}
                <div className="w-full h-screen ">
                    <nav className="w-full p-[1vw] flex justify-between ">
                        <div className="brand font-400 text-[1.7vw]">thirtysixstudios</div>
                        <ul className="flex gap-8 ">
                            {["Home", "About", "Projects", "Contact"].map((link, index) => (
                                <li key={index}>
                                    <a href={`#${link.toLowerCase()}`} className="text-[1.2vw] hover:text-gray-300 transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="relative z-[1] textContainer w-full px-[20%]">
                        <div className="w-[50%] ">
                            <h3 className="text-[2vw] leading-[2.3vw]">At thirtysixstudios, we build immersive digital experiences for brand with a purpose</h3>
                            <p className="w-[80%] mt-[2vw] text-[1.2vw]  leading-[1.3vw]">We are a team of creative professionals who are passionate about building immersive digital experiences for brands with a purpose.</p>
                            <p className="text-[1.2vw] leading-[1.3vw] mt-[2vw]">Scroll</p>
                        </div> 
                    </div>
                    <div className="w-full absolute bottom-0 left-0">
                        <h1 ref={headingRef} className="text-[14.8vw] leading-none tracking-tighter font-400">thirtysixstudios</h1>
                    </div>
                </div>
            </div>
            <div className="w-full relative h-screen mt-[5vw] p-[2vw] font-[poppins]">
            {showCanvas && data[1].map((canvasDets,index) =>(
                    <Canvas key={index} details={canvasDets}/>
                ))}
                <div className="relative z-[1]">
                    <h1 className="text-[8vw] leading-none tracking-tighter font-400">about the brand</h1>
                    <p className="text-[3vw] w-[70%] leading-[3.4vw] mt-[2vw]">We’re a boutique production studio focused on design, motion, and creative technology, constantly reimagining what digital craft can do for present-time ads and campaigns, we are a team of creative professionals who are passionate about building immersive digital experiences for brands with a purpose.</p>
                </div>
            </div>
        </>
    )
}
export default App
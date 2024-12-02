/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react"
import canvasImage from "./canvasImage"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

function Canvas({details}) {

    const { startIndex, numImages, duration, size, top, left, zIndex } = details
    const [index,setIndex] = useState({value: startIndex})
    const canvasRef = useRef(null)

    useGSAP(() => {
        gsap.to(index, {
    
            value: startIndex + numImages -1,
            duration: duration,
            ease: "linear",
            repeat: -1,
            onUpdate: () => {
                setIndex({value: Math.round(index.value)})
            }
        })
        gsap.from(canvasRef.current,{
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
        })
    })

    useEffect(() => {
        const scale = window.devicePixelRatio
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const img = new Image()
        img.src = canvasImage[index.value]
        img.onload = () => {
            canvas.width = canvas.offsetWidth * scale
            canvas.height = canvas.offsetHeight * scale
            canvas.style.width = `${canvas.offsetWidth}px`
            canvas.style.height = `${canvas.offsetHeight}px`
            ctx.scale(scale,scale)
            ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight)
        }
    },[index])


  return (
    <div>
      <canvas data-scroll data-scroll-speed={Math.random().toFixed(1)} ref={canvasRef} style={{ position: "absolute", width: `${ size * .5 }px`, height: `${ size * .5 }px`, top: `${top}%`, left: `${left}%`, zIndex: zIndex }}  id="canvas"></canvas>
    </div>
  )
}

export default Canvas

import * as React from "react"

class DraggInfos {
  translateX: any
  translateY: any
  initialX: any
  initialY: any
  isDragging: any
  isMouseDown: any
  event: any
  constructor() {
    this.translateX = null
    this.translateY = null
    this.initialX = null
    this.initialY = null
    this.isDragging = false
    this.isMouseDown = false
    this.event = null

    window.addEventListener("mousedown", this.handleMouseDown)
    window.addEventListener("mouseup", this.handleMouseUp)
    window.addEventListener("mousemove", this.handleMouseMove)
  }

  handleMouseDown = (ev: any) => {
    this.isMouseDown = true
    this.initialX = ev.clientX
    this.initialY = ev.clientY
  }

  handleMouseUp = (ev: any) => {
    this.isMouseDown = false
    this.isDragging = false
    this.event(this.translateX, this.translateY, this.isDragging)
  }

  handleMouseMove = (ev: any) => {
    if (this.isMouseDown) {
      this.isDragging = true
      this.translateX = ev.clientX - this.initialX
      this.translateY = ev.clientY - this.initialY
      if (this.event){
        this.event(this.translateX, this.translateY, this.isDragging)
      }
    }
  }

  bind = (ev: any) => this.event = ev

  unbind = (ev: any) => this.event = null
}

const globalDraggInfos = new DraggInfos()

const Draggable = (props: any) => {
  const [isMouseDown, setIsmouseDown] = React.useState(false)
  const [[translateX, translateY], setTranslate] = React.useState([0, 0])
  const [[x, y], setPos] = React.useState([0, 0])
  const [[cx, cy], setCentering] = React.useState([0, 0])
  const handler = (tX: any, tY: any, isDragging: any) => {
    if (isMouseDown) {
        setTranslate([cx + tX, cy + tY])
      }
      if (!isDragging) {
        setIsmouseDown(false)
        if (props.resetTranslate) {
          setPos([0, 0])
        } else {
          setPos([x + translateX, y + translateY])
        }
        setTranslate([0, 0])
      }
    }
  // automatic binding
  React.useEffect(() => {
    globalDraggInfos.bind(handler)
    return () => globalDraggInfos.unbind(handler)
}, [isMouseDown])
  return (
    <div
      onMouseDown={(ev) => {
        setIsmouseDown(true)
        setCentering([
          x + ev.nativeEvent.offsetX - props.centeringX,
          y + ev.nativeEvent.offsetY - props.centeringY
        ])
      }}
      style={{
        position: "relative",
        transform: `translate(${x + translateX}px, ${y + translateY}px)`,
        zIndex: isMouseDown ? 10000 : "auto",
        pointerEvents: isMouseDown? "none": 'all',
      }}
    >
      {props.children}
    </div>
  )
}


export default Draggable
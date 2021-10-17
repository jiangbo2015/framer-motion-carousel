import * as React from "react"
import {
    animate,
    AnimationOptions,
    motion,
    MotionStyle,
    MotionValue,
    PanInfo,
    useMotionValue,
} from "framer-motion"


const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    overflowX: "hidden",
    display: "flex",
}

const pageStyle: MotionStyle = {
    width: "100%",
    height: "100%",
    display: "inline-block",
    flex: "none",
}

const transition: AnimationOptions<any> = {
    type: "spring",
    bounce: 0,
}

const colors = ["#eee", "#000", "red"]

const Contaier = React.forwardRef<
    HTMLDivElement,
    { children: React.ReactNode }
>((props, ref) => (
    <div ref={ref} style={containerStyle}>
        {props.children}
    </div>
))

const Slider = ({
    x,
    i,
    onDragEnd,
    children,
}: {
    x: MotionValue<number>
    i: number
    children: React.ReactNode
    onDragEnd: (e: Event, dragProps: PanInfo) => void
}) => (
    <motion.div
        style={{
            ...pageStyle,
            x,
            left: `${i * 100}%`,
            right: `${i * 100}%`,
        }}
        drag="x"
        dragElastic={0.3}
        onDragEnd={onDragEnd}
    >
        {children}
    </motion.div>
)

const Carousel = ({ children }: { children: React.ReactNode }) => {
    const x = useMotionValue(0)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [index, setIndex] = React.useState(0)

    const calculateNewX = () =>
        -index * (containerRef.current?.clientWidth || 0)

    const handleEndDrag = (e: Event, dragProps: PanInfo) => {
        const clientWidth = containerRef.current?.clientWidth || 0

        const { offset } = dragProps

        if (offset.x > clientWidth / 4) {
            setIndex(index - 1)
        } else if (offset.x < -clientWidth / 4) {
            setIndex(index + 1)
        } else {
            animate(x, calculateNewX(), transition)
        }
    }

    React.useEffect(() => {
        const controls = animate(x, calculateNewX(), transition)
        return controls.stop
    }, [index])

    return (
        <Contaier ref={containerRef}>
            {React.Children.toArray(children).map((child, i) => (
                <Slider onDragEnd={handleEndDrag} x={x} i={i}>
                    {child}
                </Slider>
            ))}
        </Contaier>
    )
}

export default Carousel



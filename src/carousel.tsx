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

const Contaier = React.forwardRef<
    HTMLDivElement,
    { children: React.ReactNode }
>((props, ref) => (
    <div ref={ref} style={containerStyle}>
        {props.children}
    </div>
))

type SliderProps = {
    x: MotionValue<number>
    i: number
    children: React.ReactNode
    onDragEnd: (e: Event, dragProps: PanInfo) => void
}
const Slider = ({ x, i, onDragEnd, children }: SliderProps) => (
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

const baseArrowStyle: React.CSSProperties = {
    position: "absolute",
    width: "50px",
    height: "50px",
    backgroundColor: "rgba(0,0,0,0.5)",
    top: "50%",
    transform: "translateY(-50%)",
    borderRadius: "50%",
    color: "#fff",
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
}

type ArrowProps = {
    onClick: () => void
    left?: boolean
    children: React.ReactNode
}

const Arrow = ({ left = false, children, onClick }: ArrowProps) => (
    <div
        onClick={onClick}
        style={{
            ...baseArrowStyle,
            left: left ? "20px" : "initial",
            right: !left ? "10px" : "initial",
        }}
    >
        {children}
    </div>
)

type CarouselProps = {
    children: React.ReactNode
    renderArrowLeft?: (args: {
        handlePrev: () => void
        activeIndex: number
    }) => void
    renderArrowRight?: (args: {
        handleNext: () => void
        activeIndex: number
    }) => void
}
export const Carousel = ({
    children,
    renderArrowLeft,
    renderArrowRight,
}: CarouselProps) => {
    const x = useMotionValue(0)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [index, setIndex] = React.useState(0)

    const calculateNewX = () =>
        -index * (containerRef.current?.clientWidth || 0)

    const handleEndDrag = (e: Event, dragProps: PanInfo) => {
        const clientWidth = containerRef.current?.clientWidth || 0

        const { offset } = dragProps

        if (offset.x > clientWidth / 4) {
            handlePrev()
        } else if (offset.x < -clientWidth / 4) {
            handleNext()
        } else {
            animate(x, calculateNewX(), transition)
        }
    }

    const childrens = React.Children.toArray(children)

    const handleNext = () => {
        setIndex(index + 1 === childrens.length ? index : index + 1)
    }

    const handlePrev = () => {
        setIndex(index - 1 < 0 ? 0 : index - 1)
    }

    React.useEffect(() => {
        const controls = animate(x, calculateNewX(), transition)
        return controls.stop
    }, [index])

    return (
        <Contaier ref={containerRef}>
            {childrens.map((child, i) => (
                <Slider onDragEnd={handleEndDrag} x={x} i={i}>
                    {child}
                </Slider>
            ))}
            {renderArrowLeft ? (
                renderArrowLeft({ handlePrev, activeIndex: index })
            ) : (
                <Arrow left onClick={handlePrev}>
                    &larr;
                </Arrow>
            )}

            {renderArrowRight ? (
                renderArrowRight({ handleNext, activeIndex: index })
            ) : (
                <Arrow onClick={handleNext}>&rarr;</Arrow>
            )}
        </Contaier>
    )
}

export default Carousel
import * as React from "react"
import {
    animate,
    AnimationOptions,
    motion,
    MotionStyle,
    PanInfo,
    useMotionValue,
} from "framer-motion"

import { CarouselProps, CarouselRef } from "./types"
import Arrow from "./arrow"
import Slider from "./slider"
import Dots from "./dots"

const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    overflowX: "hidden",
    display: "flex",
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

export const Carousel = React.forwardRef(
    (
        {
            children,
            renderArrowLeft,
            renderArrowRight,
            renderDots,
            autoPlay = true,
            interval = 2000,
            loop = true,
        }: CarouselProps,
        ref: React.Ref<CarouselRef>
    ) => {
        const x = useMotionValue(0)
        const containerRef = React.useRef<HTMLDivElement>(null)
        const [index, setIndex] = React.useState(0)

        const calculateNewX = () =>
            -index * (containerRef.current?.clientWidth || 0)

        const handleEndDrag = (e: Event, dragProps: PanInfo) => {
            const clientWidth = containerRef.current?.clientWidth || 0

            const { offset } = dragProps

            // fix:https://github.com/jiangbo2015/framer-motion-carousel/issues/11
            // stop start slide and end slide move
            if (
                (index + 1 === childrens.length && offset.x < 0) ||
                (index === 0 && offset.x > 0)
            ) {
                animate(x, calculateNewX(), transition)
                return
            }

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
            const idx = loop ? 0 : index
            setIndex(index + 1 === childrens.length ? idx : index + 1)
        }

        const handlePrev = () => {
            const idx = loop ? childrens.length - 1 : 0
            setIndex(index - 1 < 0 ? idx : index - 1)
        }

        React.useEffect(() => {
            const controls = animate(x, calculateNewX(), transition)
            return controls.stop
        }, [index])

        React.useEffect(() => {
            if (!autoPlay) {
                return
            }
            const timer = setInterval(() => handleNext(), interval)
            return () => clearInterval(timer)
        }, [handleNext, interval])

        React.useImperativeHandle(
            ref,
            () => {
                return {
                    handleNext,
                    handlePrev,
                    setIndex,
                }
            },
            [index]
        )

        return (
            <Contaier ref={containerRef}>
                {childrens.map((child, i) => (
                    <Slider
                        onDragEnd={handleEndDrag}
                        totalSliders={childrens.length}
                        x={x}
                        i={i}
                        key={i}
                    >
                        {child}
                    </Slider>
                ))}
                {/* left arrow */}
                {renderArrowLeft ? (
                    renderArrowLeft({ handlePrev, activeIndex: index })
                ) : (
                    <Arrow left onClick={handlePrev}>
                        &larr;
                    </Arrow>
                )}

                {/* right arrow */}
                {renderArrowRight ? (
                    renderArrowRight({ handleNext, activeIndex: index })
                ) : (
                    <Arrow onClick={handleNext}>&rarr;</Arrow>
                )}

                {/* dots */}
                {renderDots ? (
                    renderDots({ setActiveIndex: setIndex, activeIndex: index })
                ) : (
                    <Dots
                        length={childrens.length}
                        setActiveIndex={setIndex}
                        activeIndex={index}
                    />
                )}
            </Contaier>
        )
    }
)

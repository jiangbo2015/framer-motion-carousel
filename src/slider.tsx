
import React from 'react'
import { motion, MotionStyle } from 'framer-motion'
import { SliderProps } from './types'

const pageStyle: MotionStyle = {
    width: "100%",
    height: "100%",
    display: "inline-block",
    flex: "none",
}

const Slider = ({ x, i, onDragEnd, children, totalSliders }: SliderProps) => (
    <motion.div
        style={{
            ...pageStyle,
            x,
            left: `${i * 100}%`,
            right: `${i * 100}%`,
        }}
        drag={totalSliders > 1 && "x"}
        dragElastic={0.3}
        onDragEnd={onDragEnd}
    >
        {children}
    </motion.div>
)

export default Slider
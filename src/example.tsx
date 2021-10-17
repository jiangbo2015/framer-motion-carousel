import * as React from 'react'
import { Carousel } from './carousel'

const colors = ["#f90", "#ef0", "#e0f"]

const App = () => (
    <Carousel>
        {colors.map((item, i) => (
            <div
                key={i}
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: colors[i],
                }}
            ></div>
        ))}
    </Carousel>
)
export default App
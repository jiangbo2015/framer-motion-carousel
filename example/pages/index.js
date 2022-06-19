import Carousel from "framer-motion-carousel"

const colors = ["#f90", "#ef0", "#e0f"]

const App = () => (
    <>
        <h2 style={{ textAlign: "center" }}>colors carousel</h2>
        <div style={{ width: 600, height: 400, margin: "0 auto" }}>
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
        </div>
        <h2 style={{ textAlign: "center" }}>images carousel</h2>
        <div style={{ width: 600, height: 400, margin: "0 auto" }}>
            <Carousel>
                {[1, 2, 3, 4].map((item, i) => (
                    <img
                        draggable="false"
                        src={`./${item}.jpeg`}
                        key={i}
                        width="100%"
                        alt=""
                    />
                ))}
            </Carousel>
        </div>
    </>
)
export default App

# framer-motion-carousel

A simple `framer-motion-carousel`, used for `framer-motion`, `chakra-ui`
support `click` and `swipe`, support custom `arrows`, `dots`, easy to use.

*2.x use `framer-motion@6` now*

## Basic Usage

```jsx
import * as React from "react";
import Carousel from "framer-motion-carousel";

const colors = ["#f90", "#ef0", "#e0f"];

const App = () => (
  <div style={{ width: 600, height: 400 }}>
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
);
export default App;
```

## images carousel

`img` element should add `draggable=false`

```jsx
<div style={{ width: 600, height: 400, margin: "0 auto" }}>
  <Carousel>
    {[1, 2, 3, 4].map((item, i) => (
      <img
        draggable="false"
        src={`./${item}.jpg`}
        key={i}
        width="100%"
        alt=""
      />
    ))}
  </Carousel>
</div>
```

## use external control button

```jsx
// set ref;
const carouselRef = React.useRef();

<div style={{ width: 600, height: 400, margin: "0 auto" }}>
    <div style={{display: 'flex', gap: '10px', marginBottom: '10px'}}>
        <button onClick={() => carouselRef.current.handlePrev()}>handlePrev</button>
        <button onClick={() => carouselRef.current.setIndex(2)}>goto index 2</button>
        <button onClick={() => carouselRef.current.handleNext()}>handleNext</button>
    </div>
    <Carousel ref={carouselRef} autoPlay={false}>
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
```

## Example

[Live Demo](https://carousel-app-772051431.vercel.app)

[example repo](https://github.com/jiangbo2015/framer-motion-carousel/tree/main/example)

![example](https://cdn.jsdelivr.net/gh/jiangbo2015/framer-motion-carousel/img.jpg)


## props

| props            | type                                                                                 | default | description                                                          |
|------------------|--------------------------------------------------------------------------------------|---------|----------------------------------------------------------------------|
| loop             | boolean                                                                              | true    | loop play                                                            |
| autoPlay         | boolean                                                                              | true    | auto play                                                            |
| interval         | number                                                                               | 2000    | auto play interval                                                   |
| renderArrowLeft  | ({handlePrev: () => void, activeIndex: number}) => React.ReactNode                   | null    | custom your arrows, `activeIndex` is current index                   |
| renderArrowRight | ({handleNext: () => void, activeIndex: number}) => React.ReactNode                   | null    | custom your arrows, `activeIndex` is current index                   |
| renderDots       | ({activeIndex: number, setActiveIndex: (index: number) => void;}) => React.ReactNode | null    | custom your dots, `activeIndex` is current index                     |
| ref              | React.Ref                                                                            | null    | Carousel ref, support `handleNext`, `handlePrev`, `setIndex` method |



## example

```
cd example && yarn install

yarn dev
```
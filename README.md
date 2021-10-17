# framer-motion-carousel

A simple framer-motion-carousel

## Basic Usage

```jsx
import * as React from 'react'
import Carousel from 'framer-motion-carousel'

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
```

## Example

![example](img.jpg)

## Use your arrows

```
renderArrowLeft: ({handlePrev, activeIndex}) => React.ReactNode
```

```
renderArrowRight: ({handleNext, activeIndex}) => React.ReactNode
```

```jsx
const App = () => (
  <Carousel renderArrowLeft={({handlePrev, activeIndex}) => <div />}>
    ...
  </Carousel>
)
```

## Todo

- dots
- custom dots


## Development

```
yarn install

yarn build
```
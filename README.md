# React Use PDF

Use PDFs in your React app as easily as if they were components.

This library has only about 80 lines of code, but it can display huge pdfs very easily.

I made this for personal use, so props like handlers and scale are not yet prepared, but I will implement them if there
are other users.

### Installation

Add React-Use-PDF to your project by executing `npm install react-use-pdf` or `yarn add react-use-pdf`.

### Usage

Here's the simplest example of usage.

```typescript jsx
import usePDF from "../react-use-pdf";

export function Simple() {
    const pdf = usePDF('./sample.pdf')
    return (
        <div>
            {pdf && pdf.map((pages, index) =>
                <pages.canvas key={index} {...pages.props}/>
            )}
        </div>
    )
}
```

Combined with swiper, even pdfs with hundreds of pages can be displayed seamlessly.

This example also specifies the style to fit the pdf to screen while maintaining aspect ratio.

```typescript jsx
import usePDF from "../react-use-pdf";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Virtual} from 'swiper';

import 'swiper/css';

export function Swipeable() {
    const pdf = usePDF('./sample.pdf')

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
        }}>
            {pdf === undefined ?
                <h1>Loading PDF...</h1> :
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    modules={[Virtual]}
                    virtual
                >
                    {pdf.map((page, index) => {
                        return (
                            <SwiperSlide key={index} virtualIndex={index}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100vh',
                                    width: '100vw'
                                }}>
                                    <page.canvas {...page.props} style={{maxHeight: '100%', maxWidth: '100%'}}/>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>}
        </div>
    )
}
```
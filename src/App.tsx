import usePDF from "./react-use-pdf";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Virtual} from 'swiper';

import 'swiper/css';

function App() {
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
                            <SwiperSlide key={page.pageNumber} virtualIndex={index}>
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

export default App

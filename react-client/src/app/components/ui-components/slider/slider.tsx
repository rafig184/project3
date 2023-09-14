
import { useState, useEffect } from 'react';
import { Carousel, CarouselResponsiveOption } from 'primereact/carousel';
import { partnersArray } from './partnersArray';


interface Partners {
    name: string;
    image: string;
}

export default function PartnersSlider() {
    const [partners, setPartners] = useState<Partners[]>([]);
    const responsiveOptions: CarouselResponsiveOption[] = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];



    useEffect(() => {
        for (let index = 0; index < partnersArray.length; index++) {
            setPartners(partnersArray.slice(0, 14))
        }
    }, []);

    const partnersTemplate = (partners: Partners) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                <div className="mb-3">
                    <img height={"120px"} src={partners.image} alt={partners.name} className="w-6 shadow-2" />
                </div>
                <div>
                    <h4 style={{ color: "#0F3244" }} className="mb-1">{partners.name}</h4>
                </div>
            </div>
        );
    };

    return (
        <div className="slider">
            <h2 style={{ color: "#0F3244" }}>Our Bussines Partners</h2>
            <Carousel value={partners} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} className="custom-carousel" circular
                autoplayInterval={3000} itemTemplate={partnersTemplate} />
        </div>
    )
}

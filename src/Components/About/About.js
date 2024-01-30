import { Hero } from "../Hero/Hero"
import killeenpic4 from '../../assets/images/killeenpic4.jpeg'
import killeenpic3 from '../../assets/images/killeenpic3.jpg'
import killeenpic6 from '../../assets/images/killeenpic6.jpeg'
import killeenpic8 from '../../assets/images/killeenpic8.jpg'
import verticalIMG1 from '../../assets/images/592x822/verticalIMG1.jpg'
import verticalIMG2 from '../../assets/images/592x822/verticalIMG2.jpeg'
import verticalIMG3 from '../../assets/images/592x822/verticalIMG3.jpeg'
import verticalIMG4 from '../../assets/images/592x822/verticalIMG4.jpg'
import './About.css';

export const About = () => {
    return (
        <div>
            <section className="dark:bg-deepCarolina">
                <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:pb-16 lg:px-6">
                    <div className="font-light text-white sm:text-lg">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Joe Killeen</h2>
                        <p className="mb-4">Donec porttitor, enim ut dapibus lobortis, lectus sem tincidunt dui, eget ornare lectus ex non
                                        libero. Nam rhoncus diam ultrices porttitor laoreet. Ut mollis fermentum ex, vel viverra lorem
                                        volutpat sodales. In ornare porttitor odio sit amet laoreet. Sed laoreet, nulla a posuere
                                        ultrices, purus nulla tristique turpis, hendrerit rutrum augue quam ut est. Fusce malesuada
                                        posuere libero, vitae dapibus eros facilisis euismod. Sed sed lobortis justo, ut tincidunt
                                        velit. Mauris in maximus eros.
                        </p>
                        <p>Donec porttitor, enim ut dapibus lobortis, lectus sem tincidunt dui, eget ornare lectus ex non
                                        libero.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <img className="w-full rounded-lg" src={verticalIMG4} alt="office content 1" />
                        <img className="mt-4 w-full lg:mt-10 rounded-lg" src={verticalIMG2} alt="office content 2" />
                    </div>
                </div>
            </section>

            <section className="dark:bg-white">
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:pb-16 lg:px-6">
                    
                    <div className="order-2 lg:order-1">
                        <div className="grid grid-cols-2 gap-4 lg:mt-8">
                            <img className="w-full rounded-lg" src={verticalIMG1} alt="content 1" />
                            <img className="mt-4 w-full lg:mt-10 rounded-lg" src={verticalIMG3} alt="content 2" />
                        </div>
                    </div>
                    
                    <div className="order-1 lg:order-2 font-light text-deepCarolina sm:text-lg">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-carolina">Joe Killeen Memorial Foundation</h2>
                        <p className="mb-4">Donec porttitor, enim ut dapibus lobortis, lectus sem tincidunt dui, eget ornare lectus ex non
                                        libero. Nam rhoncus diam ultrices porttitor laoreet. Ut mollis fermentum ex, vel viverra lorem
                                        volutpat sodales. In ornare porttitor odio sit amet laoreet. Sed laoreet, nulla a posuere
                                        ultrices, purus nulla tristique turpis, hendrerit rutrum augue quam ut est. Fusce malesuada
                                        posuere libero, vitae dapibus eros facilisis euismod. Sed sed lobortis justo, ut tincidunt
                                        velit. Mauris in maximus eros.
                        </p>
                        <p>Donec porttitor, enim ut dapibus lobortis, lectus sem tincidunt dui, eget ornare lectus ex non
                                        libero.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

/*
<svg className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                            fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                            <polygon points="50,0 100,0 50,100 0,100"></polygon>
                        </svg>*/
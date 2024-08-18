import RedirectButton from "../redirectButton/RedirectButton.jsx";
import gif from '../../../assets/imgs/hero.gif'
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import UseWindowResolution from "../../../hooks/useWindowResolution.jsx";
import './hero.scss'

const Hero = () => {
    const resolution = UseWindowResolution()

    return (
        <section id="hero">
            <div className="hero-titles-container">
                <h1 className="hero-title">La Candelaria III - Express -</h1>
                <h2>Disfruta de una auténtica parrilla Argentina</h2>
                <div className="circle"></div>
            </div>
            <div className="hero-buttons">
                <RedirectButton link={'/ecommerce'} variant={'outlined'}>Hace tu pedido</RedirectButton>
                <RedirectButton link={'/menu'} variant={'outlined'}>Menú</RedirectButton>
            </div>
            {resolution < 768 ? (
                <div className="arrow-container">
                    <MdKeyboardDoubleArrowDown/>
                </div>
            ) : (
                <div className="img-container" > </div>
            )}
        </section>
)
}
export default Hero
import RedirectButton from "../redirectButton/RedirectButton.jsx";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import UseWindowResolution from "../../../hooks/UseWindowResolution.jsx";
import './hero.scss'

const Hero = () => {
    const resolution = UseWindowResolution()

    return (
        <section id="hero">
            <div className="hero-titles-container">
                <h1 className="hero-title">La Candelaria III</h1>
                <h2>- Express -</h2>
                <h3>Disfruta de una auténtica parrilla Argentina</h3>
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
                <div className="img-container"> </div>
            )}
        </section>
)
}
export default Hero
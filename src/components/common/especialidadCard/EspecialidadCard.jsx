import './especialidadCard.scss'
// import vacioImg from '../../../assets/imgs/1.png'

const EspecialidadCard = ({left}) => {
    return (
        <div className='especialidadCard'>
            <div className="especialidadCard-img">
                <div className='circle'>
                    {/*<img src={vacioImg} alt=""/>*/}
                </div>
            </div>
            <div className={left ? "especialidadCard-content contentLeft" : "especialidadCard-content"}>
                <h3>Vacío al asador</h3>
                <p>Carne elaborada a las leñas con cocción lenta acompañada con ensalada de la huerta</p>
            </div>
        </div>
    )
}

export default EspecialidadCard
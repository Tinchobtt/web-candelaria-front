import './especialidadCard.scss'

const EspecialidadCard = ({left, especialidad}) => {
    return (
        <div className='especialidadCard'>
            <div className="especialidadCard-img">
                <div className='circle'>
                    <img src={especialidad.image} alt={especialidad.title}/>
                </div>
            </div>
            <div className={left ? "especialidadCard-content contentLeft" : "especialidadCard-content"}>
                <h3>{especialidad.title}</h3>
                <p>{especialidad.description}</p>
            </div>
        </div>
    )
}

export default EspecialidadCard
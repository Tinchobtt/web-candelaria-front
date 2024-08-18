import './especialidades.scss'

const Especialidades = ({title, children}) => {
    return (
        <section id='especialidades'>
            <div className="zs">
                <div className="zocalo zsi"></div>
                <div className="zocalo zsd"></div>
            </div>
            <div className="especialidades-content">
                <h2>{title}</h2>
                {children}
            </div>
            <div className="zi">
                <div className="zocalo zii"></div>
                <div className="zocalo zid"></div>
            </div>
        </section>
    )
}

export default Especialidades;
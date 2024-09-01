import './carta.scss'
const Carta = ({title, children}) => {
  return (
    <section className='carta'>
        <div className="zs">
            <div className="zocalo zsi"></div>
            <div className="zocalo zsd"></div>
        </div>
        <div className="menu-title">
            <h2>{title}</h2>
            <div className="divider">
                <span className="divider-line"></span>
                <span className="divider-circle"></span>
                <span className="divider-line"></span>
            </div>
        </div>
        {children}
        <div className="zi">
            <div className="zocalo zii"></div>
            <div className="zocalo zid"></div>
        </div>
    </section>
  )
}

export default Carta
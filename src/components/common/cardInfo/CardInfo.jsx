import './cardInfo.scss'


const CardInfo = ({left, content}) => {
    return (
        <div className={left ? 'cardInfo' : 'cardInfo imageRight'}>
            <div className="cardInfo-img">
                <img src={content.img} alt={content.title} className={left ? 'borderLeft' : 'borderRight'} />
            </div>
            <div className={left ? 'cardInfo-content borderLeft' : 'cardInfo-content borderRight'}>
                <div className="cardInfo-title">
                    <h2>{content.title}</h2>
                </div>
                <div className="cardInfo-text">
                    <p dangerouslySetInnerHTML={{__html: content.text}}/>
                </div>
            </div>
        </div>
    )
}

export default CardInfo
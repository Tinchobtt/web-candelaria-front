const StateCircle = ({state}) => { 
  return (
    <div className="outer-circle" style={
        { 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: '1rem', 
            height: '1rem', 
            border: `1px solid ${state ? '#0f0' : 'red'}`, 
            borderRadius: '100%'
        }}>
        <div className="inner-circle" style={{
            width: '8px', 
            height: '8px', 
            borderRadius: '100%',
            backgroundColor: `${state ? '#0f0' : 'red'}`
        }}>
        </div>
    </div>
  )
}

export default StateCircle
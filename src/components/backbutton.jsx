import "../styles/backbutton.css"
export const BackButton = ({icon,label,onCloseAction}) => {
    return (
          <div className="backbutton-body">
              <div className="backbutton-icon">
                <button className="backbutton" onMouseDown={onCloseAction}>
                  <h2>{icon}</h2>
                </button>
              </div>
              <div className="backbutton-label">
                <h2>{label}</h2>
              </div>
         </div>
      
    );
};

export const PageHeader = ({label}) => {
  return (
        <div className="backbutton-body">
            <div className="backbutton-label">
              <h2>{label}</h2>
            </div>
       </div>
    
  );
};
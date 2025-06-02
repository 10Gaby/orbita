import { useEffect} from 'react';
import '../css/popup.css'; // Archivo CSS para los estilos

const PopUp = ({ isOpen, onClose, title, image, children }) => {
  // Cerrar el popup al presionar Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close-btn" onClick={onClose}>
          &times;
        </button>
        
        {image && (
          <div className="popup-image-container">
            <img src={image} alt={title || 'Popup image'} className="popup-image" />
          </div>
        )}
        
        <div className="popup-content">
          {title && <h4 className="popup-title color-gradient">{title}</h4>}
          {children}
        </div>
      </div>
    </div>
  );
};

export default PopUp;
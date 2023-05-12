import { useEffect } from "react";

const Popup = ({ isOpen, name, onClose, children }) => {
// внутри указываем `useEffect` для обработчика `Escape`
  useEffect(() => {
    // ограничиваем навешивание обработчика: если не открыт, то не нужно навешивать
    if (!isOpen) return;
// объявляем внутри `useEffect` функцию, чтобы она не теряла ссылку при перерисовке компонента
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }
 
    document.addEventListener('keydown', closeByEscape)
    // обязательно удаляем обработчик в `clean-up` функции
    return () => document.removeEventListener('keydown', closeByEscape)
// обязательно следим за `isOpen`, чтобы срабатывало только при открытии, а не всегда
}, [isOpen, onClose])
 
// создаем обработчик оверлея
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
  }
 
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""} popup_type_${name}`}
      onMouseDown={handleOverlay}
    >
      <div className='popup__content'>
        {children}
        <button
          type="button"
          name="button_form_close"
          id="button_form-add_close"
          className="popup__close-button"
          aria-label="Закрыть форму"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default Popup;
import { useEffect } from "react";

function HandlerCloseByEsc(props) {
  useEffect(() => {
    function closeByEsc(evt) {
      if (evt.key === 'Escape') {
        props.onClose();
      }
    }

    document.addEventListener('keydown', closeByEsc);

    return () => {
      document.removeEventListener('keydown', closeByEsc)
    }
  });
}

export default HandlerCloseByEsc;
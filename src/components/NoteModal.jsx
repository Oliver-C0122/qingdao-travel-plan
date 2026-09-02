import { useEffect, useRef } from "react";

function NoteModal({ note, onClose }) {
  const confirmRef = useRef(null);

  useEffect(() => {
    if (note && confirmRef.current) {
      confirmRef.current.focus();
    }
  }, [note]);

  if (!note) return null;

  return (
    <div
      className="note-modal"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div className="note-card" role="dialog" aria-modal="true" aria-labelledby="noteTitle">
        <button
          className="icon-button note-close"
          type="button"
          aria-label="关闭"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 id="noteTitle">{note.title}</h2>
        <p>{note.body}</p>
        <button ref={confirmRef} className="primary-button" type="button" onClick={onClose}>
          知道了
        </button>
      </div>
    </div>
  );
}

export default NoteModal;

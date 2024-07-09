/* eslint-disable react/prop-types */

function PopupMsg({ popupMsg }) {
  return (
    <div className="popup">
      <p className="popup-message">{popupMsg}</p>
      <i className="fa-solid fa-check"></i>
    </div>
  );
}

export default PopupMsg;

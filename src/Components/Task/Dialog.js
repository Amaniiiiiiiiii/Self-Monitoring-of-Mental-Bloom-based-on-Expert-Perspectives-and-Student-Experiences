import "./Dialog.css";

function Dialog(props) {
  const handleContinue = props.handleContinue;
  return (
    <div className="dialog-container">
      <div className="dialog">
        <label className="form-dialog-label">{props.dialogMessage}</label>
        {props.showInput && (
            <input
              type="text"
              placeholder="Enter your feedback"
              className="dialog-input"
            />
        )}
        <div className="dialog-button-container">
          <button className="dialog-button" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dialog;

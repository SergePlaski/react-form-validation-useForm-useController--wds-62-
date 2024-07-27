import { PropTypes } from "prop-types";

// FormGroup component wraps a label and input elements
// and facilitates displaying the error message if input validation fails
export function FormGroup({ errorMessage = "", children }) {
	return (
		<div className={`form-group ${errorMessage.length > 0 ? "error" : ""}`}>
			{children}
			{errorMessage.length > 0 && <div className='msg'>{errorMessage}</div>}
		</div>
	);
}

FormGroup.propTypes = {
	errorMessage: PropTypes.string,
	children: PropTypes.node,
};

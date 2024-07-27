// Form validation implemented here using react-hook-form library.
// Input validation for `email` and `password` inputs
// is performed using useForm() hook.
// An external React-Select component is used for Country dropdown list.'
// Input validation for `country` select input
// is performed using useController() hook

import { useController, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { FormGroup } from "./FormGroup";

const COUNTRY_OPTIONS = [
	{ label: "United States", value: "US" },
	{ label: "India", value: "IN" },
	{ label: "Mexico", value: "MX" },
];

export function FormValidation() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm();

	// with useController hook, we use:
	// field (instead of register); we also specify the field name here;
	// name (translated to id ?);
	// control (exported by useFom hook) - links the field with
	// the form and its validation functionality;
	// rules object (instead of validation object);
	// for each validation rule we have a name and message.
	// NOTE: per current documentation, it seems this is the recommended validation method now.
	const { field: countryField } = useController({
		name: "country",
		control,
		rules: { required: { value: true, message: "Required" } },
	});

	function onSubmit(data) {
		// at this point, all validation is done and passed,
		// otherwise we would not arrive here.
		// data object contains objects representing each registered input
		// (data.email, data.password, data.country).
		console.log(data);
		alert("Success");
	}

	// Here we use register() function exported by useForm() hook.
	// We pass the input id AND an options object that defines
	// the validation rules for this input.
	// register() spreads a bunch of form props, such as value={}, onSubmit={}, etc.

	// Note that validation is performed one rule at a time,
	// and the errors.message for the particular input is set
	// to the message of first failing validation rule (required, minLength, validate)
	return (
		<form onSubmit={handleSubmit(onSubmit)} className='form'>
			<FormGroup errorMessage={errors?.email?.message}>
				<label className='label' htmlFor='email'>
					Email
				</label>
				<input
					className='input'
					type='email'
					id='email'
					{...register("email", {
						required: { value: true, message: "Required" },
						validate: value => {
							if (!value.endsWith("@test.com")) {
								return "Must end with @test.com"; // return error message
							}
						},
					})}
				/>
			</FormGroup>
			<FormGroup errorMessage={errors?.password?.message}>
				<label className='label' htmlFor='password'>
					Password
				</label>
				<input
					className='input'
					type='password'
					id='password'
					{...register("password", {
						required: { value: true, message: "Required" },
						minLength: {
							value: 10,
							message: "Must be at least 10 characters long",
						},
						validate: {
							hasLowerCase: value => {
								if (!value.match(/[a-z]/)) {
									return "Must contain at least one lowercase letter";
								}
							},
							hasUpperCase: value => {
								if (!value.match(/[A-Z]/)) {
									return "Must contain at least one uppercase letter";
								}
							},
							hasNumber: value => {
								if (!value.match(/[0-9]/)) {
									return "Must contain at least one numeric character";
								}
							},
						},
					})}
				/>
			</FormGroup>
			<FormGroup errorMessage={errors?.country?.message}>
				<label className='label' htmlFor='country'>
					Country
				</label>
				{/* 
					Note: id property here sets the id of the wrapper <div> (when rendered).
					inputId sets the name property of the rendered <select>.
					This way, the label is still linked corecltly (by name) 
					and does not cause the render issues reported by browser.
					IMPORTANT: id and inputId must have different values.

					CUSTOM STYLING is done by including the `styles` prop as below. 
          https://react-select.com/styles
          As an option, the `unstyled` prop removes all the presentational styles 
          from React Select (leaving some important functional styles, 
          like those for menu positioning and input width in multi select).
				*/}
				<ReactSelect
					isClearable
					classNamePrefix='react-select'
					id='select-country'
					inputId='country'
					styles={{
						container: baseStyles => ({
							...baseStyles,
							fontSize: "0.9rem",
						}),
						valueContainer: baseStyles => ({
							...baseStyles,
							fontSize: "inherit",
						}),
						option: (baseStyles, state) => ({
							...baseStyles,
							fontSize: "inherit",
							fontWeight: state.isFocused ? "bold" : "normal",
							color: "#333",
							backgroundColor: state.isFocused ? "orange" : "inherit",
						}),
					}}
					options={COUNTRY_OPTIONS}
					{...countryField}
				/>
			</FormGroup>
			<button className='btn' type='submit'>
				Submit
			</button>
		</form>
	);
}

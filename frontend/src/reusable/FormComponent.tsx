import axios from "axios";

type FormComponentProps = {
	type: "signup" | "signin";
};

function FormComponent({ type }: FormComponentProps) {
	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const inputValues = {
			email: formData.get("email") as string,
			password: formData.get("password") as string,
		};

		if (type === "signup") {
			console.log(`i have reached here for the signup form `);
			axios
				.post(
					`http://localhost:3000/user/signup`,
					{
						...inputValues,
					},
					{
						withCredentials: true,
					}
				)
				.then((response) => {
					alert(response.data.message);
				})
				.catch((error) => {
					console.log(error.message);
				});
		} else if (type === "signin") {
			axios
				.post(`http://localhost:3000/user/login`, inputValues, {
					withCredentials: true,
				})
				.then((response) => {
					alert(response.data.message);
				})
				.catch((error) => {
					console.log(error.message);
				});
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className=" flex flex-col  rounded-sm w-1/3 mx-auto flex-start gap-3 justify-start mt-[5rem] "
		>
			<label htmlFor="emailInput" className=" text-left ">
				Email
			</label>
			<input
				type="email"
				name="email"
				id="emailInput"
				className="border-2  border-stone-500 px-2 py-2  rounded-md"
				placeholder="email..."
			/>

			<label htmlFor="passwordInput" className="text-left">
				Password
			</label>

			<input
				type="password"
				name="password"
				id="passwordInput"
				className="border-2  border-stone-500 px-2 py-2 rounded-md"
				placeholder="password..."
			/>
			<button className="border-2 px-1 py-2 bg-stone-900 text-white rounded-md hover:bg-stone-700 transition-all">
				{type === "signup" ? "Sign Up" : "Sign In"}
			</button>
		</form>
	);
}

export default FormComponent;

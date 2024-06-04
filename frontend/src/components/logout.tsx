import axios from "axios";
import React from "react";

type Userinfo = {
	email: string;
	id: string;
};
function Logout() {
	const [userDetails, setUserDetails] = React.useState<Userinfo>();
	const [logStatus, setLogStatus] = React.useState<boolean>();

	function handleLogout(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();

		axios
			.post(
				`http://localhost:3000/user/logout`,
				{},
				{
					withCredentials: true,
				}
			)
			.then(() => {
				setLogStatus(false);
			})
			.catch((e) => {
				console.log(e.message);
			});
	}

	React.useEffect(() => {
		axios
			.get(`http://localhost:3000/user/userdetails`, {
				withCredentials: true,
			})
			.then((response) => {
				setUserDetails(response.data);
			});
	}, []);
	return (
		<main>
			<section>
				<h5>User Details</h5>
				<p> User's emaid ID : {userDetails?.email} </p>
				<p> User ID : {userDetails?.id} </p>

				<p>Log Status : {logStatus ? "Currently logged In" : "logged Out"}</p>
			</section>
			<button
				onClick={handleLogout}
				className="border-2 px-1 py-2 bg-stone-900 text-white rounded-md hover:bg-stone-700 transition-all"
			>
				Log Out
			</button>
		</main>
	);
}

export default Logout;

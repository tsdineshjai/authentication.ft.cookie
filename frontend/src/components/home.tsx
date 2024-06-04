import { NavLink } from "react-router-dom";

function Home() {
	return (
		<section className="flex flex-col justify-center items-center gap-5 h-screen ">
			<h3 className="font-mono text-xl">
				This is the home page. Kindly navigate as per your requirements
			</h3>

			<NavLink
				to="/signup"
				className="border rounded-md bg-slate-600 text-white px-3 py-2"
			>
				{" "}
				Signup
			</NavLink>
			<NavLink
				to="/login"
				className="border rounded-md bg-slate-600 text-white px-3 py-2"
			>
				{" "}
				login
			</NavLink>
			<NavLink
				to="/logout"
				className="border rounded-md bg-slate-600 text-white px-3 py-2"
			>
				{" "}
				logout
			</NavLink>
		</section>
	);
}

export default Home;

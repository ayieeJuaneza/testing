import { Navigate } from "react-router-dom";
import UserContext from "../UserContext"
import { useContext, useEffect } from "react"

export default function Signout(){


	const { unsetUser, setUser } = useContext(UserContext);

	unsetUser();

	useEffect(() => {
		setUser({
			RoleIdx: null
		});
	})
	return(
		<Navigate to="/" />
		);
}
import { useContext, useRef, useEffect, useState } from "react";
import "./conversation.css"
import axios from "axios";

export default function Conversation({conversation, currentUser}) {
	const [user, setUser] = useState(null);

	useEffect(()=>{
		const friendId = conversation.members.find((m) => m !== currentUser._id);
		const getUser = async () => {
			try{
				const res = await axios("/users?userId=" + friendId);
				setUser(res.data);
			}
			catch (err) {
				console.log(err);
			}
		};
		getUser();
	}, [currentUser, conversation]);

	return(
		<>
			<div className="conversation">
				<img className="conversationImg" src="http://placehold.it/120x120&text=image4" />
				<span className="conversationName">{user ? user.username  : ''}</span>
				
			</div>
		</>

	);
}
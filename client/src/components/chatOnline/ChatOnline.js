import { useContext, useRef, useState, useEffect } from "react";
import "./chatOnline.css"
import axios from "axios";

export default function ChatOnline({onlineUsers, currentId, setCurrentChat}) {
	const [ friends, setFriends ] = useState([]);
	const [ onlineFriends, setOnlineFriends ] = useState([]);

	useEffect(()=>{
		const getFriends = async () => {
			try{
				const res =  await axios.get("/users/friends/" + currentId);
				setFriends(res.data);
			}
			catch (err) {
				console.log(err);
			}
		};
		getFriends()
	}, [currentId]);

	useEffect(()=>{
		setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
	}, [friends, onlineUsers]);

	const handleClick = async (user) => {
		try{
			const res =  await axios.get(`/conversations/find/${currentId}/${user._id}`);
			setCurrentChat(res.data);
		}
		catch (err) {
			console.log(err);
		}
	};

	return(
		<div className="chatOnline">
			{onlineFriends.map(o => (
				<div className="chatOnlineFriend" onClick={() => handleClick(o)}>
					<div className="chatOnlineImgContainer">
						<img className="chatOnlineImg" src="http://placehold.it/120x120&text=image4" />
						<div className="chatOnlineBadge"></div>
					</div>
					<span className="chatOnlineName">{o.username}</span>
			
				</div>
			))}
		</div>
	);
}
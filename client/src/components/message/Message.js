import { useContext, useRef } from "react";
import "./message.css"
import { format } from "timeago.js";

export default function Message({message, own}) {
	return(
		<>
			<div className={own ? "message own" : "message"}>
				<div className="messageTop">
					<img className="messageImg" src="http://placehold.it/120x120&text=image4" />
					<p className="messageText">{message.text}</p>
				</div>
				<div className="messageBottom">
					{format(message.createdAt)}
				</div>
			</div>
		</>

	);
}
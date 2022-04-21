import React from 'react';
import Datetime1 from './Datetime1';

//const RoomContext = React.createCo
const Banner = ({children, title, subtitle}) => {
	 	return(
			
				<div className="banner" style={{overflow: 'scroll', maxHeight: '40rem', zIndex: '103'}}>
					<h1>{title}</h1>
					<div></div>
					<Datetime1 />
					<p>{subtitle}</p>
					<p>Vạn Vật Từ Tâm</p>
					{children}
	 			</div>
			
	 		);

	};
	

export default Banner
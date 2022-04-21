import React from 'react';
import Datetime1 from './Datetime1';

//const RoomContext = React.createCo
const Banner = ({children, title, subtitle}) => {
	 	return(
			
<<<<<<< HEAD
				<div className="banner" style={{overflow: 'scroll', maxHeight: '40rem', zIndex: '103'}}>
=======
				<div className="banner" style={{overflow: 'auto', maxHeight: '40rem', marginTop: '2rem', zIndex: '103'}}>
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
					<h1>{title}</h1>
					<div></div>
					<Datetime1 />
					<p>{subtitle}</p>
<<<<<<< HEAD
					<p>Vạn Vật Từ Tâm</p>
=======
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
					{children}
	 			</div>
			
	 		);

	};
	

export default Banner
import styled from 'styled-components';
<<<<<<< HEAD
=======
import defaultImg from '../images/imgWeather2.jpg';
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
import defaultImg1 from '../images/imgWeather3.jpg';

const StyledHero = styled.header`
/* min-height: 100%; */
min-height: calc(98vh - 58px);
<<<<<<< HEAD
background: url(${props => (props.img ? defaultImg1 :  defaultImg1 )}) center/cover no-repeat;
padding-bottom: 2rem;
/* display: flex;
align-items: center; 

=======
background: url(${props => (props.img ? defaultImg1 :  defaultImg )}) center/cover no-repeat;
/* display: flex;
align-items: center; 
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
justify-content: center; */

`;
export default StyledHero;
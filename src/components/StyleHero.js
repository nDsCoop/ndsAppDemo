import styled from 'styled-components';
import defaultImg1 from '../images/imgWeather3.jpg';

const StyledHero = styled.header`
/* min-height: 100%; */
min-height: calc(98vh - 58px);
background: url(${props => (props.img ? defaultImg1 :  defaultImg1 )}) center/cover no-repeat;
padding-bottom: 2rem;
/* display: flex;
align-items: center; 

justify-content: center; */

`;
export default StyledHero;
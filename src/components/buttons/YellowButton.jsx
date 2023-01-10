import './button.css';
import {useNavigate} from "react-router-dom";

const YellowButton = props => {

    const navigate = useNavigate();

    return (
        <>
            <button onClick={() => navigate(props.path)} type={props.type} className='btn yellowBtn'>{props.children}</button>
        </>
    )
}

export default YellowButton
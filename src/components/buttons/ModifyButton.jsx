import './button.css';

const ModifyButton = (props) => {

    return (
        <>
            <button onClick={props.path} type={props.type} className='btn purpleBtn'>{props.children}</button>
        </>
    )
}

export default ModifyButton

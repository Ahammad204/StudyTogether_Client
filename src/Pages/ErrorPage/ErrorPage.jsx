import error from '../../assets/Error/404.gif'

const Error = () => {
    return (
        <div className='flex justify-center'>
            <img src={error} alt="" />
        </div>
    );
};

export default Error;
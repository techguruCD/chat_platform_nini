const Avatar = ({ imageURL, marginLeft }) => {
    return (
        <div className='user-avatar' style={marginLeft !== undefined ? {marginLeft: marginLeft} : {}}>
            <img src={process.env.PUBLIC_URL + '/avatar/' + imageURL} alt={imageURL} />
        </div>
    )
}

export default Avatar;
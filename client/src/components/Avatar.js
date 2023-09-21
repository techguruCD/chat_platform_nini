const Avatar = ({ imageURL, marginLeft, mine, onDelete, ...props }) => {
    return (
        <div className='user-avatar' style={marginLeft !== undefined ? { marginLeft: marginLeft } : {}}>
            <img src={imageURL} alt={imageURL} {...props} />
            {mine && <div className='delete-btn' onClick={onDelete}>
                <img src='/icons8-delete-trash-100.png'></img>
            </div>}
        </div>
    )
}

export default Avatar;
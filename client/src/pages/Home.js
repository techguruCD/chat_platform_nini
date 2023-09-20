import Avatar from '../components/Avatar';
import './Home.scss';

const Home = () => {
    return (
        <div className='home-container'>
            <div className='message-container'>
                <div className='to-container d-flex'>
                    <div className='to-message-area'>
                        <div className='to-message-address'>
                            <span>To: $MSN Community</span>
                        </div>
                        <div className='to-message-history'></div>
                    </div>
                    <Avatar imageURL={'msn-icon.png'} />
                </div>
                <div className='from-container d-flex'>
                    <div className='from-message-area'>
                        <div className='from-message-address'></div>
                        <div className='from-message-history'></div>
                        <div className='from-message-toolbar'></div>
                    </div>
                    <Avatar imageURL={'frog-icon.png'} />
                </div>
            </div>
        </div>
    );
};

export default Home;
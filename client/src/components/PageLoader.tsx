import { assets } from '../assets/assets';

function PageLoader() {
    return (
        <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-black bg-opacity-50 z-50">
            <img src={assets?.fullpageloader} className="h-24 w-24" alt="Loading..." />
        </div>
    )
}

export default PageLoader
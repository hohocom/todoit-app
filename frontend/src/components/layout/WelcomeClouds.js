import cloud1Img from 'assets/images/cloud2.svg';
import cloud2Img from 'assets/images/cloud3.svg';

function WelcomeClouds(){
    return(
    <>
        <img
          src={cloud1Img}
          alt="img"
          className="absolute left-0 z-10 w-full -bottom-2"
        />
        <img
          src={cloud2Img}
          alt="img"
          className="fixed left-0 z-[-1] w-full -bottom-10"
        />
    </>
    )
}

export default WelcomeClouds
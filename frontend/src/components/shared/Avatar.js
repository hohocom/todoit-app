import { Link } from 'react-router-dom'
import logoImg from '../../assets/images/logo.png'

function Avatar({ styles }) {
  return (
    <div
      className={`flex items-center justify-center w-10 h-10 overflow-hidden 
      bg-gray-100 border-2 border-white rounded-full hover:border-purple-400 transition-all
      ${styles && styles}`}
    >
      <Link to="/">
        <img src={logoImg} alt="avatar" />
      </Link>
    </div>
  )
}

export default Avatar

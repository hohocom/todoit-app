import { Link } from "react-router-dom";

function Avatar({ styles, imagePath, userName }) {
  return (
    <div className="relative">
      <div
        className={`flex items-center justify-center w-10 h-10 overflow-hidden
      bg-gray-100 border-2 border-white rounded-full hover:border-yellow-400 transition-all
        ${styles && styles}`}
      >
        <Link to="/">
          <img src={imagePath} alt="avatar" className="w-10 h-10" />
        </Link>
      </div>

    </div>
  );
}

export default Avatar;

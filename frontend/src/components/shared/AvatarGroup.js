import { useEffect } from 'react'
import Avatar from './Avatar'

function AvatarGroup({ items }) {
  useEffect(() => {}, [])

  return (
    <div className="flex items-end w-auto hover">
      {items.length >= 1 &&
        items.map((user, index) => {
          if (index <= 2) {
            return <Avatar key={index} styles={`-mr-5 z-${20 - index}`} />
          }
        })}
      {items.length >= 4 && (
        <button className="ml-6 hover:text-indigo-500">
          ..외 {items.length - 3}명
        </button>
      )}
    </div>
  )
}
export default AvatarGroup

import WorkspaceLayout from '../../layouts/WorkspaceLayout'
import SockJsClient from 'react-stomp'
import { useRef, useState } from 'react'

function PhotoListPage() {
  const websocket = useRef()

  const [texts, setTexts] = useState([])

  const handleClickSendTo = () => {
    const data = {
      text: 'hellow',
    }
    websocket.current.sendMessage('/sendTo', JSON.stringify(data))
  }

  return (
    <WorkspaceLayout>
      <SockJsClient
        url={`${process.env.REACT_APP_API_URL}/start`}
        topics={['/topics/sendTo', '/topics/template', '/topics/api']}
        onMessage={(msg) => {
          console.log(msg)
          setTexts(texts.concat(msg.text))
        }}
        ref={websocket}
      />
      <button onClick={handleClickSendTo}>SendTo</button>
      <div>
        {texts.map((text, index) => {
          console.log(text)
          return <p key={index}>{text}</p>
        })}
      </div>
    </WorkspaceLayout>
  )
}

export default PhotoListPage

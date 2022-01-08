import copyImg from '.././assets/copy.svg'

export default function RoomCode() {
  return (
    <button className="room-code">
      <div>
        <img src={copyImg} alt="Copiar código da sala" />
      </div>
      <span>Sala #1819159871569</span>
    </button>
  )
}

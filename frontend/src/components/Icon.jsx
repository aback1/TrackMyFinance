export default function Icon({ name, text }) {
  return (
    <>
      <img src={`/src/assets/${name}.png`} alt={name} className="logo" />
      <div className="tooltip">
        <p>{text}</p>
      </div>
    </>
  );
}

export default function Icon({ name }) {
  return <img src={`/src/assets/${name}.png`} alt={name} className="logo" />;
}

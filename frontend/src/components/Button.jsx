export default function ({ onClick, children, type }) {
  return (
    <button className="button" type={type}>
      {children}
    </button>
  );
}

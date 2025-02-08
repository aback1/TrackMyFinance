export default function Button({ onClick, children, type, formId }) {
  return (
    <button
      className="button"
      type={type}
      onClick={onClick}
      {...(formId ? { form: formId } : {})}
    >
      {children}
    </button>
  );
}

export default function Button({ onClick, children, type, formId, className }) {
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      //formID is needed for the linking of the submit form of the Login and Budget TransactionForm
      {...(formId ? { form: formId } : {})}
    >
      {children}
    </button>
  );
}

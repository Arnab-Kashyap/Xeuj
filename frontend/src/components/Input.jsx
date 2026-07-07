function Input({ type, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-600"
    />
  );
}

export default Input;
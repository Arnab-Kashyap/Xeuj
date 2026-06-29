function Input({ type, placeholder }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-600"
    />
  );
}

export default Input;
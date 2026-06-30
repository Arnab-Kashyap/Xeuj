function Card({ children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      {children}
    </div>
  );
}

export default Card;
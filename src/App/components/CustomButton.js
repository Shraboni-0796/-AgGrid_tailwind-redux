function CustomButton({ children, onClick, icon: Icon, ...props }) {
  return (
    <button
      {...props}
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-700 border-[#9B9B9B] hover:border-[#9B9B9B] bg-white hover:bg-gray-100 transition"
      style={{ borderColor: "#9B9B9B" }}
    >
      {Icon && <i class={Icon}></i>}
      <span>{children}</span>
    </button>
  );
}
export default CustomButton;

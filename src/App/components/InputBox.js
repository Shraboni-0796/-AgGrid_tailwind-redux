import React from "react";

function InputBox({ value, placeholder, onChange }) {
  return (
    <div class="relative w-full max-w-xs">
      <input
        type="text"
        class="pl-10 pr-4 py-2 border rounded-lg w-full border-[#9B9B9B] focus:border-[#9B9B9B] focus:ring-0"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <div
        class="absolute inset-y-0 left-0 pl-3 
                    flex items-center 
                    pointer-events-none"
      >
        <i class="fas fa-search text-gray-400"></i>
      </div>
    </div>
  );
}

export default InputBox;

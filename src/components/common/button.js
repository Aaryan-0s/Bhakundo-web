import React from 'react';

export default function Button({ text, onClick }) {
  return (
    <button
      type="submit"
      className="w-full text-xl font-semibold block bg-[#305973] text-white rounded-lg px-4 py-2.5 mt-6 texts"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
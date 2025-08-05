import React from "react";

const DeleteConfirmationModal = ({ open, onClose, onDelete, item }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-60">
      <div className="bg-[#232323] rounded-lg p-6 shadow-lg max-w-sm w-full text-white">
        <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
        <p className="mb-6 text-gray-300">
          Do you really want to delete this {item}? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 cursor-pointer rounded bg-gray-600 hover:bg-gray-700 text-white font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 cursor-pointer rounded bg-red-600 hover:bg-red-700 text-white font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;

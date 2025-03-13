import React from "react";
const StatusModal = ({
  isOpen,
  onClose,
  onConfirm,
  userId,
  actionType,
  name,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-[#1a191f] rounded-lg p-6 w-[400px] shadow-xl border border-[#1a191f]">
        <h2 className="text-[26px] font-bold mb-2 break-words whitespace-normal">
          {actionType === "delete" ? "Xóa người dùng" : "Thay đổi trạng thái"}
        </h2>
        <p className="text-[#C0C0C0] mb-4 break-words whitespace-normal">
          Bạn có chắc chắn muốn{" "}
          {actionType === "delete" ? "xóa" : "thay đổi trạng thái"} {name + " "}
          này?
        </p>
        <p className="text-[#C0C0C0] break-words whitespace-normal">
          ID: <b>{userId}</b>
        </p>

        <div className="flex justify-center mt-[20px] w-full items-center gap-[20px]">
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg w-[115px] h-[45px] text-white ${
              actionType === "delete"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {actionType === "delete" ? "Xóa" : "Áp dụng"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg w-[115px] h-[45px]"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;

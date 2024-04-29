import React from "react";

const ImageModal = ({ isOpen, imageUrl, onClose }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70"
          onClick={onClose}
        >
          <div className="max-w-lg overflow-hidden bg-white rounded-lg shadow-xl">
            <img src={imageUrl} alt="" />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageModal;

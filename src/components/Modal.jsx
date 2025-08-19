import React, { useState, useEffect } from "react";

export default function Modal({ isOpen, onClose, children }) {
  // State baru untuk mengontrol class animasi
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Beri sedikit jeda agar elemennya ada di DOM sebelum animasi dimulai
      const timer = setTimeout(() => setShowModal(true), 10);
      return () => clearTimeout(timer);
    } else {
      setShowModal(false);
    }
  }, [isOpen]);

  // Fungsi untuk menutup modal dengan animasi
  const handleClose = () => {
    setShowModal(false);
    // Beri waktu untuk animasi selesai sebelum memanggil onClose
    setTimeout(onClose, 300); // Durasi harus sama dengan durasi transisi
  };

  if (!isOpen) return null;

  return (
    // Latar belakang gelap
    <div
      className={`fixed inset-0 bg-black z-[9999] flex justify-center items-center p-4 transition-opacity duration-300 ease-in-out
        ${showModal ? "bg-opacity-75" : "bg-opacity-0"}
      `}
      onClick={handleClose}
    >
      {/* Konten Modal */}
      <div
        className={`bg-white rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-md relative transition-all duration-300 ease-in-out
          ${showModal ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

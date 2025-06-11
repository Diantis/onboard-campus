// src/components/DocumentModal.tsx
"use client";

import * as Dialog from "@radix-ui/react-dialog";
import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

interface DocumentModalProps {
  doc: {
    id: string;
    name: string;
    fileUrl: string;
    createdAt: string;
  };
  open: boolean;
  onClose: () => void;
}

export default function DocumentModal({
  doc,
  open,
  onClose,
}: DocumentModalProps) {
  const sigPadRef = useRef<SignatureCanvas>(null);
  const [saving, setSaving] = useState(false);

  const handleSign = async () => {
    const dataUrl = sigPadRef.current?.toDataURL();
    if (!dataUrl) return;
    setSaving(true);
    try {
      await fetch(`/api/documents/${doc.id}/sign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signature: dataUrl }),
      });
      onClose();
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="mt-24 fixed inset-0 overflow-y-auto p-4 flex justify-center items-start">
          <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 w-full max-w-2xl rounded-lg shadow-lg">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold">{doc.name}</h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="h-64">
                <iframe
                  src={doc.fileUrl}
                  className="w-full h-full border border-gray-300 dark:border-gray-600"
                  title={doc.name}
                />
              </div>
              <div>
                <p className="mb-2 font-medium">Votre signature :</p>
                <SignatureCanvas
                  ref={sigPadRef}
                  penColor="black"
                  canvasProps={{
                    className:
                      "w-full h-32 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800",
                  }}
                />
              </div>
            </div>
            <div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700 space-x-2">
              <Dialog.Close asChild>
                <button
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  onClick={onClose}
                >
                  Annuler
                </button>
              </Dialog.Close>
              <button
                onClick={handleSign}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? "Envoi…" : "Signer"}
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

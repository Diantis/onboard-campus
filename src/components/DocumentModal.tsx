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
        <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-auto rounded-lg shadow-lg">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">{doc.name}</h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="h-64">
                <iframe
                  src={doc.fileUrl}
                  className="w-full h-full border"
                  title={doc.name}
                />
              </div>
              <div>
                <p className="mb-2 font-medium">Votre signature :</p>
                <SignatureCanvas
                  ref={sigPadRef}
                  penColor="black"
                  canvasProps={{
                    className: "w-full h-32 border rounded",
                  }}
                />
              </div>
            </div>
            <div className="flex justify-end p-4 border-t space-x-2">
              <Dialog.Close asChild>
                <button
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={onClose}
                >
                  Annuler
                </button>
              </Dialog.Close>
              <button
                onClick={handleSign}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
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

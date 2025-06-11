"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PasswordFieldProps {
  label: string;
  value: string; // not used internally, but kept for API consistency
  onChange: (newPassword: string) => void;
}

export function PasswordField({ label, onChange }: PasswordFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();

  // Handle password change and validation
  const handleSave = () => {
    if (oldPassword.trim() === "") {
      setError(t("PasswordField.error.oldRequired"));
      return;
    }
    if (newPassword.trim() === "") {
      setError(t("PasswordField.error.newRequired"));
      return;
    }

    onChange(newPassword);
    setIsEditing(false);
    setOldPassword("");
    setNewPassword("");
    setError("");
  };

  return (
    <div className="flex flex-col gap-1 mt-4 max-w-sm">
      <p className="font-medium">{label}</p>
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="password"
            placeholder={t("PasswordField.placeholder.old")}
            className="border rounded px-2 py-1 text-sm w-full"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder={t("PasswordField.placeholder.new")}
            className="border rounded px-2 py-1 text-sm w-full"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
            }}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-2 mb-3 mx-1">
            <button
              className="text-sm text-primary hover:underline"
              onClick={handleSave}
            >
              {t("PasswordField.save")}
            </button>
            <button
              className="text-sm text-muted-foreground hover:underline"
              onClick={() => setIsEditing(false)}
            >
              {t("PasswordField.cancel")}
            </button>
          </div>
        </div>
      ) : (
        <span className="flex items-center gap-1">
          {"●●●●●●●●●●"}
          <Pencil
            size={16}
            className="cursor-pointer text-muted-foreground"
            onClick={() => setIsEditing(true)}
          />
        </span>
      )}
    </div>
  );
}

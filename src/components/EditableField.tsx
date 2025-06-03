"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

interface EditableFieldProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
}

export function EditableField({ label, value, onChange }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleBlur = () => {
    onChange(inputValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleBlur();
    }
  };

  return (
    <div className="flex flex-col gap-1 max-w-sm">
      <p className="font-medium">{label}</p>
      {isEditing ? (
        <input
          type="text"
          className="border rounded px-2 py-1 text-sm"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span className="flex items-center gap-1">
          {value}
          <Pencil size={16} className="cursor-pointer text-muted-foreground" onClick={() => setIsEditing(true)} />
        </span>
      )}
    </div>
  );
}

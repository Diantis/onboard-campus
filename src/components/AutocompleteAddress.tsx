"use client";

import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";

interface AutocompleteAddressProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
}

interface AddressFeature {
  properties: {
    id: string;
    label: string;
  };
}

export function AutocompleteAddress({
  label,
  value,
  onChange,
}: AutocompleteAddressProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<AddressFeature[]>([]);

  useEffect(() => {
    if (!isEditing) return;
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      const res = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`,
      );
      const data = await res.json();
      setSuggestions(data.features || []);
    };

    fetchSuggestions();
  }, [query, isEditing]);

  const handleSelect = (address: string) => {
    onChange(address);
    setQuery(address);
    setSuggestions([]);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-1 mt-4 max-w-sm">
      <p className="font-medium text-gray-900 dark:text-gray-100">{label}</p>
      {isEditing ? (
        <div className="relative">
          <input
            type="text"
            placeholder="Entrez votre adresse"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-sm w-full bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            autoFocus
          />
          {suggestions.length > 0 && (
            <ul className="absolute bg-white dark:bg-gray-800 shadow border border-gray-300 dark:border-gray-700 rounded w-full z-10 max-h-40 overflow-auto">
              {suggestions.map((s) => (
                <li
                  key={s.properties.id}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-black dark:text-white"
                  onClick={() => handleSelect(s.properties.label)}
                >
                  {s.properties.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <span className="flex items-center gap-1 text-gray-900 dark:text-gray-100">
          {value || "—"}
          <Pencil
            size={16}
            className="cursor-pointer text-muted-foreground dark:text-gray-400"
            onClick={() => {
              setIsEditing(true);
              setQuery(value);
            }}
          />
        </span>
      )}
    </div>
  );
}

"use client";

import { useId, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslation } from "react-i18next";

export default function SwitchLanguage() {
  const id = useId();
  const { i18n, t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState(
    i18n.language === "fr" ? "fr" : "en",
  );

  const handleChange = (value: string) => {
    setSelectedValue(value);
    i18n.changeLanguage(value);
  };

  return (
    <div className="bg-input/50 inline-flex h-9 rounded-md p-0.5">
      <RadioGroup
        value={selectedValue}
        onValueChange={handleChange}
        className="group after:bg-background has-focus-visible:after:border-ring has-focus-visible:after:ring-ring/50 relative inline-grid grid-cols-[1fr_1fr] items-center gap-0 text-sm font-medium after:absolute after:inset-y-0 after:w-1/2 after:rounded-sm after:shadow-xs after:transition-[translate,box-shadow] after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] has-focus-visible:after:ring-[3px] data-[state=fr]:after:translate-x-0 data-[state=en]:after:translate-x-full"
        data-state={selectedValue}
      >
        <label className="group-data-[state=en]:text-muted-foreground/70 relative z-10 inline-flex h-full min-w-8 cursor-pointer items-center justify-center px-4 whitespace-nowrap transition-colors select-none">
          {t("french")}
          <RadioGroupItem id={`${id}-1`} value="fr" className="sr-only" />
        </label>
        <label className="group-data-[state=fr]:text-muted-foreground/70 relative z-10 inline-flex h-full min-w-8 cursor-pointer items-center justify-center px-4 whitespace-nowrap transition-colors select-none">
          {t("english")}
          <RadioGroupItem id={`${id}-2`} value="en" className="sr-only" />
        </label>
      </RadioGroup>
    </div>
  );
}

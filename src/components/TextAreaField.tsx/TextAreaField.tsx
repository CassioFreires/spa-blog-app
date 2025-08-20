// components/Form/TextAreaField.tsx
import React from "react";

type TextAreaFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
};

export const TextAreaField = ({ label, name, value, onChange, rows = 4 }: TextAreaFieldProps) => (
  <div>
    <label className="form-label fw-bold">{label}</label>
    <textarea
      name={name}
      className="form-control"
      value={value}
      onChange={onChange}
      rows={rows}
    />
  </div>
);

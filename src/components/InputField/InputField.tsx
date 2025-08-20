// components/Form/InputField.tsx
import React from "react";

type InputFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
};

export const InputField = ({ label, name, value, onChange, type = "text", placeholder }: InputFieldProps) => (
  <div>
    <label className="form-label fw-bold">{label}</label>
    <input
      type={type}
      name={name}
      className="form-control"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

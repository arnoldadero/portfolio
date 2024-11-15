
interface FormFieldProps {
  label: string;
  name: string;
  value: string | number;
  type?: string;
  onChange: (value: string) => void;
}

export function FormField({ label, name, value, type = 'text', onChange }: FormFieldProps) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input input-bordered w-full"
      />
    </div>
  );
}
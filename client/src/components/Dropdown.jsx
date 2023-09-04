const Dropdown = ({
  id,
  value,
  onChange,
  name,
  options,
  width,
  placeholderText,
}) => {
  return (
    <div className="relative">
      <select
        className="focus:border-2 cursor-pointer border-[1px] rounded-lg px-4 py-3 bg-transparent border-[#2b2b39] focus:outline-none"
        id={id}
        value={value}
        onChange={onChange}
        style={{ width: `${width}%` }}
        name={name}
      >
        <option value="" defaultValue={""}>
          {placeholderText}
        </option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;

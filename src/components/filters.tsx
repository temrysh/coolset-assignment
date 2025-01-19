type FiltersProps = {
  sections: string[];
  selectedSections: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: VoidFunction;
};

export const Filters = ({
  sections,
  selectedSections,
  onChange,
  onClose,
}: FiltersProps) => (
  <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
    <div className="w-[90%] max-w-[400px] h-auto max-h-[80%] rounded-[4px] bg-[#ffffff] dark:bg-[#020617] flex flex-col">
      <div className="flex-1 overflow-y-auto m-[16px] flex flex-col gap-[8px]">
        {sections.map((section) => (
          <div key={section} className="flex items-center gap-[8px]">
            <label className="capitalize cursor-pointer">
              <input
                type="checkbox"
                value={section}
                onChange={onChange}
                checked={selectedSections.includes(section)}
                className="mr-[16px]"
              />
              {section}
            </label>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <span
          className="w-full m-[16px] mt-0 border border-[#E2E8F0] rounded-[4px] py-[8px] text-[13px] text-[#020617] dark:text-[#ffffff] text-center cursor-pointer"
          onClick={onClose}
        >
          Close
        </span>
      </div>
    </div>
  </div>
);

export default Filters;

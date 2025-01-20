import { useMemo, useCallback } from "react";

type FiltersProps = {
  sections: string[];
  selectedSections: string[];
  onChange: (arg: string[]) => void;
  onClose: VoidFunction;
};

export const Filters = ({
  sections,
  selectedSections,
  onChange,
  onClose,
}: FiltersProps) => {
  const isAllSelected = useMemo(
    () => sections.length === selectedSections.length,
    [sections.length, selectedSections.length]
  );

  const handleSelectAll = useCallback(() => {
    onChange(isAllSelected ? [] : sections);
  }, [onChange, isAllSelected, sections]);

  const handleSectionsChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = event.target;

      const newSelectedSections = checked
        ? [...selectedSections, value]
        : selectedSections.filter((item) => item !== value);

      onChange(newSelectedSections);
    },
    [onChange, selectedSections]
  );

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)] backdrop-blur-sm flex justify-center items-center">
      <div
        className="absolute top-0 left-0 w-full h-full z-0"
        onClick={onClose}
      />
      <div className="w-[90%] max-w-[400px] h-auto max-h-[80%] rounded-[4px] bg-[#ffffff] dark:bg-[#020617] flex flex-col z-10">
        <div className="flex-1 overflow-y-auto m-[16px] flex flex-col gap-[8px]">
          <div className="flex items-center gap-[8px]">
            <label className="capitalize cursor-pointer select-none">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={isAllSelected}
                className="mr-[16px]"
              />
              Select all
            </label>
          </div>
          {sections.map((section) => (
            <div key={section} className="flex items-center gap-[8px]">
              <label className="capitalize cursor-pointer select-none">
                <input
                  type="checkbox"
                  value={section}
                  onChange={handleSectionsChange}
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
};

export default Filters;

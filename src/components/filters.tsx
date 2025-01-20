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
      <div className="w-[90%] max-w-[400px] h-auto max-h-[80%] rounded-[4px] bg-[--background] flex flex-col z-10">
        <div className="flex-1 overflow-y-auto m-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <label className="capitalize cursor-pointer select-none">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={isAllSelected}
                className="mr-4"
              />
              Select all
            </label>
          </div>
          {sections.map((section) => (
            <div key={section} className="flex items-center gap-2">
              <label className="capitalize cursor-pointer select-none">
                <input
                  type="checkbox"
                  value={section}
                  onChange={handleSectionsChange}
                  checked={selectedSections.includes(section)}
                  className="mr-4"
                />
                {section}
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <span
            className="w-full m-4 mt-0 border border-[--neutral] rounded-[4px] py-2 text-[13px] text-[--foreground] text-center cursor-pointer"
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

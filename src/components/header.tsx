import Image from "next/image";
import FilterIcon from "../../public/filter-icon.svg";

type HeaderProps = {
  onShowFilters: VoidFunction;
};

export const Header = ({ onShowFilters }: HeaderProps) => (
  <div className="flex justify-between items-center m-4">
    <h1 className="text-[15px]">Today&apos;s groceries</h1>
    <div
      className="h-[32px] flex items-center border border-[--neutral] rounded-[4px] px-[10px] cursor-pointer"
      onClick={onShowFilters}
    >
      <Image src={FilterIcon} alt="filter icon" />
      <span className="text-[13px] ml-2">Filter by section</span>
    </div>
  </div>
);

export default Header;

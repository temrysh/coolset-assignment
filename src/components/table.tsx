import Image from "next/image";
import ArrowIcon from "../../public/arrow-icon.svg";

type TableProps = {
  list: {
    id: number;
    name: string;
    section: string;
    price: number;
    pricePer100g: number;
  }[];
  order: number | null;
  onOrderChange: VoidFunction;
};

export const Table = ({ list, order, onOrderChange }: TableProps) => (
  <div className="overflow-scroll border border-[#E2E8F0] rounded-[4px] mx-4 text-[12px]">
    <table className="w-full max-h-full">
      <thead className="sticky top-0">
        <tr className="h-[41px] divide-x divide-[#E2E8F0] text-[#71717A] text-left bg-[#ffffff] dark:bg-[#020617]">
          <th className="px-4">Name</th>
          <th className="px-4">Section</th>
          <th className="px-4">Price (€)</th>
          <th className="px-4">
            <div
              className="flex items-center cursor-pointer select-none"
              onClick={onOrderChange}
            >
              {order ? (
                <span className={order === -1 ? "rotate-180" : ""}>
                  <Image src={ArrowIcon} alt="arrow icon" />
                </span>
              ) : null}
              Price / 100 g (€)
            </div>
          </th>
        </tr>
        <tr className="h-[1px] bg-[#E2E8F0]">
          <th />
          <th />
          <th />
          <th />
        </tr>
      </thead>

      <tbody className="divide-y divide-[#E2E8F0]">
        {list.map(({ id, name, section, price, pricePer100g }) => (
          <tr key={id} className="h-[48px] divide-x divide-[#E2E8F0]">
            <td className="px-4 border-[#E2E8F0]">{name}</td>
            <td className="px-4 border-[#E2E8F0]">{section}</td>
            <td className="px-4 border-[#E2E8F0]">{price}</td>
            <td className="px-4 border-[#E2E8F0]">{pricePer100g.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;

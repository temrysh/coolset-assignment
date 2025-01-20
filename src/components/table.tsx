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
  <div className="overflow-scroll border border-[--neutral] rounded-[4px] mx-4 text-[12px]">
    <table className="w-full max-h-full">
      <thead className="sticky top-0">
        <tr className="h-[40px] divide-x divide-[--neutral] text-[--neutral-text] text-left bg-[--background]">
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
        {/* HACK: bottom border of sticky header fix */}
        <tr className="h-[1px] bg-[--neutral]">
          <th />
          <th />
          <th />
          <th />
        </tr>
      </thead>

      <tbody className="divide-y divide-[--neutral]">
        {list.map(({ id, name, section, price, pricePer100g }) => (
          <tr key={id} className="h-[48px] divide-x divide-[--neutral]">
            <td className="px-4 border-[--neutral]">{name}</td>
            <td className="px-4 border-[--neutral]">{section}</td>
            <td className="px-4 border-[--neutral]">{price}</td>
            <td className="px-4 border-[--neutral]">
              {pricePer100g.toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;

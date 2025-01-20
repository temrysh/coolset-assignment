import { useMemo, useCallback } from "react";

type FooterProps = {
  rows: number;
  page: number;
  dataLength: number;
  onPageChange: (page: number) => void;
  onRowsChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Footer = ({
  rows,
  page,
  dataLength,
  onPageChange,
  onRowsChange,
}: FooterProps) => {
  const from = useMemo(
    () => Math.min(dataLength, rows * page + 1),
    [dataLength, page, rows]
  );
  const to = useMemo(
    () => Math.min(rows + from - 1, dataLength),
    [dataLength, from, rows]
  );

  const onDecreasePage = useCallback(() => {
    onPageChange(Math.max(page - 1, 0));
  }, [onPageChange, page]);

  const onIncreasePage = useCallback(() => {
    onPageChange(Math.min(page + 1, Math.ceil(dataLength / rows) - 1));
  }, [dataLength, onPageChange, page, rows]);

  return (
    <div className="flex items-center m-4">
      <div className="flex items-center h-[32px]">
        <span className="text-[12px] text-[#71717A]">Rows per page:</span>
        <select
          className="text-[13px] text-[#020617] dark:text-[#ffffff] bg-[#ffffff] dark:bg-[#020617]"
          value={rows}
          onChange={onRowsChange}
        >
          <option>10</option>
          <option>20</option>
          <option>30</option>
        </select>
      </div>

      <div className="flex h-[32px] items-center ml-[32px] text-[#71717A]">
        <span className="text-[12px] mr-[8px] min-w-[70px]">
          {from}-{to} of {dataLength}
        </span>
        <div className="flex gap-[10px]">
          <span
            className="w-[20px] h-[20px] flex justify-center items-center cursor-pointer select-none"
            onClick={onDecreasePage}
          >
            {"<"}
          </span>
          <span
            className="w-[20px] h-[20px] flex justify-center items-center cursor-pointer select-none"
            onClick={onIncreasePage}
          >
            {">"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;

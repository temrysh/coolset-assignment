"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Header from "../components/header";
import Table from "../components/table";
import Footer from "../components/footer";
import Filters from "../components/filters";
import useData from "../utils/use-data";
import calculatePricePer100g from "../utils/calculate-price-per-100g";

export default function Home() {
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSections, setSelectedSections] = useState<string[]>([]);

  const data = useData();
  const sections: string[] = useMemo(
    () => [...new Set(data.map(({ section }) => section.toLowerCase()))],
    [data]
  );

  useEffect(() => {
    setSelectedSections(sections);
  }, []);

  // modify
  const dataWithPricePer100g = useMemo(
    () =>
      data.map((item) => ({
        ...item,
        pricePer100g: calculatePricePer100g(item.price, item.weight),
      })),
    [data]
  );

  // filter
  const filteredData = useMemo(() => {
    if (selectedSections.length === sections.length) {
      return dataWithPricePer100g;
    }

    return dataWithPricePer100g.filter(({ section }) =>
      selectedSections.includes(section.toLowerCase())
    );
  }, [dataWithPricePer100g, sections.length, selectedSections]);

  // sort
  const sortedData = useMemo(() => {
    if (order === 0) return filteredData;

    return [...filteredData].sort(
      (a, b) => (a.pricePer100g - b.pricePer100g) * order
    );
  }, [filteredData, order]);

  // paginate
  const dataToRender = useMemo(
    () => sortedData.slice(rows * page, rows * page + rows),
    [sortedData, rows, page]
  );

  const handleOrderChange = useCallback(() => {
    setOrder((order) => (order ? (order === 1 ? -1 : 0) : 1));
    setPage(0);
  }, []);

  const handleRowsChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRows(Number(e.target.value));
      setPage(0);
    },
    []
  );

  const handleSectionsChange = useCallback((newSelectedSections: string[]) => {
    setSelectedSections(newSelectedSections);
    setPage(0);
  }, []);

  return (
    <div className="w-full h-[100vh] overflow-hidden flex justify-center">
      <div className="w-full max-w-[1060px] h-full flex flex-col">
        <Header onShowFilters={() => setShowFilters(true)} />

        <Table
          list={dataToRender}
          order={order}
          onOrderChange={handleOrderChange}
        />

        <Footer
          rows={rows}
          page={page}
          dataLength={sortedData.length}
          onPageChange={setPage}
          onRowsChange={handleRowsChange}
        />
      </div>

      {showFilters && (
        <Filters
          sections={sections}
          selectedSections={selectedSections}
          onChange={handleSectionsChange}
          onClose={() => setShowFilters(false)}
        />
      )}
    </div>
  );
}

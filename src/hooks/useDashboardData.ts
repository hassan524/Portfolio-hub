import { useCallback, useMemo, useState } from "react";
import { DEFAULT_PORTFOLIOS, type Portfolio } from "@/components/individual/dashboard/ui/types";

const STORAGE_KEY = "portflu:dashboard-portfolios";

function readPortfolios() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Portfolio[]) : DEFAULT_PORTFOLIOS;
  } catch {
    return DEFAULT_PORTFOLIOS;
  }
}

function savePortfolios(portfolios: Portfolio[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolios));
}

export function useDashboardData(selectedPortfolioId: string | null, activeTab: string) {
  const [portfolios, setPortfolios] = useState<Portfolio[]>(() => readPortfolios());

  const commitPortfolios = useCallback((next: Portfolio[]) => {
    setPortfolios(next);
    savePortfolios(next);
  }, []);

  const updatePortfolio = useCallback(
    async (updatedPortfolio: Portfolio) => {
      commitPortfolios(
        portfolios.map((portfolio) =>
          portfolio.id === updatedPortfolio.id
            ? { ...updatedPortfolio, lastUpdated: "Just now" }
            : portfolio,
        ),
      );
    },
    [commitPortfolios, portfolios],
  );

  const deletePortfolio = useCallback(
    async (id: string) => {
      commitPortfolios(portfolios.filter((portfolio) => portfolio.id !== id));
    },
    [commitPortfolios, portfolios],
  );

  const createPortfolio = useCallback(
    async (portfolio: Portfolio) => {
      commitPortfolios([portfolio, ...portfolios]);
    },
    [commitPortfolios, portfolios],
  );

  const selectedPortfolio = useMemo(
    () => portfolios.find((portfolio) => portfolio.id === selectedPortfolioId),
    [portfolios, selectedPortfolioId],
  );

  return {
    portfolios,
    isLoadingPortfolios: false,
    portfolioDetails: selectedPortfolio,
    isLoadingDetails: false,
    tabData: activeTab ? selectedPortfolio : null,
    isLoadingTab: false,
    isFetchingTab: false,
    updatePortfolio,
    deletePortfolio,
    createPortfolio,
  };
}

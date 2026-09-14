// hooks/usePortfolios.ts
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import portfolioApi from "@/api/portfolioApi";
import { mapPortfolio } from "@/lib/functions/portfolio";
import { PortfolioRow, Portfolio, PortfolioOverview } from "@/types/portfolio";
import { mapPortfolioOverview } from "@/lib/functions/portfolio";


export function usePortfolios(userId?: string) {
  return useQuery<Portfolio[]>({
    queryKey: ["portfolios", userId],
    queryFn: async () => {
      const response = await portfolioApi.getPortfolios();
      const rows: PortfolioRow[] = response.data.portfolios;
      return rows.map(mapPortfolio);
    },
    enabled: !!userId,
  });
}

export function usePortfolioViews30d(portfolioId: string) {
  const [views30d, setViews30d] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!portfolioId) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    portfolioApi
      .getPortfolioViews30d(portfolioId)
      .then((res) => {
        if (!cancelled) setViews30d(res.data.views30d);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message ?? "Failed to load 30-day views");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [portfolioId]);

  return { views30d, loading, error };
}

export function usePortfolioTotalViews(portfolioId: string) {
  const [totalViews, setTotalViews] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!portfolioId) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    portfolioApi
      .getPortfolioViewsTotal(portfolioId)
      .then((res) => {
        if (!cancelled) setTotalViews(res.data.totalViews);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message ?? "Failed to load total views");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [portfolioId]);

  return { totalViews, loading, error };
}

export function usePortfolioDetail(portfolioId?: string) {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!portfolioId) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    portfolioApi
      .getPortfolio(portfolioId)
      .then((res) => {
        if (!cancelled) setPortfolio(mapPortfolio(res.data));
      })
      .catch((err) => {
        if (!cancelled) setError(err.response?.data?.error || err.message || "Failed to load portfolio");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [portfolioId]);

  return { portfolio, loading, error };
}

export function usePortfolioViewsRange(portfolioId: string, range: string) {
  const [dates, setDates] = useState<string[]>([]);
  const [seriesData, setSeriesData] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!portfolioId) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    portfolioApi
      .getPortfolioViewsRange(portfolioId, range)
      .then((res) => {
        if (cancelled) return;
        setDates(res.data.dates);
        setSeriesData(res.data.seriesData);
      })
      .catch((err) => {
        if (!cancelled) setError(err.response?.data?.error || err.message || "Failed to load views range");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [portfolioId, range]);

  return { dates, seriesData, loading, error };
}

export function usePortfolioOverview(portfolioId?: string) {
  const [overview, setOverview] = useState<PortfolioOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!portfolioId) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    portfolioApi
      .getPortfolioOverview(portfolioId)
      .then((res) => {
        if (!cancelled) setOverview(mapPortfolioOverview(res.data));
      })
      .catch((err) => {
        if (!cancelled) setError(err.response?.data?.error || err.message || "Failed to load overview");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [portfolioId]);

  return { overview, loading, error };
}
export function usePortfolioTraffic(portfolioId?: string) {
  const [totalViews, setTotalViews] = useState(0);
  const [topSources, setTopSources] = useState<{ label: string; count: number; share: number }[]>([]);
  const [topPages, setTopPages] = useState<{ path: string; views: number }[]>([]);
  const [topCountries, setTopCountries] = useState<{ label: string; count: number; share: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!portfolioId) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    portfolioApi
      .getPortfolioTraffic(portfolioId)
      .then((res) => {
        if (cancelled) return;
        setTotalViews(res.data.totalViews);
        setTopSources(res.data.topSources);
        setTopPages(res.data.topPages);
        setTopCountries(res.data.topCountries);
      })
      .catch((err) => {
        if (!cancelled) setError(err.response?.data?.error || err.message || "Failed to load traffic");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [portfolioId]);

  return { totalViews, topSources, topPages, topCountries, loading, error };
}
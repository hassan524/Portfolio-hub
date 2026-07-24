import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type Portfolio, ANALYTICS_DATA, REFERRERS } from "@/components/individual/dashboard/types";
import { getStoredPortfolios, saveStoredPortfolios } from "@/lib/portfolioStorage";

type TabQueryState = {
  data: unknown;
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
};

// Simulated network delay helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * API Mock fetchers for dashboard tabs
 */
export const dashboardApi = {
  // Fetch all portfolios
  fetchPortfolios: async (): Promise<Portfolio[]> => {
    await delay(700);
    return getStoredPortfolios();
  },

  // Fetch a single portfolio details (used in 'edit' tab)
  fetchPortfolioDetails: async (portfolioId: string): Promise<Portfolio> => {
    await delay(600);
    const portfolios = getStoredPortfolios();
    const portfolio = portfolios.find((p) => p.id === portfolioId);
    if (!portfolio) {
      throw new Error("Portfolio not found");
    }
    return portfolio;
  },

  // Fetch analytics data for a specific portfolio
  fetchAnalytics: async (portfolioId: string) => {
    await delay(800);
    const portfolios = getStoredPortfolios();
    const portfolio = portfolios.find((p) => p.id === portfolioId);
    const isDemo = portfolioId !== "portfolio-3";

    const viewsVal = isDemo ? (portfolioId === "portfolio-2" ? "891" : "1,247") : "0";
    const clicksVal = isDemo ? (portfolioId === "portfolio-2" ? "189" : "342") : "0";
    const ctrVal = isDemo ? (portfolioId === "portfolio-2" ? "21.2%" : "27.4%") : "0.0%";
    const timeVal = isDemo ? "2m 34s" : "—";

    const customAnalyticsData = isDemo
      ? ANALYTICS_DATA
      : ANALYTICS_DATA.map((d) => ({ ...d, views: 0, clicks: 0 }));

    return {
      portfolioId,
      views: viewsVal,
      clicks: clicksVal,
      ctr: ctrVal,
      duration: timeVal,
      chartData: customAnalyticsData,
      referrers: isDemo ? REFERRERS : [],
      topLinks: isDemo
        ? [
            { title: "Supabase Dashboard Redesign", views: 180 },
            { title: "Framer Motion Templates", views: 124 },
            { title: "Main Landing Bio", views: 38 },
          ]
        : [],
      isDemo,
    };
  },

  // Fetch custom domain settings
  fetchDomainSettings: async (portfolioId: string) => {
    await delay(500);
    const portfolios = getStoredPortfolios();
    const portfolio = portfolios.find((p) => p.id === portfolioId);
    if (!portfolio) throw new Error("Portfolio not found");

    return {
      portfolioId,
      url: portfolio.url,
      subdomain: portfolio.subdomain,
      customDomain: portfolio.domain || "",
      isConnected: !!portfolio.domain && portfolio.domain !== "Not connected",
      sslStatus: "active",
      dnsRecords: [
        { type: "CNAME", host: "www", value: "cname.portfoliohub.app", verified: true },
        { type: "A", host: "@", value: "76.76.21.21", verified: true },
      ],
    };
  },

  // Fetch share pitch video settings
  fetchShareSettings: async (portfolioId: string) => {
    await delay(600);
    return {
      portfolioId,
      recordedVideo: localStorage.getItem(`recorded_video_${portfolioId}`) || null,
      aiVideo: localStorage.getItem(`ai_video_${portfolioId}`) || null,
      shareUrl: `https://video.portfoliohub.app/v/${portfolioId}`,
    };
  },

  // Fetch export settings
  fetchExportSettings: async (portfolioId: string) => {
    await delay(450);
    const portfolios = getStoredPortfolios();
    const portfolio = portfolios.find((p) => p.id === portfolioId);
    if (!portfolio) throw new Error("Portfolio not found");

    return {
      portfolioId,
      subdomain: portfolio.subdomain,
      defaultFormat: "static",
      formats: [
        {
          id: "static",
          label: "Static HTML/CSS",
          desc: "No build steps required. Simple single file.",
        },
        {
          id: "vite",
          label: "Vite React Starter",
          desc: "Standard React scaffold for modern developers.",
        },
        {
          id: "next",
          label: "Next.js Template",
          desc: "Optimized SSR routing for maximum SEO & performance.",
        },
      ],
    };
  },
};

/**
 * React Query Hooks for clean and reactive API fetching on Tab Switch
 */

export function usePortfoliosQuery() {
  return useQuery({
    queryKey: ["portfolios"],
    queryFn: () => dashboardApi.fetchPortfolios(),
  });
}

export function usePortfolioDetailsQuery(portfolioId: string | null) {
  return useQuery({
    queryKey: ["portfolio", portfolioId, "details"],
    queryFn: () => dashboardApi.fetchPortfolioDetails(portfolioId!),
    enabled: !!portfolioId,
  });
}

export function useAnalyticsQuery(portfolioId: string | null) {
  return useQuery({
    queryKey: ["portfolio", portfolioId, "analytics"],
    queryFn: () => dashboardApi.fetchAnalytics(portfolioId!),
    enabled: !!portfolioId,
  });
}

export function useDomainQuery(portfolioId: string | null) {
  return useQuery({
    queryKey: ["portfolio", portfolioId, "domain"],
    queryFn: () => dashboardApi.fetchDomainSettings(portfolioId!),
    enabled: !!portfolioId,
  });
}

export function useShareQuery(portfolioId: string | null) {
  return useQuery({
    queryKey: ["portfolio", portfolioId, "share"],
    queryFn: () => dashboardApi.fetchShareSettings(portfolioId!),
    enabled: !!portfolioId,
  });
}

export function useExportQuery(portfolioId: string | null) {
  return useQuery({
    queryKey: ["portfolio", portfolioId, "export"],
    queryFn: () => dashboardApi.fetchExportSettings(portfolioId!),
    enabled: !!portfolioId,
  });
}

/**
 * Unified Tab Switch Hook
 * Fetches the correct resources reactively based on dashboard state.
 */
export function useDashboardData(portfolioId: string | null, activeTab: string) {
  const portfoliosQuery = usePortfoliosQuery();
  const detailsQuery = usePortfolioDetailsQuery(portfolioId);
  const analyticsQuery = useAnalyticsQuery(activeTab === "analytics" ? portfolioId : null);
  const domainQuery = useDomainQuery(activeTab === "domain" ? portfolioId : null);
  const shareQuery = useShareQuery(activeTab === "share" ? portfolioId : null);
  const exportQuery = useExportQuery(activeTab === "export" ? portfolioId : null);

  const queryClient = useQueryClient();

  // Mutations to update local/remote data and automatically invalidate queries
  const updatePortfolioMutation = useMutation({
    mutationFn: async (updatedPortfolio: Portfolio) => {
      await delay(400); // Simulate API latency
      const portfolios = getStoredPortfolios();
      const nextPortfolios = portfolios.map((p) =>
        p.id === updatedPortfolio.id ? updatedPortfolio : p,
      );
      saveStoredPortfolios(nextPortfolios);
      return updatedPortfolio;
    },
    onSuccess: (updated) => {
      // Invalidate related queries so UI syncs
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio", updated.id] });
    },
  });

  const deletePortfolioMutation = useMutation({
    mutationFn: async (id: string) => {
      await delay(400);
      const portfolios = getStoredPortfolios();
      const nextPortfolios = portfolios.filter((p) => p.id !== id);
      saveStoredPortfolios(nextPortfolios);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
  });

  const createPortfolioMutation = useMutation({
    mutationFn: async (newPortfolio: Portfolio) => {
      await delay(500);
      const portfolios = getStoredPortfolios();
      const nextPortfolios = [newPortfolio, ...portfolios];
      saveStoredPortfolios(nextPortfolios);
      return newPortfolio;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
  });

  // Determine current active query status and data based on active tab
  let tabQuery: TabQueryState = { data: null, isLoading: false, isFetching: false, error: null };

  if (portfolioId) {
    switch (activeTab) {
      case "analytics":
        tabQuery = analyticsQuery;
        break;
      case "domain":
        tabQuery = domainQuery;
        break;
      case "edit":
        tabQuery = detailsQuery;
        break;
      case "share":
        tabQuery = shareQuery;
        break;
      case "export":
        tabQuery = exportQuery;
        break;
    }
  }

  return {
    portfolios: portfoliosQuery.data || [],
    isLoadingPortfolios: portfoliosQuery.isLoading,
    portfolioDetails: detailsQuery.data,
    isLoadingDetails: detailsQuery.isLoading,

    // Active tab data
    tabData: tabQuery.data,
    isLoadingTab: tabQuery.isLoading,
    isFetchingTab: tabQuery.isFetching,
    tabError: tabQuery.error,

    // Mutations
    updatePortfolio: updatePortfolioMutation.mutateAsync,
    isUpdating: updatePortfolioMutation.isPending,
    deletePortfolio: deletePortfolioMutation.mutateAsync,
    isDeleting: deletePortfolioMutation.isPending,
    createPortfolio: createPortfolioMutation.mutateAsync,
    isCreating: createPortfolioMutation.isPending,
  };
}

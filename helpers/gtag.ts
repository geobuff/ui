const isDevelopment = process.env.NODE_ENV === "development";

export const pageview = (url: URL): void => {
  if (isDevelopment || typeof window !== "undefined") {
    return;
  }
  //@ts-ignore
  window?.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  });
};

type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value: number;
};

export const event = ({ action, category, label, value }: GTagEvent): void => {
  if (isDevelopment || typeof window !== "undefined") {
    return;
  }
  //@ts-ignore
  window?.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};

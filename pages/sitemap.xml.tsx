import React, { FC } from "react";
import * as fs from "fs";
import axiosClient from "../axios/axiosClient";

const Sitemap: FC = () => {
  return null;
};

export const getServerSideProps = async ({ res }) => {
  const staticPaths = fs
    .readdirSync("pages")
    .filter((staticPage) => {
      return ![
        "sitemap.xml.tsx",
        "404.tsx",
        "500.tsx",
        "_app.tsx",
        "_document.tsx",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${process.env.NEXT_PUBLIC_SITE_URL}/${staticPagePath.replace(
        ".tsx",
        ""
      )}`;
    });

  const { data: routes } = await axiosClient.get(
    `${process.env.NEXT_PUBLIC_API_URL}/seo/dynamic-routes`
  );

  const dynamicPaths = routes.map(
    (route) => `${process.env.NEXT_PUBLIC_SITE_URL}/${route}`
  );

  const allPaths = [...staticPaths, ...dynamicPaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;

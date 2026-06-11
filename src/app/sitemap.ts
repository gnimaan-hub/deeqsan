import type { MetadataRoute } from "next";
import { books } from "@/lib/books";

const BASE_URL = "https://www.deeqsan.net";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/librairie`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/maison-edition`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/evenements`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];

  // Les fiches d'exemple (isPlaceholder) ne doivent pas être proposées
  // aux moteurs de recherche tant que le vrai catalogue n'est pas fourni.
  const bookRoutes: MetadataRoute.Sitemap = books
    .filter((book) => !book.isPlaceholder)
    .map((book) => ({
      url: `${BASE_URL}/librairie/${book.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: book.isHouseEdition ? 0.8 : 0.6,
    }));

  return [...staticRoutes, ...bookRoutes];
}

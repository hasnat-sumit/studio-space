import { getStudios } from "@/lib/api/studios";
import { parseStudioQuery } from "@/lib/studio-query";
import { StudiosExplorer } from "./studios-explorer";

interface StudiosResultsProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Data boundary for `/studios`: awaits the URL params and the catalogue
 * inside the page's Suspense boundary (required by `cacheComponents` for
 * uncached reads), then hands both to the client-side explorer.
 */
export async function StudiosResults({ searchParams }: StudiosResultsProps) {
  const params = await searchParams;
  const initialQuery = parseStudioQuery(params);
  const { studios, total } = await getStudios();

  return (
    <StudiosExplorer studios={studios} total={total} initialQuery={initialQuery} />
  );
}

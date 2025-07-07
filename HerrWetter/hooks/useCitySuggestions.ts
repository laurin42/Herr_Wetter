import { useState, useEffect } from "react";

export type CitySuggestion = {
  city: string;
  region: string;
  country: string;
  id: number;
};


export function useCitySuggestions(city: string) {
    const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (city.length < 2) {
      setSuggestions([]);
      return;
    }

    const handler = setTimeout(() => {
      const fetchSuggestions = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `http://192.168.178.67:3000/api/cities?q=${encodeURIComponent(
              city
            )}`
          );
          if (!response.ok) throw new Error("Fehler beim Laden der Vorschläge");
          const data: CitySuggestion[] = await response.json();
          setSuggestions(data);
        } catch (e) {
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchSuggestions();
    }, 300);

    return () => clearTimeout(handler);
  }, [city]);

return { suggestions, isLoading }
}
"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Tooth } from "lucide-react";
import { DENTAL_TERMS } from "@/config/dental-terminology";

interface DentalSearchProps {
  placeholder?: string;
  onSearch: (term: string) => void;
  className?: string;
}

export function DentalSearch({ 
  placeholder = "Buscar por paciente, dente ou procedimento...", 
  onSearch,
  className = ""
}: DentalSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Combinar todos os termos odontológicos para sugestões
  const allTerms = [
    ...DENTAL_TERMS.APPOINTMENT_TYPES,
    ...DENTAL_TERMS.COMMON_PROCEDURES,
    ...DENTAL_TERMS.DIAGNOSES,
    "Dente 11", "Dente 12", "Dente 13", "Dente 14", "Dente 15", "Dente 16", "Dente 17", "Dente 18",
    "Dente 21", "Dente 22", "Dente 23", "Dente 24", "Dente 25", "Dente 26", "Dente 27", "Dente 28",
    "Dente 31", "Dente 32", "Dente 33", "Dente 34", "Dente 35", "Dente 36", "Dente 37", "Dente 38",
    "Dente 41", "Dente 42", "Dente 43", "Dente 44", "Dente 45", "Dente 46", "Dente 47", "Dente 48"
  ];

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filtered = allTerms.filter(term =>
        term.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 8);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    onSearch(term);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Tooth className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-4 w-4" />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
          onFocus={() => searchTerm.length > 1 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Sugestões */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-700 text-sm border-b border-gray-100 last:border-b-0"
            >
              <span className="flex items-center">
                {suggestion.includes("Dente") && <Tooth className="h-3 w-3 mr-2 text-blue-500" />}
                {suggestion}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Dicas de busca */}
      {searchTerm.length === 0 && (
        <div className="absolute z-40 w-full mt-1 bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-700">
          <p className="font-medium mb-1">💡 Dicas de busca:</p>
          <div className="grid grid-cols-2 gap-1">
            <span>• "Dente 36"</span>
            <span>• "Endodontia"</span>
            <span>• "Cárie"</span>
            <span>• "Limpeza"</span>
          </div>
        </div>
      )}
    </div>
  );
}
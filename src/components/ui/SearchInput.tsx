"use client";

import React, { useState, useCallback } from "react";
import Input from "./Input";
import { FiSearch, FiX } from "react-icons/fi";

interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
  allowClear?: boolean;
  loading?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  placeholder = "Search...",
  className,
  debounceMs = 300,
  allowClear = true,
  loading = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const debouncedSearch = useCallback(
    (query: string) => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      const timer = setTimeout(() => {
        onSearch(query);
      }, debounceMs);

      setDebounceTimer(timer);
    },
    [onSearch, debounceMs, debounceTimer]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
  };

  const searchIcon = loading ? (
    <div className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full" />
  ) : (
    <FiSearch className="h-4 w-4" />
  );

  const suffixIcon =
    allowClear && searchQuery ? (
      <button
        type="button"
        onClick={handleClear}
        className="p-1 hover:text-gray-600 transition-colors pointer-events-auto"
        aria-label="Clear search"
      >
        <FiX className="h-4 w-4" />
      </button>
    ) : null;

  return (
    <Input
      type="text"
      placeholder={placeholder}
      value={searchQuery}
      onChange={handleInputChange}
      leftIcon={searchIcon}
      rightIcon={suffixIcon}
      className={className}
      variant="outline"
    />
  );
};

export default SearchInput;

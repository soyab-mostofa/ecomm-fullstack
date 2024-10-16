"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Star, ChevronDown, ArrowDownNarrowWide } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";

type Category = {
  name: string;
  id: string;
  description: string | null;
  imageString: string | null;
};

export default function ProductFilters({
  categories,
  selectedCategoryIds = [],
  minPrice = 0,
  maxPrice = 100000,
  minRating = 0,
}: {
  categories: Category[];
  selectedCategoryIds?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [openSections, setOpenSections] = useState({
    price: false,
    categories: false,
    rating: false,
    filter: false,
  });

  const [localPriceRange, setLocalPriceRange] = useState([minPrice, maxPrice]);
  const [localCategoryIds, setLocalCategoryIds] =
    useState<string[]>(selectedCategoryIds);
  const [localMinRating, setLocalMinRating] = useState(minRating);

  const updateFilters = () => {
    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );

    currentParams.set("minPrice", localPriceRange[0].toString());
    currentParams.set("maxPrice", localPriceRange[1].toString());

    if (localCategoryIds.length > 0) {
      currentParams.set("categories", localCategoryIds.join(","));
    } else {
      currentParams.delete("categories");
    }

    currentParams.set("minRating", localMinRating.toString());

    startTransition(() => {
      router.push(`/products?${currentParams.toString()}`);
    });
  };

  const resetFilters = () => {
    setLocalPriceRange([0, 100000]);
    setLocalCategoryIds([]);
    setLocalMinRating(0);
    startTransition(() => {
      router.push("/products");
    });
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <Card className="shadow-none ">
      <Collapsible
        open={openSections.filter}
        onOpenChange={() => toggleSection("filter")}
      >
        <CollapsibleTrigger className="w-full">
          <CardHeader className="w-full">
            <CardTitle className="text-sm px-4  gap-4 flex w-full items-center">
              <span>Filters</span>
              <span>
                <ArrowDownNarrowWide className="w-4 h-4 inline" />
              </span>
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-4">
            <Collapsible
              open={openSections.price}
              onOpenChange={() => toggleSection("price")}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full flex justify-between items-center"
                >
                  <span>Price Range</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openSections.price ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2">
                <Slider
                  min={0}
                  max={100000}
                  step={100}
                  value={localPriceRange}
                  onValueChange={setLocalPriceRange}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>${localPriceRange[0].toLocaleString()}</span>
                  <span>${localPriceRange[1].toLocaleString()}</span>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible
              open={openSections.categories}
              onOpenChange={() => toggleSection("categories")}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full flex justify-between items-center"
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openSections.categories ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2">
                <ScrollArea className="h-72">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center space-x-2 mt-1"
                    >
                      <Checkbox
                        id={category.id}
                        checked={localCategoryIds.includes(category.id)}
                        onCheckedChange={(checked) => {
                          setLocalCategoryIds(
                            checked
                              ? [...localCategoryIds, category.id]
                              : localCategoryIds.filter(
                                  (id) => id !== category.id
                                )
                          );
                        }}
                      />
                      <label htmlFor={category.id} className="text-sm">
                        {category.name}
                      </label>
                    </div>
                  ))}
                </ScrollArea>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible
              open={openSections.rating}
              onOpenChange={() => toggleSection("rating")}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full flex justify-between items-center"
                >
                  <span>Minimum Rating</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openSections.rating ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2">
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      variant={localMinRating >= star ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLocalMinRating(star)}
                    >
                      <Star
                        className={localMinRating >= star ? "fill-current" : ""}
                        size={16}
                      />
                    </Button>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button
              onClick={updateFilters}
              className="w-full"
              disabled={isPending}
            >
              Apply Filters
            </Button>
            <Button
              onClick={resetFilters}
              variant="outline"
              className="w-full"
              disabled={isPending}
            >
              Reset Filters
            </Button>
          </CardFooter>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

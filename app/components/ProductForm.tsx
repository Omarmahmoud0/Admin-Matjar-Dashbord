import { useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Delete, Plus } from "lucide-react";
import type { AddDoc, ProductFormValues } from "~/types/types";

type ProductFormProps = {
  initialProduct?: Partial<AddDoc> | null;
  mode?: "add" | "edit";
  onSubmitProduct: (product: AddDoc) => void;
  onCancel?: () => void;
};

const categories = [
  {
    name: "Electronics",
    brands: [
      "Apple",
      "Samsung",
      "Sony",
      "LG",
      "Dell",
      "HP",
      "Lenovo",
      "Microsoft",
      "Huawei",
      "Xiaomi",
    ],
  },
  {
    name: "Clothing",
    brands: [
      "Nike",
      "Adidas",
      "Zara",
      "H&M",
      "Uniqlo",
      "Gucci",
      "Louis Vuitton",
      "Under Armour",
      "Levi's",
      "Puma",
    ],
  },
  {
    name: "Home & Garden",
    brands: [
      "IKEA",
      "Home Depot",
      "Wayfair",
      "Ashley Furniture",
      "Philips",
      "Dyson",
      "Whirlpool",
      "Bosch",
      "KitchenAid",
      "GE Appliances",
    ],
  },
  {
    name: "Sports",
    brands: [
      "Nike",
      "Adidas",
      "Puma",
      "Under Armour",
      "Reebok",
      "Columbia",
      "The North Face",
      "Wilson",
      "Asics",
      "New Balance",
    ],
  },
  {
    name: "Accessories",
    brands: [
      "Ray-Ban",
      "Fossil",
      "Michael Kors",
      "Coach",
      "Prada",
      "Gucci",
      "Hermès",
      "Cartier",
      "Tiffany & Co.",
      "Rolex",
    ],
  },
  {
    name: "Books",
    brands: [
      "Penguin Random House",
      "HarperCollins",
      "Simon & Schuster",
      "Macmillan",
      "Hachette",
      "Scholastic",
      "Pearson",
      "Bloomsbury",
      "Oxford University Press",
      "Cambridge University Press",
    ],
  },
  {
    name: "Toys",
    brands: [
      "LEGO",
      "Mattel",
      "Hasbro",
      "Fisher-Price",
      "NERF",
      "Playmobil",
      "Hot Wheels",
      "Barbie",
      "Disney",
      "Melissa & Doug",
    ],
  },
];

const productColors = [
  "Black",
  "White",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Pink",
  "Purple",
  "Gray",
  "Brown",
  "Orange",
  "Beige",
  "Gold",
  "Silver",
  "Rose Gold",
  "Navy",
  "Light Grey",
  "Dark Grey",
];

const defaultValues: ProductFormValues = {
  name: "",
  description: "",
  price: "",
  stock: "",
  image: "",
  category: "",
  brand: "",
  status: "In Stock",
  specifications: [{ value: "" }],
  color: "",
};

export default function ProductForm({
  initialProduct,
  mode = "add",
  onSubmitProduct,
  onCancel,
}: ProductFormProps) {
  const form = useForm<ProductFormValues>({ defaultValues, mode: "onBlur" });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "specifications",
  });

  const [availableBrands, setAvailableBrands] = useState<
    { name: string; brands: string[] } | undefined
  >({ name: "", brands: [] });
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const normalizedInitialProduct: AddDoc | null = useMemo(() => {
    if (!initialProduct) return null;
    return {
      name: (initialProduct.name ?? "").toString(),
      details:
        (initialProduct as any).details ??
        (initialProduct as any).deitals ??
        "",
      specifications:
        initialProduct.specifications &&
        initialProduct.specifications.length > 0
          ? initialProduct.specifications
          : [{ value: "" }],
      imageUrl: (initialProduct as any).imageUrl ?? "",
      category: (initialProduct as any).category ?? "",
      brand: (initialProduct as any).brand ?? "",
      price: Number((initialProduct as any).price ?? 0),
      stock: Number((initialProduct as any).stock ?? 0),
      status:
        ((initialProduct as any).status as AddDoc["status"]) ?? "In Stock",
      color: (initialProduct as any).color ?? "",
    };
  }, [initialProduct]);

  useEffect(() => {
    if (normalizedInitialProduct) {
      form.reset({
        name: normalizedInitialProduct.name,
        description: normalizedInitialProduct.details ?? "",
        price: normalizedInitialProduct.price.toString(),
        stock: normalizedInitialProduct.stock.toString(),
        image: normalizedInitialProduct.imageUrl,
        category: normalizedInitialProduct.category,
        brand: normalizedInitialProduct.brand,
        status: normalizedInitialProduct.status,
        specifications: normalizedInitialProduct.specifications,
        color: normalizedInitialProduct.color,
      });
      setSelectedCategory(normalizedInitialProduct.category ?? "");
    } else {
      form.reset(defaultValues);
      setSelectedCategory("");
    }
  }, [normalizedInitialProduct]);

  useEffect(() => {
    const brands = categories.find((categoryName) => {
      if (categoryName.name === selectedCategory) {
        return categoryName.brands;
      }
      return;
    });
    setAvailableBrands(brands);
  }, [selectedCategory]);

  const onSubmit: SubmitHandler<ProductFormValues> = (data) => {
    onSubmitProduct({
      name: data.name.trim(),
      details: data.description.trim(),
      specifications: data.specifications,
      imageUrl: data.image.trim(),
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
      category: data.category,
      brand: data.brand,
      status: data.status,
      color: data.color,
    });
  };

  return (
    <div className="max-w-6xl py-3 mx-auto bg-transparent">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              name="name"
              control={form.control}
              rules={{ required: "Product name is required" }}
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Product Name *</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        form.formState.errors.name
                          ? "border-red-500 dark:border-red-400"
                          : "border-gray-300 dark:border-gray-600"
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      placeholder="Enter product name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      rows={3}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        form.formState.errors.description
                          ? "border-red-500 dark:border-red-400"
                          : "border-gray-300 dark:border-gray-600"
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      placeholder="Enter product description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                name={`specifications.${index}.value`}
                control={form.control}
                rules={{ required: "Specifications is required" }}
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Specification {index + 1} *</FormLabel>
                    <FormControl>
                      <div className="flex items-center  gap-2">
                        <Input
                          type="text"
                          {...field}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                            form.formState.errors.name
                              ? "border-red-500 dark:border-red-400"
                              : "border-gray-300 dark:border-gray-600"
                          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                          placeholder="Enter specification"
                        />
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            className="cursor-pointer"
                            onClick={() => {
                              if (fields.length > 1) {
                                remove(index);
                              }
                            }}
                          >
                            <Delete size={48} />
                          </Button>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                    <div className="mt-3">
                      {fields.length - 1 === index && (
                        <Button
                          type="button"
                          variant="outline"
                          className="cursor-pointer flex items-center justify-between"
                          onClick={() => append({ value: "" })}
                        >
                          <Plus size={48} /> Add Item
                        </Button>
                      )}
                    </div>
                  </FormItem>
                )}
              />
            ))}
            <FormField
              name="price"
              control={form.control}
              rules={{
                required: "Valid price is required",
                validate: (v) => parseFloat(v) > 0 || "Valid price is required",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                        $
                      </span>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                          form.formState.errors.price
                            ? "border-red-500 dark:border-red-400"
                            : "border-gray-300 dark:border-gray-600"
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                        placeholder="0.00"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="stock"
              control={form.control}
              rules={{
                required: "Valid stock quantity is required",
                validate: (v) =>
                  parseInt(v) >= 0 || "Valid stock quantity is required",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Quantity *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        form.formState.errors.stock
                          ? "border-red-500 dark:border-red-400"
                          : "border-gray-300 dark:border-gray-600"
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      placeholder="0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="category"
              control={form.control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedCategory(value);
                    }}
                    {...field}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                          form.formState.errors.brand
                            ? "border-red-500 dark:border-red-400"
                            : "border-gray-300 dark:border-gray-600"
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      >
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        {categories.map((category) => (
                          <SelectItem key={category.name} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="brand"
              control={form.control}
              rules={{ required: "Brand is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand *</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    {...field}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                          form.formState.errors.brand
                            ? "border-red-500 dark:border-red-400"
                            : "border-gray-300 dark:border-gray-600"
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      >
                        <SelectValue placeholder="Select Brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Brand</SelectLabel>
                        {availableBrands?.brands?.map((brand) => (
                          <SelectItem key={brand} value={brand}>
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="status"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    {...field}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                          form.formState.errors.brand
                            ? "border-red-500 dark:border-red-400"
                            : "border-gray-300 dark:border-gray-600"
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      >
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="In Stock">In Stock</SelectItem>
                        <SelectItem value="Out of Stock">
                          Out of Stock
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name="color"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    {...field}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                          form.formState.errors.brand
                            ? "border-red-500 dark:border-red-400"
                            : "border-gray-300 dark:border-gray-600"
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      >
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Color</SelectLabel>
                        {productColors.map((color) => (
                          <SelectItem key={color} value={color}>
                            {color}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name="image"
              control={form.control}
              rules={{ required: "Image URL is required" }}
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Image URL *</FormLabel>
                  <FormControl>
                    <input
                      type="url"
                      {...field}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        form.formState.errors.image
                          ? "border-red-500 dark:border-red-400"
                          : "border-gray-300 dark:border-gray-600"
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      placeholder="https://example.com/image.jpg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="fixed gap-3 bottom-0 left-0 w-full py-5 pr-[10%] bg-gray-100 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-700 flex-row flex justify-end space-x-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-indigo-500 border border-transparent rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              {mode === "edit" ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}

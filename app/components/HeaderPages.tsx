const HeaderPages = ({
  nameHeader,
  description,
  button,
  isOrderPage,
  onChangeFunction,
}: {
  nameHeader: string;
  description: string;
  button?: string;
  isOrderPage: boolean;
  onChangeFunction?: () => void;
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pt-2">
      <div>
        <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          {nameHeader}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1 md:mt-2 text-sm md:text-base">
          {description}
        </p>
      </div>

      {!isOrderPage && (
        <button
          onClick={onChangeFunction}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors w-full sm:w-auto cursor-pointer"
        >
          {button}
        </button>
      )}
    </div>
  );
};

export default HeaderPages;

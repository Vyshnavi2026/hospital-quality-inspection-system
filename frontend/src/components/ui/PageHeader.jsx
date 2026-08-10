const PageHeader = ({
  title,
  subtitle,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          {title}
        </h1>

        <p className="text-gray-500 mt-1">
          {subtitle}
        </p>
      </div>

      {buttonText && (
        <button
          onClick={onButtonClick}
          className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 rounded-lg transition"
        >
          {buttonText}
        </button>
      )}

    </div>
  );
};

export default PageHeader;
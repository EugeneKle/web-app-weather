export default function TopButtons({setQuery}) {
  const cities = [
    {
      id: 1,
      title: "Praha",
    },
    {
      id: 2,
      title: "Brno",
    },
    {
      id: 3,
      title: "Ostrava",
    },
    {
      id: 4,
      title: "Liberec",
    },
    {
      id: 5,
      title: "Olomouc",
    },
  ];
  const renderedButtons = cities.map((city) => {
    return (
      <button
        onClick={() => {
          setQuery({ q: city.title });
        }}
        className="text-white text-lg font-medium max-sm:text-sm"
        key={city.id}
      >
        {city.title}
      </button>
    );
  });
  return (
    <>
      <div className="flex items-center justify-around my-6 max-sm:my-4">
        {renderedButtons}
      </div>
      <hr className="p-1 mb-10 max-sm:mb-5" />
    </>
  );
}

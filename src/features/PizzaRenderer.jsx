export const PizzaRenderer = ({ sauce, cheese, toppings }) => {
  const basePath = "/src/assets/";

  const layers = [
    { src: `${basePath}crust.svg`, isCrust: true },
    sauce ? { src: `${basePath}${sauce}.svg`, isCrust: false } : null,
    cheese && cheese !== "none" ? { src: `${basePath}${cheese}.svg`, isCrust: false } : null,
    ...toppings.map((topping) => ({
      src: `${basePath}${topping}.svg`,
      isCrust: false,
    })),
  ].filter(Boolean);

  return (
    <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] xl:w-[400px] xl:h-[400px]">
      {" "}
      {layers.map(({ src, isCrust }, index) => (
        <img
          key={index}
          src={src}
          alt={`layer-${index}`}
          className={`absolute inset-0 ${
            isCrust ? "scale-110" : "scale-95"
          } w-full h-full object-contain`}
        />
      ))}
    </div>
  );
};

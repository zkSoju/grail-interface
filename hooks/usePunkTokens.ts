import { useTokens } from "@reservoir0x/reservoir-kit-ui";

export function usePunkTokens() {
  const { data: tokens } = useTokens({
    // collection: "0x82c7a8f707110f5fbb16184a5933e9f78a34c6ab",
    tokens: [
      "0x82c7a8f707110f5fbb16184a5933e9f78a34c6ab:40266239799564391",
      "0x82c7a8f707110f5fbb16184a5933e9f78a34c6ab:77949325065775181",
    ],
    limit: 40,
  });

  const punkTokens = tokens?.filter((token) => {
    return token?.token?.name?.includes("Punk");
  });

  return tokens;
}

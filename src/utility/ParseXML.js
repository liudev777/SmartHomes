export function parseXML(xmlText) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "application/xml");

  // Handle errors in parsing
  const parseError = xmlDoc.getElementsByTagName("parsererror");
  if (parseError.length) {
    const errorDetails = parseError[0].textContent;
    console.error("Error parsing XML:", errorDetails);
    throw new Error("Error parsing XML: " + errorDetails);
  }

  const categories = xmlDoc.getElementsByTagName("Category");
  const productsData = {};

  for (let category of categories) {
    const categoryName = category.getAttribute("name");
    const productElements = category.getElementsByTagName("Product");
    const products = [];

    for (let productElem of productElements) {
      const id = productElem.getAttribute("id");
      const name = productElem.getAttribute("name");
      const price = productElem.getElementsByTagName("Price")[0].textContent;
      const manufacturerRebate =
        productElem.getElementsByTagName("ManufacturerRebate")[0].textContent;
      const discountAmount =
        productElem.getElementsByTagName("DiscountAmount")[0].textContent;
      const warrantyCost =
        productElem.getElementsByTagName("WarrantyCost")[0].textContent;
      const description =
        productElem.getElementsByTagName("Description")[0].textContent;

      products.push({
        id,
        name,
        price,
        manufacturerRebate,
        discountAmount,
        warrantyCost,
        description,
      });
    }

    productsData[categoryName] = products;
  }

  return productsData;
}

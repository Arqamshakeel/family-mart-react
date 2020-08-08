import GenericService from "./GenericService";

class ProductServices extends GenericService {
  constructor() {
    super();
  }
  getAllProducts = () => this.get("products/");
  postProduct = (data) => this.post("products", data);
}

let productService = new ProductServices();
export default productService;

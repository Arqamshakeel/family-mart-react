import GenericService from "./GenericService";

class ProductServices extends GenericService {
  constructor() {
    super();
  }
  getAllProducts = () => this.get("products/");
  postProduct = (data) => this.post("products", data);
  getCart = (_id, counter) => this.get("products/cart/" + counter + "/" + _id);
  getAllCartData = () => this.get("products/cart/");
}

let productService = new ProductServices();
export default productService;

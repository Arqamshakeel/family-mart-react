import GenericService from "./GenericService";

class ProductServices extends GenericService {
  constructor() {
    super();
  }
  getAllProducts = () => this.get("products/");
  postProduct = (data) => this.post("products", data);
  getCart = (_id, counter) => this.get("products/cart/" + counter + "/" + _id);
  getAllCartData = () => this.get("products/cart/");
  deleteCartItem = (_id) => this.delete("products/cart/" + _id, _id);
  sendOrder = (data) => this.post("products/neworder", data);
  getOrder = () => this.get("products/orders/");
}

let productService = new ProductServices();
export default productService;

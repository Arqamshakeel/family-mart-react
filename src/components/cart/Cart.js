import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import productService from "../../services/ProductServices";

const TAX_RATE = 0.07;

const useStyles = makeStyles({
  table: {
    //minWidth: 700,
    //margin:"100px"
    //width: "100px",
  },
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

const rows = [
  createRow("Paperclips (Box)", 100, 1.15),
  createRow("Paper (Case)", 10, 45.99),
  createRow("Waste Basket", 2, 17.99),
];

const Cart = (props) => {
  const classes = useStyles();

  const [cart, setCart] = React.useState([]);
  const [subtotal, setSubtotal] = React.useState([]);

  const handleSubtotal = () => {
    // for (let i = 0; i < cart.length; i++) {
    //   setSubtotal(subtotal + cart[i].price * cart[i].qty);
    // }
    // return subtotal;
    console.log("in hanlde");
    return "500";
  };

  const apiPOSTcart = () => {
    //console.log(props.product._id);
    productService
      .getAllCartData()
      .then(function (cart) {
        console.log(cart);
        setCart(cart);
        console.log("hahah" + cart.length);
        //props.cartbagde("10");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  React.useEffect(apiPOSTcart, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={4}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Qty.</TableCell>
            <TableCell>Price</TableCell>
            <TableCell align="right">Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {console.log(cart.length)}
          {cart ? (
            cart.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.company}</TableCell>
                  <TableCell>{item.qty}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell align="right">
                    {Number(item.qty) * Number(item.price)}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <></>
          )}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={3}>Subtotal</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
          <TableRow>
            {/* <TableCell>Discount</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
              0
            )} %`}</TableCell>
            <TableCell align="right" colSpan={3}>
              {ccyFormat(invoiceTaxes)}
            </TableCell> */}
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Cart;

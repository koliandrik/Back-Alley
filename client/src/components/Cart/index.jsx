import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import { useStoreContext } from "../../utils/GlobalState";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Cart = () => {
    const [state, dispatch] = useStoreContext();
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data]);

    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise("cart", "get");
            dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
        }

        if (!state.cart.length) {
            getCart();
        }
    }, [state.cart.length, dispatch]);

    function toggleCart() {
        dispatch({ type: TOGGLE_CART });
    }

    function calculateTotal() {
        let sum = 0;
        state.cart.forEach((item) => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }

    function submitCheckout() {
        const productIds = [];

        state.cart.forEach((item) => {
            for (let i = 0; i < item.purchaseQuantity; i++) {
                productIds.push(item._id);
            }
        });

        getCheckout({
            variables: { products: productIds },
        });
    }

    if (!state.cartOpen) {
        return (
        <>
            <span class="material-symbols-outlined" onClick={toggleCart} data-bs-toggle="offcanvas" data-bs-target="#shoppingCart" role="button" aria-controls="offcanvasExample">
                shopping_cart
            </span>

            <div class="cart offcanvas offcanvas-end" tabindex="-1" id="shoppingCart" aria-labelledby="offcanvasExampleLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Shopping Cart</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>

                <div class="offcanvas-body">
                    {state.cart.length ? (
                        <div>
                            {state.cart.map((item) => (
                                <CartItem key={item._id} item={item} />
                            ))}

                            <div class="flex-row space-between">
                                <strong>Total: ${calculateTotal()}</strong>

                                {Auth.loggedIn() ? (
                                    <button class="btn btn-primary" onClick={submitCheckout}>
                                        Checkout
                                    </button>
                                ) : (
                                    <span>(log in to check out)</span>
                                )}

                            </div>
                        </div>
                    ) : (
                        <h3>
                            <span role="img" aria-label="shocked">
                                😱
                            </span>
                            You haven't added anything to your cart yet!
                        </h3>
                    )}
                </div>
            </div></>

        );
    }

    return (
        <>
            <span class="material-symbols-outlined" onClick={toggleCart} data-bs-toggle="offcanvas" data-bs-target="#shoppingCart" role="button" aria-controls="offcanvasExample">
                shopping_cart
            </span>

            <div class="cart offcanvas offcanvas-end" tabindex="-1" id="shoppingCart" aria-labelledby="offcanvasExampleLabel">
                <div class="offcanvas-header">
                    <h3 class="offcanvas-title" id="offcanvasExampleLabel">Shopping Cart</h3>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                
                <div class="offcanvas-body">
                    {state.cart.length ? (
                        <div>
                            {state.cart.map((item) => (
                                <CartItem key={item._id} item={item} />
                            ))}

                            <div class="flex-row space-between">
                                <strong>Total: ${calculateTotal()}</strong>

                                {Auth.loggedIn() ? (
                                    <button class="btn btn-primary" onClick={submitCheckout}>
                                        Checkout
                                    </button>
                                ) : (
                                    <span>(log in to check out)</span>
                                )}
                                
                            </div>
                        </div>
                    ) : (
                        <h3>
                            Looks like your cart is empty!
                        </h3>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart;

import styles from './Cart.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchCart, deleteCart, checkoutCart, changeQty } from '../../redux/actions/cartSlicer'
import { useRouter } from 'next/router'
import BreadCumb from "../BreadCumb"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTrash
} from '@fortawesome/free-solid-svg-icons';

export default function     Cart() {
    const { carts } = useSelector(state => state.carts)
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        dispatch(fetchCart())
    }, [])

    const onChangeHandle = (e, productId,size) => {
        let number = +e.target.value
        if(number < 1){
            number = 0
        }
        dispatch(changeQty({ qty: number, productId: productId,size }))

    }

    const onClickHandle = (number, productId, size) => {
        if(number < 1){
            return
        }
        dispatch(changeQty({ qty: +number, productId, size }))
    }

    const onDeleteHandle = (productId, cartId) => {
        dispatch(deleteCart(productId, cartId))
    }

    const getTotal = () => {
        let count = 0
        carts.forEach(el => {
            count += el.quantity * el.product[0]?.price
        });

        return count
    }

    const onCheckoutCart = () => {
        dispatch(checkoutCart({ total_order: getTotal(), carts, navigate: router }))
    }


    return (
        <div className={styles.containerCart}>
            <div className={styles.subHeader}>
                <div className={styles.subHeaderText}>
                    Shopping Cart
                    <div className={styles.cartNumber}>{carts.length}</div>
                </div>
            </div>
            <BreadCumb linkTo={"My Cart"} linkPrev={"All Products"} linkRef={"/products/"} />
            <div className={`${styles.cartContent} mt-5`}>
                <table className={`${styles.tableCart}`}>
                    <thead className={styles.tableHead}>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            carts.length > 0 ?
                                [...carts].sort((a, b) => (a.timestamp > b.timestamp) ? 1 : ((b.timestamp > a.timestamp) ? -1 : 0)).map((val, index) => {
                                    return (
                                        <tr key={index} className={styles.cartBoxContent}>
                                            <td className={styles.cartProductBox}><img src={`${val.product[0]?.images[0]}`} className={styles.imageTable} width={100} /><span className='m-2'>{`${val.product[0]?.name} (${val.size})`}</span></td>
                                            <td>Rp {val.product[0]?.price}</td>
                                            <td>
                                                <div className={styles.qtyBox}>
                                                    <span style={{ color: 'silver' }}>QTY:</span>
                                                    <div className={styles.qtyBoxInput}>
                                                        <button className={`${styles.cartChangeQtyButton} ${styles.incrementButton}`} onClick={() => { onClickHandle(+val.quantity + 1, val.productId, val.size) }}>+</button>
                                                        <input className={styles.cartChangeQtyInput} onChange={(e) => { onChangeHandle(e, val.productId,val.size) }} placeholder={val.quantity} />
                                                        <button className={`${styles.cartChangeQtyButton} ${styles.decrementButton}`} onClick={() => { onClickHandle(+val.quantity - 1, val.productId,val.size) }}>-</button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>Rp {val.quantity * val.product[0]?.price}.00</td>
                                            <td><button className={styles.cartDeleteButton} style={{ fontSize: '1rem' }} onClick={() => { onDeleteHandle({ productId: val.productId, cartId: val.cartId, size: val.size }) }}><FontAwesomeIcon icon={faTrash}/></button></td>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <td>No data</td>
                                </tr>
                        }
                    </tbody>
                </table>

                {/* <div className={`${styles.couponContainer} mt-5`}>
                    <div>Coupon</div>
                    <input placeholder='Coupon code' className={styles.inputCoupon} />
                    <button className={styles.buttonCoupon}>APPLY COUPON</button>
                </div> */}


                <div className={`${styles.checkoutContainer} mt-5`}>
                    <div>Cart Total</div>
                    <div className={`${styles.checkoutContent}`} >
                        <div className={`${styles.subTotalCheckout}`}>
                            <div>Subtotal</div>
                            <div>Rp {getTotal()}</div>
                        </div>
                        <div className={`${styles.shippingCheckout} mt-5`}>
                            <div>Shipping</div>
                            <div>Free Shiping</div>
                        </div>
                        <div className={`${styles.totalCheckout} mt-5`}>
                            <div>Total</div>
                            <div>Rp {getTotal()}</div>
                        </div>
                        <button onClick={onCheckoutCart} className={`${styles.buttonCheckout} mt-5`}>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
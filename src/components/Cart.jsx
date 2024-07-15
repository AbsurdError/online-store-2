import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function Cart({token}){
    const [carts, setCarts] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        fetch('https://api-shop.edu.alabuga.space/api-shop/cart', {
            method: 'GET',
            headers: {'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`}
        })
        .then(data => data.json())
        .then(info => setCarts(info.data))
    }, [])

    function makeOrder(){
        fetch(`https://api-shop.edu.alabuga.space/api-shop/order`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`}
        })
        navigate('/order')
    }

    function deleteProduct(id){
        fetch(`https://api-shop.edu.alabuga.space/api-shop/cart/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`}
        })
        setCarts(carts.filter(cart => cart.id !== id))
    }
    
    const printCarts = carts.map(cart => {
        return(
        <div className="col" key={cart.id}>
            <div className="card mb-4 rounded-3 shadow-sm">
                <div className="card-header py-3">
                    <h4 className="my-0 fw-normal">{cart.name}</h4>
                </div>
                <div className="card-body">
                    <h1 className="card-title pricing-card-title">{cart.price}р.<small className="text-muted fw-light"> &times; 2
                        шт.</small></h1>
                    <p>{cart.description}</p>

                    <button type="button" className="btn btn-lg btn-info mb-3">+</button>
                    <button type="button" className="btn btn-lg btn-warning mb-3">&minus;</button>
                    <button type="button" className="btn btn-lg btn-outline-danger mb-3" onClick={() => deleteProduct(cart.id)}>Удалить из корзины</button>
                </div>
            </div>
        </div>  
        )
    })
    return(
    <main>
        <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h1 className="display-4 fw-normal">Корзина</h1>
        </div>
        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
            {printCarts}
        </div>
        <div className="row justify-content-center gap-1">
            <h2 className="mb-5">Итоговая стоимость: 600р.</h2>
            <button className="col-6 btn btn-lg btn-outline-secondary mb-3" type="button" onClick={() => navigate('/')}>Назад</button>
           {Boolean(carts.length) && <button type="button" className="col-6 btn btn-lg btn-success mb-3" onClick={makeOrder}>Оформить заказ</button>}

        </div>
    </main>

    )
}
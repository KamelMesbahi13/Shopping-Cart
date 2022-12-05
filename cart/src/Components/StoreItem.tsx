import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utility/FormatCurrency"

type StoreItemProps = {
    id: number,
    name: string,
    price: number,
    imgUrl: string
}

const StoreItem = ({ id, name, price, imgUrl }: StoreItemProps) => {
    const { getItemQuantity, decreaseCartQuantity, increaseCartQuantity, removeFromCart } = useShoppingCart()

    const quantity = getItemQuantity(id)
    return (
        <>
            <div>
                <img className="object-cover h-[22rem] w-[18rem]" src={imgUrl} alt={name} />
                <div className="flex justify-between mt-4">
                    <h2 className="text-xl font-medium">{name}</h2>
                    <h2>{ formatCurrency(price) }</h2>
                </div>

                {
                    quantity === 0 ? (
                        <div className='mt-4 cursor-pointer duration-300 text-white bg-blue-600 text-center p-1 hover:bg-blue-500'>
                            <p onClick={() => increaseCartQuantity(id)}>+ Add To Cart </p>
                        </div>
                    ) : <div className='text-center '>
                            <div className='flex justify-center items-center text-white'>
                                <button className='bg-blue-600 p-2' onClick={() => decreaseCartQuantity(id)}>-</button>
                                    <div className='mx-2 text-black'>
                                        <span className='font-bold text-xl mr-2'>{quantity}</span>
                                        In Cart
                                    </div>
                                <button className='bg-blue-600 p-2' onClick={() => increaseCartQuantity(id)}>+</button>
                            </div>
                            <div>
                                <button className='bg-red-600 p-2 mt-4 rounded-sm text-white' onClick={() => removeFromCart(id)}>Remove</button>
                            </div>
                        </div>
                    }
            </div>
        </>
    )
}

export default StoreItem
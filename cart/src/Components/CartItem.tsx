import { useShoppingCart } from "../context/ShoppingCartContext"
import storItems from '../Data/Items.json'
import { formatCurrency } from "../utility/FormatCurrency";
import { AiOutlineClose } from 'react-icons/ai'


type CartItemProps = {
    id: number,
    quantity: number
}

export function CartItem ({ id, quantity }: CartItemProps) {
    const { removeFromCart } = useShoppingCart();
    const item = storItems.find(i => i.id === id);
    if (item == null) return null

    return (
        <div>
            <div className="flex items-center my-4 p-4">
                <img src={item.imgUrl} className='w-[20rem] h-[10rem] object-cover' />
                <div className="flex w-1/2 justify-between">
                    <div className="ml-2">
                        <div className="text-xl">
                            {item.name} {quantity > 1 && <span>{quantity}x</span>}
                        </div>
                        <div className="text-sm">
                            {formatCurrency(item.price)}
                        </div>
                    </div>
                    <div className="flex items-center">
                        {formatCurrency(item.price * quantity)}
                        <button className="border border-[#777] p-1 ml-1 rounded-sm" onClick={() => removeFromCart(item.id)}><AiOutlineClose className="text-red-500" /></button>
                    </div>
                </div>
            </div>
        </div>
    )

}
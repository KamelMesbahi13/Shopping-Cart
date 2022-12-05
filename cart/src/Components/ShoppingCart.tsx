import { AiOutlineClose } from 'react-icons/ai'
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utility/FormatCurrency';
import { CartItem } from '../Components/CartItem';
import storeItems from '../Data/Items.json'

type ShoppingCartProps = {
  isOpen: boolean
}

const ShoppingCart = ({ isOpen } : ShoppingCartProps) => {
  const { closeCart, cartItems  } = useShoppingCart();

  return (
    <div className='overflow-hidden'>
      <div className={isOpen ? 'bg-white absolute z-50 w-1/2 left-1/2 h-full' : 'hidden'}>
        <AiOutlineClose className='float-right text-xl cursor-pointer' onClick={closeCart} />
          {
            cartItems.map((item) => {
              return (
                <CartItem key={item.id} {...item} />
              )
            })
          }
          <div className='float-right text-2xl font-semibold'>
            Total 
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find(i => i.id === cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity
              }, 0)
            )}
          </div>
      </div>
    </div>
  )
}

export default ShoppingCart
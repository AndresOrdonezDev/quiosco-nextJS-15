//connect to Db from prisma
import { prisma } from '@/src/lib/prisma'
import CategoryIcon from '../ui/CategoryIcon'
import Logo from '../ui/Logo'

async function getCategories() {
  //instance the model and get data
  return await prisma.category.findMany()
}

export default async function OrderSidebar() {
  //use endpoint on client
  const categoriesList = await getCategories()
  //show data in the client interface
  return (
    <aside className="md:w-72 md:h-screen bg-white">
      <Logo/>
      <nav className='mt-10'>
        <p className='text-center mb-5 font-bold text-2xl'>Categorías</p>
        {categoriesList.map(category => (
          <CategoryIcon key={category.id} category ={category} />
        ))}
      </nav>

    </aside>
  )
}

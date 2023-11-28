
function CategoryField({categoryInfo: {category, name}}) {
  return (
    <div className=" flex flex-col w-1/4 items-center justify-center">
      <p className="text-xl font-bold">{category}</p>
      <p className="text-xl font-bold">{name}</p>
    </div>
  )
}

export default CategoryField;

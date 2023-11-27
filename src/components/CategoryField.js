import '../styles/App.css'

function CategoryField({categoryInfo: {category, name}}) {
  return (
    <div className="square">
      <p>{category} : {name}</p>
    </div>
  )
}

export default CategoryField;
